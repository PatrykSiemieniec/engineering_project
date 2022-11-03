import React from "react";
import classes from './TakeawayItems.module.css'
function TakeawayItems(props) {
  return (
    <div className={classes.flex}>
      <div className={classes.name}>Nazwa: {props.items.name}</div>
      <div className={classes.amount}>Ilość: {props.items.amount}</div>
      <div className={classes.price}>Cena za szt.: {props.items.price}</div>
      <div className={classes.size}>Rozmiar: {props.items.size}</div>
      <div className={classes.city}>Miasto: {props.user.city}</div>
      <div className={classes.number}>Numer: {props.user.number}</div>
      <div className={classes.street}>Ulica: {props.user.street}</div>
      <div className={classes.totalAmount}>
        Cena całkowita: {props.totalAmount}
      </div>
    </div>
  );
}

export default TakeawayItems;
