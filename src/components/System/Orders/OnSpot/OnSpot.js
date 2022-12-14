import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../../store/grid-context";
import Container from "../../../../UI/Container";
import classes from "./OnSpot.module.css";
import OnSpotItems from "./OnSpotItems";
import axios from "axios";
function OnSpot() {
  const gridCtx = useContext(GridContext);
  const { isOnSpotClosed, reload, isNightMode } = gridCtx;
  const [onspotItems, setOnspotItems] = useState("");
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const user = localStorage.getItem("uid");
  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const getOnspotItems = () => {
    axios
      .get(`${url}/${user}/onspotOrders.json`)
      .then((response) => {
        const items = response.data;
        setOnspotItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));

    // problem jest ze items sie dopisuje trzeba jakos zrobic zeby sie tworzyla nowa tablica
  };

  useEffect(() => {
    getOnspotItems();
  }, [reload]);


  const loadedOrdersData = [];
  for (const key in onspotItems) {
    for (const i in onspotItems[key].orderedItems) {
      loadedOrdersData.push({
        id: key,
        name: onspotItems[key].orderedItems[i].name,
        size: onspotItems[key].orderedItems[i].size,
        amount: onspotItems[key].orderedItems[i].amount,
        price: onspotItems[key].orderedItems[i].price,
        user: onspotItems[key].user,
        totalAmount: onspotItems[key].orderedAmount,
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
      <OnSpotItems
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
    content = <p className={paragraphClass}>Brak zam??wie??</p>;
  } else {
    content = items;
  }

  const onSpotStyles = `${classes.onspot} ${isNightMode && classes.onspotNight}`
  const titleStyles = `${classes.title} ${isNightMode && classes.titleNight}`
  return (
    <>
      {!isOnSpotClosed && (
        <div className={onSpotStyles}>
          <div className={titleStyles}>
            <p className={paragraphClass}>Na miejscu</p>
          </div>
          <Container class={classes.container}>{content}</Container>
        </div>
      )}
    </>
  );
}
export default OnSpot;
