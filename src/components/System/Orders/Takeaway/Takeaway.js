import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../../store/grid-context";
import Container from "../../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
import axios from "axios";
function Takeaway() {
  const gridCtx = useContext(GridContext);
  const { isTakeawayClosed, reload, isNightMode } = gridCtx;
  const [takeawayItems, SetTakeawayItems] = useState("");
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const user = localStorage.getItem("uid");
  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const getDeliveryItems = () => {
    axios
      .get(`${url}/${user}/takeawayOrders.json`)
      .then((response) => {
        const items = response.data;
        SetTakeawayItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getDeliveryItems();
  }, [reload]);

  const loadedOrdersData = [];
  for (const key in takeawayItems) {
    for (const i in takeawayItems[key].orderedItems) {
      loadedOrdersData.push({
        id: key,
        name: takeawayItems[key].orderedItems[i].name,
        size: takeawayItems[key].orderedItems[i].size,
        amount: takeawayItems[key].orderedItems[i].amount,
        price: takeawayItems[key].orderedItems[i].price,
        user: takeawayItems[key].user,
        totalAmount: takeawayItems[key].orderedAmount,
      });
    }
  }

  const compare = (a, b) => {
    if (a.user.time < b.user.time) {
      return -1;
    }
    if (a.user.time > b.user.time) {
      return 1;
    }
    return 0;
  };
  loadedOrdersData.sort(compare);

  let items;
  if (loadedOrdersData.length > 0) {
    items = loadedOrdersData.map((item, index) => (
      <TakeawayItems
        key={index}
        name={item.name}
        size={item.size}
        amount={item.amount}
        price={item.price}
        city={item.user.city}
        number={item.user.number}
        street={item.user.street}
        totalAmount={item.totalAmount}
        time={item.user.time}
      />
    ));
  }

  let content;
  if (items === undefined) {
    content = <p className={paragraphClass}>Brak zamówień</p>;
  } else {
    content = items;
  }

  const takeawayStyles = `${classes.takeaway} ${isNightMode && classes.takeawayNight}`
  const titleStyles = `${classes.title} ${isNightMode && classes.titleNight}`
  return (
    <>
      {!isTakeawayClosed && (
        <div className={takeawayStyles}>
          <div className={titleStyles}>
            <p className={paragraphClass}>Na wynos</p>
          </div>
          <Container class={classes.container}>{content}</Container>
        </div>
      )}
    </>
  );
}

export default Takeaway;
