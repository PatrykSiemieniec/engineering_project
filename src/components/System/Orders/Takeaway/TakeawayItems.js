import React, { useState, useContext } from "react";
import classes from "./TakeawayItems.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { GridContext } from "../../../../store/grid-context";
import axios from "axios";
import { MdDelete } from "react-icons/md";
function TakeawayItems(props) {
  const url =
    "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

  const [isShown, setIsShown] = useState(false);
  const { handleReload } = useContext(GridContext);


  const user = localStorage.getItem("uid");
  let done;
  const doneHandler = () => {
    done = 'true';
    axios.put(`${url}/${user}/takeawayOrders/${props.id}/orderedItems/${props.index}/done.json`, done);
    handleReload(prev => !prev);
  };
  const backHandler = () => {
    done = 'false';
    axios.put(`${url}/${user}/takeawayOrders/${props.id}/orderedItems/${props.index}/done.json`, done);
    handleReload(prev => !prev);
  }

  const deleteOrderHandler = () => {
    const totalAmount = props.totalAmount;
    const price = props.price;
    const amount = props.amount;
    const updatedAmount = totalAmount - (amount * price);

    axios.delete(`${url}/${user}/takeawayOrders/${props.id}/orderedItems/${props.index}.json`);
    axios.put(
      `${url}/${user}/takeawayOrders/${props.id}/orderedAmount.json`,
      updatedAmount
    );
    handleReload(prev => !prev);
  }

  const showHandler = () => {
    setIsShown((prev) => !prev);
  };

  return (
    <div className={classes.flex} style={{ backgroundColor: `${props.color}` }}>
      <div className={classes.flexR}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.amount}>x{props.amount}</div>
        <div className={classes.size}>{props.size}</div>
        <div className={classes.price}>{props.price} zł/szt.</div>
        <button onClick={deleteOrderHandler} className={classes.delete}><MdDelete style={{ color: "black", fontSize: "25px" }} /></button>
      </div>
      {!isShown ? (
        <button className={classes.button} onClick={showHandler} style={{ backgroundColor: `${props.color}` }}>
          <SlArrowDown />
        </button>
      ) : (
        <button className={classes.button} onClick={showHandler} style={{ backgroundColor: `${props.color}` }}>
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
      {props.done ? (
        <button onClick={backHandler} className={classes.done}>
          ZROBIONE
        </button>
      ) : (
        <button onClick={doneHandler} className={classes.toDo}>
          DO ZROBIENIA
        </button>
      )}
    </div>
  );
}

export default TakeawayItems;
