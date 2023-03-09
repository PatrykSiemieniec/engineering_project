import React, { useState, useRef } from "react";
import Input from "../../../UI/Input";
import classes from "./MenuItemsForm.module.css";
import Button from "../../../UI/Button";
const MenuItemsForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const sizeInputRef = useRef();

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
        <option value="small">Mała</option>
        <option value="medium">Średnia</option>
        <option value="large">Duża</option>
      </select>
      <Button class={classes.button} onClick={props.onAdd}>+ Dodaj</Button>
      {!amountIsValid && <p>Prosze podaj prawidłową wartość</p>}
    </form>
  );
};

export default MenuItemsForm;
