import React, { useContext } from "react";
import Button from "../../../UI/Button";
import { OrderContext } from "../../../store/order-context";
import CartSummaryItems from "./CartSummaryItems";
import classes from "./CartSummary.module.css";
const CartSummary = (props) => {
  const orderCtx = useContext(OrderContext);
  const totalAmount = orderCtx.totalAmount.toFixed(2);

  const orderItemRemoveHandler = (id) => {
    orderCtx.removeItem(id);
  };
  const orderItemAddHandler = (item) => {
    orderCtx.addItem({ ...item, amount: 1 });
  };

  const orderItem = orderCtx.items.map((item) => (
    <CartSummaryItems
      id={item.id}
      key={item.id}
      name={item.name}
      size={item.size}
      amount={item.amount}
      priceS={item.priceS}
      priceM={item.priceM}
      priceL={item.priceL}
      remove={orderItemRemoveHandler.bind(null, item.id)}
      add={orderItemAddHandler.bind(null, item)}
    />
  ));

  return (
    <div className={classes.box}>
      <Button class={classes.button} onClick={props.onClose}>
        Wróć do menu
      </Button>
      {orderItem}

      <div className={classes.totalAmount}>
        Cena całkowita: <b>{totalAmount}</b> zł
      </div>
    </div>
  );
};

export default CartSummary;
