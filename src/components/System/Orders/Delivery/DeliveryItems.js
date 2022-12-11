import React, { useState } from "react";
import classes from "./DeliveryItems.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
const DeliveryItems = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [isDone, setIsDone] = useState(false);


  const showHandler = () => {
    setIsShown((prev) => !prev);
  };
  const doneHandler = () => {
    setIsDone((prev) => !prev);
  };
  return (
    <div className={classes.flex}>
      <div className={classes.flexR}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.amount}>x{props.amount}</div>
        <div className={classes.size}>{props.size}</div>
        <div className={classes.price}>{props.price} zł/szt.</div>
      </div>
      {!isShown ? (
        <button className={classes.button} onClick={showHandler}>
          <SlArrowDown />
        </button>
      ) : (
        <button className={classes.button} onClick={showHandler}>
          <SlArrowUp />
        </button>
      )}
      {isShown && (
        <>
          <div className={classes.street}>{props.street}</div>
          <div className={classes.city}>{props.city}</div>
          <div className={classes.number}>Numer: {props.number}</div>
          <hr></hr>
        </>
      )}
      <div className={classes.totalAmount}>
        Cena całkowita: {props.totalAmount}
      </div>
      <div className={classes.time}>Czas: {props.time}</div>
      {isDone ? (
        <button onClick={doneHandler} className={classes.done}>
          ZROBIONE
        </button>
      ) : (
        <button onClick={doneHandler} className={classes.toDo}>
          DO ZROBIENIA
        </button>
      )}
    </div>
  );
};
export default DeliveryItems;
