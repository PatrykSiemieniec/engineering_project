import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./OnSpot.module.css";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
import OnSpotItems from "./OnSpotItems";
import axios from "axios";
function OnSpot() {
  const gridCtx = useContext(GridContext);
  const { isOnSpotClosed, handleOnSpotClosed } = gridCtx;

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
          <div>
            <div className={classes.name} >Produkt: {item.items.name}</div>
            <div className={classes.amount}>Ilość: {item.items.amount}</div>
            <div className={classes.price}>Cena szt.: {item.items.price}</div>
            <div className={classes.size}>Rozmiar: {item.items.size}</div>
            <div className={classes.totalAmount}>
              Cena całkowita: {item.totalAmount}
            </div>
          </div>
          <div>
            <div className={classes.street}>Ulica: {item.user.street}</div>
            <div className={classes.city}>Miasto: {item.user.city}</div>
            <div className={classes.number}>Numer: {item.user.number}</div>
            
          </div>
        </div>
        <hr className={classes.hr}/>
      </div>
    );
  });

  return (
    <>
      {!isOnSpotClosed && (
        <div className={classes.onspot}>
          <Button
            class={classes.closeButton}
            onClick={() => {
              handleOnSpotClosed(true);
            }}
          >
            <VscChromeClose
              style={{
                color: "white",
                fontSize: "15px",
                fontWeight: "bolder",
                marginTop: "3px",
              }}
            />
          </Button>
          <Container class={classes.container}>
          <div className={classes.text}>Na miejscu</div>
          <OnSpotItems onspotItems={items}></OnSpotItems>
          </Container>
        </div>
      )}
    </>
  );
}
export default OnSpot;
