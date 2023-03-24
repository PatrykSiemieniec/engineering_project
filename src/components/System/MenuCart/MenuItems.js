import React, { useState, useContext } from "react";
import classes from "./MenuItems.module.css";
import Button from "../../../UI/Button";
import { OrderContext } from "../../../store/order-context";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from './../../../translation/lang.json'
import MenuItemsForm from "./MenuItemsForm";

const MenuItems = (props) => {
  const [isInputShown, setIsInputShown] = useState(false);
  const orderCtx = useContext(OrderContext);
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;

  const { choosenLanguage } = useContext(LanguageContext)
  const language = lang[choosenLanguage].system.menuCart;

  const addItemToOrderHandler = (amount, size) => {
    let id = "";
    let price = 0;
    if (size === "small") {
      id = props.id + "s";
      price = props.priceS;
    } else if (size === "large") {
      id = props.id + "l";
      price = props.priceL;
    } else if (size === "medium") {
      id = props.id + "m";
      price = props.priceM;
    }
    orderCtx.addItem({
      id: id,
      name: props.name,
      amount,
      size,
      price,
      done: false,
    });
    setIsInputShown(false);
  };

  const inputShownHandler = () => {
    setIsInputShown(true);
  };

  const inputCloseHandler = () => {
    setIsInputShown(false);
  };

  const boxStyles = `${classes.box} ${isNightMode && classes.boxNight}`;

  return (
    <div className={boxStyles}>
      <div className={classes.orders}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.ingredients}>{props.ingredients}</div>
        <div className={classes.price}>
          {props.priceS}/{props.priceM}/{props.priceL}zł
        </div>
      </div>
      <div className={classes.secondBox}>
        <Button onClick={inputShownHandler} class={classes.button} display={isInputShown ? 'none' : null}>
          {language.add}
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
