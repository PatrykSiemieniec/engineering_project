import React, { useEffect, useState, useContext } from "react";
import Modal from "../../UI/Modal";
import Menu from "./Menu";
import classes from "./Cart.module.css";
import Button from "../../UI/Button";
import { OrderContext } from "../../store/order-context";
import CartSummary from "./CartSummary/CartSummary";
function Cart(props) {
  const orderCtx = useContext(OrderContext);
  const { items } = orderCtx;
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSummaryClicked, setIsSummaryClicked] = useState(false);

  

  const check = items.length > 0;
  useEffect(() => {
    if (check) {
      setIsEmpty(false);
    }
  }, [check]);

  const openSummaryHandler = () =>{
    setIsSummaryClicked(true);
  }

  const closeSummaryHandler = () =>{
    setIsSummaryClicked(false);
  }

  return (
    <Modal onClose={props.onHideCart}>
      {!isSummaryClicked &&<Button class={classes.button} onClick={props.onHideCart}>
        X
      </Button>}
      {!isEmpty && <Button onClick={openSummaryHandler} class={classes.button2}>Podsumowanie</Button>}
      {!isSummaryClicked && <Menu />}
      {isSummaryClicked && <CartSummary onClose={closeSummaryHandler}/>}
    </Modal>
  );
}

export default Cart;
