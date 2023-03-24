import React, { useEffect, useState, useContext } from "react";
import Modal from "../../../UI/Modal";
import Menu from "./Menu";
import classes from "./Cart.module.css";
import Button from "../../../UI/Button";
import { OrderContext } from "../../../store/order-context";
import { LanguageContext } from "../../../store/language-context";
import lang from './../../../translation/lang.json'
import CartSummary from "./CartSummary/CartSummary";
function Cart(props) {
  const orderCtx = useContext(OrderContext);
  const { items } = orderCtx;
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSummaryClicked, setIsSummaryClicked] = useState(false);

  const { choosenLanguage } = useContext(LanguageContext)
  const language = lang[choosenLanguage].system.menuCart;

  const check = items.length > 0;
  useEffect(() => {
    if (check) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
      setIsSummaryClicked(false);
    }
  }, [check]);

  const openSummaryHandler = () => {
    setIsSummaryClicked(true);
  };

  const closeSummaryHandler = () => {
    setIsSummaryClicked(false);
  };

  return (
    <Modal onClose={props.onHideCart}>
      <div className={classes.buttons}>
        {!isSummaryClicked && (
          <Button class={classes.closeButton} onClick={props.onHideCart}>
            X
          </Button>
        )}
        {isSummaryClicked && (
          <Button class={classes.backButton} onClick={closeSummaryHandler}>
            {language.back}
          </Button>
        )}
        {!isEmpty && !isSummaryClicked && (
          <Button onClick={openSummaryHandler} class={classes.summaryButton}>
            {language.summary}
          </Button>
        )}
      </div>
      {!isSummaryClicked && <Menu />}
      {isSummaryClicked && (
        <CartSummary
          onHideCart={props.onHideCart}
        />
      )}
    </Modal>
  );
}

export default Cart;
