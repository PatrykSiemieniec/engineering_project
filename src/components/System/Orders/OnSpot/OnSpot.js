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
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getOnspotItems();
    }, 500);
    return () => clearTimeout(timer);
  }, [reload]);

  const loadedOrdersData = [];
  for (const key in onspotItems) {
    for (const i in onspotItems[key].orderedItems) {
      if (onspotItems[key].orderedItems[i] !== null) {
        loadedOrdersData.push({
          id: key,
          index: i,
          name: onspotItems[key]?.orderedItems[i]?.name,
          size: onspotItems[key]?.orderedItems[i]?.size,
          amount: onspotItems[key]?.orderedItems[i]?.amount,
          price: onspotItems[key]?.orderedItems[i]?.price,
          done: onspotItems[key]?.orderedItems[i]?.done,
          user: onspotItems[key]?.user,
          totalAmount: onspotItems[key]?.orderedAmount,
          color: onspotItems[key]?.color
        });
      }

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
        id={item.id}
        index={item.index}
        key={index}
        color={item.color}
        done={item.done}
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

  const onSpotStyles = `${classes.onspot} ${isNightMode && classes.onspotNight
    }`;
  const titleStyles = `${classes.title} ${isNightMode && classes.titleNight}`;
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
