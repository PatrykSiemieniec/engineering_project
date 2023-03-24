import React, { useState, useContext } from "react";
import classes from "./OnSpotItems.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import axios from "axios";
import { GridContext } from "../../../../store/grid-context";
import { MdDelete } from "react-icons/md";

import { LanguageContext } from "./../../../../store/language-context";
import lang from "./../../../../translation/lang.json";


function OnSpotItems(props) {
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.orders;
  const [isShown, setIsShown] = useState(false);
  const { handleReload } = useContext(GridContext);
  const URL = process.env.REACT_APP_FIREBASE_URL;
  const showHandler = () => {
    setIsShown((prev) => !prev);
  };

  const user = localStorage.getItem("uid");
  let done;
  const doneHandler = async () => {
    done = "true";
    await axios.put(
      `${URL}/${user}/onspotOrders/${props.id}/orderedItems/${props.index}/done.json`,
      done
    );
    handleReload((prev) => !prev);
  };
  const backHandler = async () => {
    done = "false";
    await axios.put(
      `${URL}/${user}/onspotOrders/${props.id}/orderedItems/${props.index}/done.json`,
      done
    );
    handleReload((prev) => !prev);
  };

  const deleteOrderHandler = async () => {
    const totalAmount = props.totalAmount;
    const price = props.price;
    const amount = props.amount;
    const updatedAmount = totalAmount - (amount * price);

    await axios.delete(
      `${URL}/${user}/onspotOrders/${props.id}/orderedItems/${props.index}.json`
    );
    await axios
      .get(`${URL}/${user}/onspotOrders/${props.id}/orderedItems.json`)
      .then((response) =>
        response?.data !== null
          ? axios.put(
            `${URL}/${user}/onspotOrders/${props.id}/orderedAmount.json`,
            updatedAmount
          )
          : axios.delete(`${URL}/${user}/onspotOrders/${props.id}.json`)
      );

    handleReload((prev) => !prev);
  };

  return (
    <div className={classes.flex} style={{ backgroundColor: `${props.color}` }}>
      <div className={classes.flexR}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.amount}>x{props.amount}</div>
        <div className={classes.size}>{props.size}</div>
        <div className={classes.price}>{props.price} zł/{language.pcs}</div>
        <button onClick={deleteOrderHandler} className={classes.delete}>
          <MdDelete style={{ color: "black", fontSize: "25px" }} />
        </button>
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
          <div className={classes.number}>{language.number} {props.number}</div>
          <hr></hr>
        </>
      )}
      <div className={classes.totalAmount}>
        {language.totalAmount} {props.totalAmount}
      </div>
      <div className={classes.time}>Czas: {props.time}</div>
      {props.done ? (
        <button onClick={backHandler} className={classes.done} >
          {language.done}
        </button>
      ) : (
        <button onClick={doneHandler} className={classes.toDo} >
          {language.todo}
        </button>
      )}
    </div>
  );
}

export default OnSpotItems;
