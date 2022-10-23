import React from "react";
import Modal from "../../UI/Modal";
import Menu from "./Menu";
import classes from './Cart.module.css'

function Cart(props) {
  return (
    <Modal onClose={props.onHideCart}>
      <button className={classes.button} onClick={props.onHideCart}>X</button>
      <Menu/>
    </Modal>
  );
}

export default Cart;
