import React, { useContext } from "react";
import Button from "../../../UI/Button";
import { OrderContext } from "../../../store/order-context";
import CartSummaryItems from "./CartSummaryItems";
import classes from "./CartSummary.module.css";
import Checkout from "./Checkout";
const CartSummary = (props) => {
  const orderCtx = useContext(OrderContext);
  const totalAmount = orderCtx.totalAmount.toFixed(2);
  const orderItemRemoveHandler = (id, size) => {
    orderCtx.removeItem(id, size);
  };
  const orderItemAddHandler = (item) => {
    orderCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = (userData) => {
    if (userData.type === "delivery") {
      fetch(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/deliveryOrders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
          }),
        }
      );
    } else if (userData.type === "onspot") {
      fetch(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/onspotOrders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
          }),
        }
      );
    } else {
      fetch(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/takeawayOrders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: orderCtx.items,
            orderedAmount: orderCtx.totalAmount,
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

  return (
    <div className={classes.box}>
      <Button class={classes.button} onClick={props.onClose}>
        Wróć do menu
      </Button>
      <div className={classes.orders}>{orderItem}</div>
      <Checkout order={orderItem} onHideCart={props.onHideCart} onConfirm={submitOrderHandler} />
      <div className={classes.totalAmount}>
        Cena całkowita: <b>{totalAmount}</b> zł
      </div>
    </div>
  );
};

export default CartSummary;
