import { useRef, useState, useContext } from "react";
import classes from "./Checkout.module.css";
import { GridContext } from "../../../store/grid-context";

const isEmpty = (value) => value.trim() === "";
const isNineChars = (value) => value.trim().length === 9;

const Checkout = (props) => {
  const gridCtx = useContext(GridContext);
  const { handleIsSend } = gridCtx;
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

    const time = enteredTime.split(":");

    const timeNow = new Date();
    const hourNowMs = timeNow.getHours() * 3600000;
    const minutesNowMs = timeNow.getMinutes() * 60000;
    const timeNowMs = hourNowMs + minutesNowMs;
    const mseconds = time[0] * 3600000 + time[1] * 60000 - timeNowMs;

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
      time: mseconds,
    });
  };

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const numberControlClasses = `${classes.control} ${
    formInputValidity.number ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div>
        <label htmlFor="type">Rodzaj zamówienia</label>
        <select ref={typeSelectRef}>
          <option value="delivery">Na dowóz</option>
          <option value="onspot">Na miejscu</option>
          <option value="takeaway">Na odbiór</option>
        </select>
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="time">Czas</label>
        <input placeholder="minutes" type="time" id="time" ref={timeRef} />
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Ulica</label>
        <input
          placeholder="Lotnicza 9/33"
          type="text"
          id="street"
          ref={streetInputRef}
        />
        {!formInputValidity.street && <h5>Prosze podaj poprawna ulice!</h5>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Miasto</label>
        <input
          placeholder="Skarżysko-Kamienna"
          type="text"
          id="city"
          ref={cityInputRef}
        />
        {!formInputValidity.city && <h5>Prosze podaj poprawne miasto!</h5>}
      </div>
      <div className={numberControlClasses}>
        <label htmlFor="number">Numer</label>
        <input
          placeholder="123123123"
          type="text"
          id="number"
          ref={numberInputRef}
        />
        {!formInputValidity.number && (
          <h5>Prosze podaj poprawny numer telefonu!</h5>
        )}
      </div>

      <div className={classes.actions}>
        <button className={classes.submit} onClick={handleIsSend}>
          Wyślij
        </button>
      </div>
    </form>
  );
};

export default Checkout;
