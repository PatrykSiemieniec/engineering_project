import React, { useContext } from "react";
import Button from "../../../../UI/Button";
import classes from "./CartSummaryItems.module.css";
import { GridContext } from "../../../../store/grid-context";

const CartSummaryItems = (props) => {
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;
  const amount = props.price * props.amount;
  const summaryStyles = `${classes.summaryStyles} ${isNightMode && classes.summaryStylesNight
    }`;
  return (
    <div className={summaryStyles}>
      <div className={classes.box}>
        <div className={classes.name}>
          Nazwa:<b>{" "}{props.name}</b>
        </div>
        <div className={classes.size}> Rozmiar:<b>{" "}{props.size}</b></div>
        <div className={classes.amount}> Ilość: <b>{" "}{props.amount}</b></div>
        <div className={classes.price}> Cena: <b>{amount} zł</b></div>
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
