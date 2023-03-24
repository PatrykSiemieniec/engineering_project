import { useRef, useState, useContext, useEffect } from "react";
import classes from "./Checkout.module.css";
import { GridContext } from "../../../../store/grid-context";
import { OrderContext } from "../../../../store/order-context";
import { LanguageContext } from "../../../../store/language-context";
import lang from "./../../../../translation/lang.json";
import Button from "../../../../UI/Button";
import axios from "axios";
const isEmpty = (value) => value.trim() === "";
const isNineChars = (value) => value.trim().length === 9;

const Checkout = (props) => {
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.menuCart;

  const user = localStorage.getItem("uid");
  const [response, setResponse] = useState();
  const gridCtx = useContext(GridContext);
  const orderCtx = useContext(OrderContext);
  const { handleReload, handleIsSend, isNightMode } = gridCtx;
  const [formInputValidity, setFormInputValidity] = useState({
    street: true,
    city: true,
    number: true,
  });
  const streetInputRef = useRef();
  const numberInputRef = useRef();
  const cityInputRef = useRef();
  const typeSelectRef = useRef();
  const timeRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredStreet = streetInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredType = typeSelectRef.current.value;
    const enteredTime = timeRef.current.value;
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredNumberIsValid = isNineChars(enteredNumber);

    setFormInputValidity({
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      number: enteredNumberIsValid,
    });

    const formIsValid =
      enteredStreetIsValid && enteredCityIsValid && enteredNumberIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      street: enteredStreet,
      city: enteredCity,
      number: enteredNumber,
      type: enteredType,
      time: enteredTime,
    });

    props.onHideCart();
    handleReload((prev) => !prev);
    orderCtx.clearCart();
  };

  const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid
    }`;
  const numberControlClasses = `${classes.control} ${formInputValidity.number ? "" : classes.invalid
    }`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid
    }`;

  const URL = process.env.REACT_APP_FIREBASE_URL;

  useEffect(() => {
    const fetchConfig = async () => {
      await axios
        .get(
          `${URL}/${user}/config.json`
        )
        .then((response) => setResponse(response));
    };

    fetchConfig();
  }, [user]);

  const formStyles = `${classes.form} ${isNightMode && classes.formNight}`;
  return (
    <form className={formStyles} onSubmit={confirmHandler}>
      <div className={classes.orderType}>
        <label htmlFor="type">{language.type} </label>
        <select ref={typeSelectRef}>
          <option value="delivery">{language.delivery}</option>
          <option value="onspot">{language.onspot}</option>
          <option value="takeaway">{language.takeaway}</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="time">{language.hour}</label>
        <input
          placeholder="minutes"
          type="time"
          id="time"
          ref={timeRef}
          min={`${response?.data?.openHour}:00`}
          max={`${response?.data?.closeHour}:00`}
          required
        />
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">{language.street}</label>
        <input
          placeholder="Lotnicza 9/33"
          type="text"
          id="street"
          ref={streetInputRef}
        />
        {!formInputValidity.street && <h5>{language.streetError}</h5>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">{language.city}</label>
        <input
          placeholder="Skarżysko-Kamienna"
          type="text"
          id="city"
          ref={cityInputRef}
        />
        {!formInputValidity.city && <h5>{language.cityError}</h5>}
      </div>
      <div className={numberControlClasses}>
        <label htmlFor="number">{language.number}</label>
        <input
          placeholder="123123123"
          type="text"
          id="number"
          ref={numberInputRef}
        />
        {!formInputValidity.number && <h5>{language.numberError}</h5>}
      </div>
      <div className={classes.actions}>
        <Button onClick={handleIsSend}>{language.submit}</Button>
      </div>
    </form>
  );
};

export default Checkout;
