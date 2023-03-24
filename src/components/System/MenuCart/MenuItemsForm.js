import React, { useState, useRef, useContext } from "react";
import Input from "../../../UI/Input";
import classes from "./MenuItemsForm.module.css";
import Button from "../../../UI/Button";
import { LanguageContext } from "../../../store/language-context";
import lang from './../../../translation/lang.json'
const MenuItemsForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const sizeInputRef = useRef();

  const { choosenLanguage } = useContext(LanguageContext)
  const language = lang[choosenLanguage].system.menuCart;

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    const enteredSize = sizeInputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 9
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToOrder(enteredAmountNumber, enteredSize);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Ilość"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "9",
          step: "1",
          defaultValue: "1",
        }}
      />
      <select ref={sizeInputRef}>
        <option value="small">{language.small}</option>
        <option value="medium">{language.medium}</option>
        <option value="large">{language.large}</option>
      </select>
      <Button class={classes.button} onClick={props.onAdd}>{language.add}</Button>
      {!amountIsValid && <p>{language.amountError}</p>}
    </form>
  );
};

export default MenuItemsForm;
