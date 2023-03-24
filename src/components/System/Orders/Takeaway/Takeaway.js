import React, { useContext, useState, useEffect } from "react";
import { GridContext } from "../../../../store/grid-context";
import Container from "../../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
import axios from "axios";

import { LanguageContext } from "./../../../../store/language-context";
import lang from "./../../../../translation/lang.json";

function Takeaway() {
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.orders;
  const gridCtx = useContext(GridContext);
  const { isTakeawayClosed, reload, isNightMode } = gridCtx;
  const [takeawayItems, SetTakeawayItems] = useState("");
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const user = localStorage.getItem("uid");
  const URL = process.env.REACT_APP_FIREBASE_URL;

  const getTakeawayItems = async () => {
    await axios
      .get(`${URL}/${user}/takeawayOrders.json`)
      .then((response) => {
        const items = response.data;
        SetTakeawayItems(items);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getTakeawayItems();
  }, [reload]);

  const loadedOrdersData = [];
  for (const key in takeawayItems) {
    for (const i in takeawayItems[key].orderedItems) {
      if (takeawayItems[key].orderedItems[i] !== null) {
        loadedOrdersData.push({
          id: key,
          index: i,
          name: takeawayItems[key]?.orderedItems[i]?.name,
          size: takeawayItems[key]?.orderedItems[i]?.size,
          amount: takeawayItems[key]?.orderedItems[i]?.amount,
          price: takeawayItems[key]?.orderedItems[i]?.price,
          done: takeawayItems[key]?.orderedItems[i]?.done,
          user: takeawayItems[key]?.user,
          totalAmount: takeawayItems[key]?.orderedAmount,
          color: takeawayItems[key]?.color,
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
      <TakeawayItems
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

  const takeawayStyles = `${classes.takeaway} ${isNightMode && classes.takeawayNight
    }`;
  const titleStyles = `${classes.title} ${isNightMode && classes.titleNight}`;
  return (
    <>
      {!isTakeawayClosed && (
        <div className={takeawayStyles}>
          <div className={titleStyles}>
            <p className={paragraphClass}>{language.takeaway}</p>
          </div>
          <Container class={classes.container}>{content}</Container>
        </div>
      )}
    </>
  );
}

export default Takeaway;
