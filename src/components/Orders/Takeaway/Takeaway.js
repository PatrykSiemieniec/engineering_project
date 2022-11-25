import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
import axios from "axios";
import Countdown from "react-countdown";
function Takeaway() {
  const gridCtx = useContext(GridContext);
  const { isTakeawayClosed } = gridCtx;
  const [takeawayItems, SetTakeawayItems] = useState("");

  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const getDeliveryItems = () => {
    axios
      .get(`${url}takeawayOrders.json`)
      .then((response) => {
        const items = response.data;
        SetTakeawayItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getDeliveryItems();
  }, []);

  let loadedOrdersData = [];
  for (const key in takeawayItems) {
    for (const i in takeawayItems[key].orderedItems) {
      loadedOrdersData.push({
        id: key,
        items: takeawayItems[key].orderedItems[i],
        user: takeawayItems[key].user,
        totalAmount: takeawayItems[key].orderedAmount,
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
      {!isTakeawayClosed && (
        <div className={classes.takeaway}>
          <Container class={classes.container}>
            <p>Na wynos</p>
            <TakeawayItems takeawayItems={items}></TakeawayItems>
          </Container>
        </div>
      )}
    </>
  );
}

export default Takeaway;
