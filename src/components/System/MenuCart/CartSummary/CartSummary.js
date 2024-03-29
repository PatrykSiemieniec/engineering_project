import React, { useContext } from "react";
import Button from "../../../../UI/Button";
import { OrderContext } from "../../../../store/order-context";
import { GridContext } from "../../../../store/grid-context";
import { LanguageContext } from './../../../../store/language-context'
import lang from './../../../../translation/lang.json'
import CartSummaryItems from "./CartSummaryItems";
import classes from "./CartSummary.module.css";
import Checkout from "./Checkout";
const CartSummary = (props) => {
  const orderCtx = useContext(OrderContext);
  const { isNightMode } = useContext(GridContext);
  const totalAmount = orderCtx.totalAmount.toFixed(2);
  const orderItemRemoveHandler = (id, size) => {
    orderCtx.removeItem(id, size);
  };
  const orderItemAddHandler = (item) => {
    orderCtx.addItem({ ...item, amount: 1 });
  };

  const { choosenLanguage } = useContext(LanguageContext)
  const language = lang[choosenLanguage].system.menuCart;
  const user = localStorage.getItem("uid");

  const arr = [
    "#f5f5f5",
    "#f0ffff",
    "#f5fffa",
    "#f0fff0",
    "#f5f5dc",
    "#fafad2",
    "#ffffe0",
    "#fffacd",
    "#fdfd96",
    "#e6e6fa",
    "#dcdcdc",
    "#ffe4e1",
    "#f0e68c",
    "#f5deb3",
    "#ffe4c4",
    "#eee8aa",
    "#d8bfd8",
    "#d3d3d3",
    "#add8e6",
    "#90ee90",
    "#b0e0e6",
    "#d9d9f3",
    "#ffe4b5",
    "#ffb6c1",
    "#ffdead",
    "#f5b041",
    "#f8d7da",
    "#f4a460",
    "#f0f8ff",
    "#f0e6ff",
    "#f0dc82",
    "#e0ffff",
    "#dcd0ff",
    "#f4f4f4",
    "#e0eee0",
    "#d2b48c",
    "#c7c7c7",
    "#c0c0c0",
    "#b0c4de",
    "#a9a9a9",
    "#9acd32",
    "#87cefa",
    "#778899",
    "#32cd32",
  ];
  let prevIndex = -1;
  function getRandomColor() {
    let index;
    do {
      index = Math.floor(Math.random() * arr.length);
    } while (index === prevIndex);
    prevIndex = index;
    return arr[index];
  }

  const URL = process.env.REACT_APP_FIREBASE_URL;

  const submitOrderHandler = (userData) => {
    if (userData.type === "delivery") {
      fetch(
        `${URL}/${user}/deliveryOrders.json`,
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
            color: getRandomColor(),
          }),
        }
      );
    } else if (userData.type === "onspot") {
      fetch(
        `${URL}/${user}/onspotOrders.json`,
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
            color: getRandomColor(),
          }),
        }
      );
    } else {
      fetch(
        `${URL}/${user}/takeawayOrders.json`,
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
            color: getRandomColor(),
          }),
        }
      );
    }
  };

  const orderItem = orderCtx.items.map((item, index) => (
    <CartSummaryItems
      id={item.id}
      key={index}
      name={item.name}
      size={item.size}
      amount={item.amount}
      price={item.price}
      remove={orderItemRemoveHandler.bind(null, item.id, item.size)}
      add={orderItemAddHandler.bind(null, item)}
    />
  ));

  const amountStyles = `${classes.totalAmount} ${isNightMode && classes.totalAmountNight
    }`;
  return (
    <div className={classes.box}>
      <div className={classes.orders}>{orderItem}</div>
      <div className={amountStyles}>
        {language.totalAmount} <b>{totalAmount}</b> zł
      </div>
      <Checkout
        order={orderItem}
        onHideCart={props.onHideCart}
        onConfirm={submitOrderHandler}
      />
    </div>
  );
};

export default CartSummary;
