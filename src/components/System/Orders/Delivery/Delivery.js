import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "../../../../store/grid-context";
import Container from "../../../../UI/Container";
import classes from "./Delivery.module.css";
import DeliveryItems from "./DeliveryItems";
import axios from "axios";
import { LanguageContext } from "./../../../../store/language-context";
import lang from "./../../../../translation/lang.json";

function Delivery() {
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.orders;
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, reload, isNightMode } = gridCtx;
  const [deliveryItems, setDeliveryItems] = useState("");
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const user = localStorage.getItem("uid");
  const URL = process.env.REACT_APP_FIREBASE_URL;

  const getDeliveryItems = async () => {
    await axios
      .get(`${URL}/${user}/deliveryOrders.json`)
      .then((response) => {
        const items = response.data;
        setDeliveryItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getDeliveryItems();
  }, [reload]);

  let loadedOrdersData = [];

  for (const key in deliveryItems) {
    for (const i in deliveryItems[key].orderedItems) {
      if (deliveryItems[key].orderedItems[i] !== null) {
        loadedOrdersData.push({
          id: key,
          index: i,
          name: deliveryItems[key]?.orderedItems[i]?.name,
          size: deliveryItems[key]?.orderedItems[i]?.size,
          amount: deliveryItems[key]?.orderedItems[i]?.amount,
          price: deliveryItems[key]?.orderedItems[i]?.price,
          done: deliveryItems[key]?.orderedItems[i]?.done,
          user: deliveryItems[key]?.user,
          totalAmount: deliveryItems[key]?.orderedAmount,
          color: deliveryItems[key]?.color,
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
      <DeliveryItems
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
    content = <p className={paragraphClass}>{language.noorders}</p>;
  } else {
    content = items;
  }

  const deliveryStyles = `${classes.delivery} ${isNightMode && classes.deliveryNight
    }`;
  const titleStyles = `${classes.title} ${isNightMode && classes.titleNight}`;

  return (
    <>
      {!isDeliveryClosed && (
        <div className={deliveryStyles}>
          <div className={titleStyles}>
            <p className={paragraphClass}>{language.delivery}</p>
          </div>
          <Container class={classes.container}>{content}</Container>
        </div>
      )}
    </>
  );
}

export default Delivery;
