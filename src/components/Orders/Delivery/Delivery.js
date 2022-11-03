import React, { useContext, useEffect, useState, useId } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Delivery.module.css";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
import DeliveryItems from "./DeliveryItems";
import axios from "axios";
function Delivery() {
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, handleDeliveryClosed } = gridCtx;
  const [deliveryItems, setDeliveryItems] = useState("");
  const [isClicked, setIsClicked] = useState(false);


  const nameID = useId();
  const isClickedHandler = () => {
    setIsClicked(true);
  };
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

    // problem jest ze items sie dopisuje trzeba jakos zrobic zeby sie tworzyla nowa tablica
  };

  useEffect(() => {
    getDeliveryItems();
  }, []);

  const loadedOrdersData = [];
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

  const items = loadedOrdersData.map((item, index) => {
    return (
      <div key={index}>
        <div className={classes.flex}>
          <div>
            <div className={classes.name}>
              Produkt: {item.items.name}
            </div>
            <div className={classes.amount}>Ilość: {item.items.amount}</div>
            <div className={classes.price}>Cena szt.: {item.items.price}</div>
            <div className={classes.size}>Rozmiar: {item.items.size}</div>
            <div className={classes.totalAmount}>
              Cena całkowita: {item.totalAmount}
            </div>
            {!isClicked ? (
              <button className={classes.no} onClick={isClickedHandler}>
                Check
              </button>
            ) : (
              <button className={classes.yes} onClick={isClickedHandler}>
                Check
              </button>
            )}
          </div>
          <div>
            <div className={classes.street}>Ulica: {item.user.street}</div>
            <div className={classes.city}>Miasto: {item.user.city}</div>
            <div className={classes.number}>Numer: {item.user.number}</div>
          </div>
        </div>

        <hr className={classes.hr} />
      </div>
    );
  });
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
            <div className={classes.text}>Na miejscu</div>
            <DeliveryItems deliveryItems={items}></DeliveryItems>
          </Container>
        </div>
      )}
    </>
  );
}

export default Delivery;
