import React from "react";
import classes from "./MenuItems.module.css";

const MenuItems = (props) => {
  return (
    <div className={classes.grid}>
      <div className={classes.orders}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.ingredients}>{props.ingredients}</div>
        <div className={classes.price}>{props.price}zł</div>
      </div>

      <button className={classes.button}>+ Dodaj</button>
    </div>
  );
};

export default MenuItems;
