import React, { useContext } from "react";
import Button from "../../../../UI/Button";
import classes from "./CartSummaryItems.module.css";
import { GridContext } from "../../../../store/grid-context";

const CartSummaryItems = (props) => {
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;
  const amount = props.price * props.amount;
  const summaryStyles = `${classes.summaryStyles} ${isNightMode && classes.summaryStylesNight}`
  return (
    <div className={summaryStyles}>
      <div className={classes.box}>
        <div className={classes.name}> Nazwa: {props.name}</div>
        <div className={classes.size}> Rozmiar: {props.size}</div>
        <div className={classes.amount}> Ilość: {props.amount}</div>
        <div className={classes.price}> Cena: {amount} zł</div>
        <Button onClick={props.add} class={classes.addButton}>
          +
        </Button>
        <Button onClick={props.remove} class={classes.removeButton}>
          -
        </Button>
      </div>
      <div>
        ---------------------------------------------------------------------------------------------------------
      </div>
    </div>
  );
};

export default CartSummaryItems;
