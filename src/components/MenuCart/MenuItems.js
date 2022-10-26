import React, { useState, useContext } from "react";
import classes from "./MenuItems.module.css";
import Button from "../../UI/Button";
import { OrderContext } from "../../store/order-context";
import MenuItemsForm from "./MenuItemsForm";

const MenuItems = (props) => {
  const [isInputShown, setIsInputShown] = useState(false);
  const orderCtx = useContext(OrderContext);

  const addItemToOrderHandler = (amount, size) => {
    orderCtx.addItem({
      id: props.id,
      name: props.name,
      amount,
      size,
      priceS: props.priceS,
      priceM: props.priceM,
      priceL: props.priceL,
    });
  };

  const inputShownHandler = () => {
    setIsInputShown(true);
  };

  const inputCloseHandler = () => {
    setIsInputShown(false);
  };

  return (
    <div className={classes.grid}>
      <div className={classes.orders}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.ingredients}>{props.ingredients}</div>
        <div className={classes.price}>
          {props.priceS}/{props.priceM}/{props.priceL}zł
        </div>
      </div>
      <div className={classes.secondBox}>
        <Button onClick={inputShownHandler} class={classes.button}>
          + Dodaj
        </Button>
      </div>
      {isInputShown && (
        <MenuItemsForm
          onClose={inputCloseHandler}
          onAddToOrder={addItemToOrderHandler}
        />
      )}
    </div>
  );
};

export default MenuItems;
