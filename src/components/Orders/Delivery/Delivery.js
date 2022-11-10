import React, {useContext, useEffect, useState } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Delivery.module.css";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
import DeliveryItems from "./DeliveryItems";
import axios from "axios";
import Countdown from "react-countdown";
function Delivery() {
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, handleDeliveryClosed} = gridCtx;
  const [deliveryItems, setDeliveryItems] = useState("");

  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const getDeliveryItems = () => {
    axios
      .get(`${url}deliveryOrders.json`)
      .then((response) => {
        const items = response.data;
        setDeliveryItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getDeliveryItems();
  }, []);

  let loadedOrdersData = [];
  for (const key in deliveryItems) {
    for (const i in deliveryItems[key].orderedItems) {
      loadedOrdersData.push({
        id: key,
        items: deliveryItems[key].orderedItems[i],
        user: deliveryItems[key].user,
        totalAmount: deliveryItems[key].orderedAmount,
      });
    }
  }

  /* 
  const [isClicked, setIsClicked] = useState(false);

  const isClickedHandler = (event) => {
    event.preventDefault();
    setIsClicked(true);
  };
  {!isClicked ? (
              <button type="button" className={classes.no} onClick={isClickedHandler}>
                Check
              </button>
            ) : (
              <button type="button" className={classes.yes} onClick={isClickedHandler}>
                Check
              </button>
            )}*/

   
  const items = loadedOrdersData.map((item, index) => {
    return (
      <div key={index}>
        <div className={classes.flex}>
          <div>
            <div className={classes.timeFlex}>
              <div className={classes.name}>Produkt: {item.items.name}</div>
              <div className={classes.time}>
                Czas: {<Countdown date={Date.now() + item.user.time}></Countdown>}
              </div>
            </div>
            <div className={classes.flex2}>
              <div>
                <div className={classes.amount}>Ilość: {item.items.amount}</div>
                <div className={classes.price}>
                  Cena szt.: {item.items.price}
                </div>
                <div className={classes.size}>Rozmiar: {item.items.size}</div>
              </div>
              <div>
                <div className={classes.street}>Ulica: {item.user.street}</div>
                <div className={classes.city}>Miasto: {item.user.city}</div>
                <div className={classes.number}>Numer: {item.user.number}</div>
              </div>
            </div>
            <div className={classes.totalAmount}>
              Cena całkowita: {item.totalAmount}
            </div>
          </div>
        </div>

        <hr className={classes.hr} />
      </div>
    );
  });
  loadedOrdersData = [];

  return (
    <>
      {!isDeliveryClosed && (
        <div className={classes.delivery}>
          <Button
            class={classes.closeButton}
            onClick={() => handleDeliveryClosed(true)}
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
            <div className={classes.text}>Na dowóz</div>
            <DeliveryItems deliveryItems={items}></DeliveryItems>
          </Container>
        </div>
      )}
    </>
  );
}

export default Delivery;
