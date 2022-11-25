import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./OnSpot.module.css";
import OnSpotItems from "./OnSpotItems";
import axios from "axios";
import Countdown from "react-countdown";
function OnSpot() {
  const gridCtx = useContext(GridContext);
  const { isOnSpotClosed } = gridCtx;

  const [onspotItems, setOnspotItems] = useState("");
  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const getOnspotItems = () => {
    axios
      .get(`${url}onspotOrders.json`)
      .then((response) => {
        const items = response.data;
        setOnspotItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));

    // problem jest ze items sie dopisuje trzeba jakos zrobic zeby sie tworzyla nowa tablica
  };

  useEffect(() => {
    getOnspotItems();
  }, []);


  const loadedOrdersData = [];
  for (const key in onspotItems) {
    for (const i in onspotItems[key].orderedItems) {
      loadedOrdersData.push({
        id: key,
        key: key,
        items: onspotItems[key].orderedItems[i],
        user: onspotItems[key].user,
        totalAmount: onspotItems[key].orderedAmount,
      });
    }
  }

  const items = loadedOrdersData.map((item, index) => {
    return (
      <div key={index}>
        <div className={classes.flex}>
          <div className={classes.name}>{item.items.name}</div>
          <div className={classes.amount}>x{item.items.amount}</div>
          <div className={classes.size}>{item.items.size}</div>
          <div className={classes.price}>{item.items.price} zł/szt.</div>
          <div className={classes.time}>
            {<Countdown date={Date.now() + item.user.time}></Countdown>}
          </div>
        </div>
        <div className={classes.flex}>
          <div className={classes.street}>{item.user.street}</div>
          <div className={classes.city}>{item.user.city}</div>
        </div>
        <div className={classes.other}>
          <div className={classes.number}>Numer: {item.user.number}</div>
          <div className={classes.totalAmount}>
            Cena całkowita: {item.totalAmount}
          </div>
        </div>

        <hr className={classes.hr} />
      </div>
    );
  });

  return (
    <>
      {!isOnSpotClosed && (
        <div className={classes.onspot}>
          <Container class={classes.container}>
            <p>Na miejscu</p>
            <OnSpotItems onspotItems={items}></OnSpotItems>
          </Container>
        </div>
      )}
    </>
  );
}
export default OnSpot;
