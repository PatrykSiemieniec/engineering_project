import React, { useContext } from "react";
import Button from "../../../UI/Button";
import { OrderContext } from "../../../store/order-context";
import CartSummaryItems from "./CartSummaryItems";
import classes from "./CartSummary.module.css";
const CartSummary = (props) => {
  const orderCtx = useContext(OrderContext);
  const totalAmount = orderCtx.totalAmount.toFixed(2);

  const orderItemRemoveHandler = (id, size) => {
    orderCtx.removeItem(id, size);
  };
  const orderItemAddHandler = (item) => {
    orderCtx.addItem({ ...item, amount: 1 });
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
      <div className={classes.orders}>
      {orderItem}
      </div>
      

      <div className={classes.totalAmount}>
        Cena całkowita: <b>{totalAmount}</b> zł
      </div>
    </div>
  );
};

export default CartSummary;
