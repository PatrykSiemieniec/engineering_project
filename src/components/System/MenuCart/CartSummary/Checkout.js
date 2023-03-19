import { useRef, useState, useContext } from "react";
import classes from "./Checkout.module.css";
import { GridContext } from "../../../../store/grid-context";
import { OrderContext } from "../../../../store/order-context";
import Button from "../../../../UI/Button";
const isEmpty = (value) => value.trim() === "";
const isNineChars = (value) => value.trim().length === 9;

const Checkout = (props) => {
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
    handleReload(prev => !prev);
    orderCtx.clearCart();
  };

  const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid
    }`;
  const numberControlClasses = `${classes.control} ${formInputValidity.number ? "" : classes.invalid
    }`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid
    }`;

  const openHour = localStorage.getItem('openHour')
  const closeHour = localStorage.getItem('closeHour')

  const formStyles = `${classes.form} ${isNightMode && classes.formNight}`
  return (
    <form className={formStyles} onSubmit={confirmHandler}>
      <div className={classes.orderType}>
        <label htmlFor="type">Rodzaj zamówienia {' '}</label>
        <select ref={typeSelectRef}>
          <option value="delivery">Na dowóz</option>
          <option value="onspot">Na miejscu</option>
          <option value="takeaway">Na wynos</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="time">Podaj godzine wydania zamówienia</label>
        <input placeholder="minutes" type="time" id="time" ref={timeRef} min={`${openHour}:00`} mmax={`${closeHour}:00`} required />
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
        <Button onClick={handleIsSend}>
          Wyślij
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
