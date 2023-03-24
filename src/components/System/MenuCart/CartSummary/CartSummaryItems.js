import React, { useContext } from "react";
import Button from "../../../../UI/Button";
import classes from "./CartSummaryItems.module.css";
import { GridContext } from "../../../../store/grid-context";
import { LanguageContext } from "../../../../store/language-context";
import lang from './../../../../translation/lang.json'
const CartSummaryItems = (props) => {
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;
  const price = props.price * props.amount;
  const summaryStyles = `${classes.summaryStyles} ${isNightMode && classes.summaryStylesNight
    }`;

  const { choosenLanguage } = useContext(LanguageContext)
  const language = lang[choosenLanguage].system.menuCart;
  return (
    <div className={summaryStyles}>
      <div className={classes.box}>
        <div className={classes.name}>
          {language.name}<b>{" "}{props.name}</b>
        </div>
        <div className={classes.size}> {language.size}<b>{" "}{props.size}</b></div>
        <div className={classes.amount}>{language.amount} <b>{" "}{props.amount}</b></div>
        <div className={classes.price}> {language.price} <b>{price} zł</b></div>
        <div className={classes.buttons}>
          <Button onClick={props.add} class={classes.addButton}>
            +
          </Button>
          <Button onClick={props.remove} class={classes.removeButton}>
            -
          </Button>
        </div>
      </div>
      <div className={classes.hr}>
        <hr></hr>
      </div>
    </div>
  );
};

export default CartSummaryItems;
