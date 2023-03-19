import React, { useContext, useRef, useState } from "react";
import { GridContext } from "../../../store/grid-context";
import classes from "./Settings.module.css";
import Button from "../../../UI/Button";
import Modal from "../../../UI/Modal";
const Settings = () => {
  const gridCtx = useContext(GridContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState('');

  const { handleSettingsShown, handleName, isNightMode } = gridCtx;
  const inputNameRef = useRef();
  const inputOpenRef = useRef();
  const inputCloseRef = useRef();

  let nameRef;
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const labelClass = `${classes.label} ${isNightMode && classes.labelNight}`

  const setNameHandler = () => {
    nameRef = inputNameRef.current.value;
    handleName(nameRef);
  };

  const deleteNameHandler = () => {
    handleName("");
  };

  let openHour = 0;
  let closeHour = 0;

  const workHoursHandler = () => {
    openHour = +inputOpenRef.current.value;
    closeHour = +inputCloseRef.current.value;

    if (openHour < 0 || openHour > 24) {
      console.log("Błędna godzina otwarcai");
      setErrorMessage(
        "Błędna godzina otwarcia (mniejsza od 0 lub większa od 24)"
      );
      setError(true);
    } else if (closeHour < 0 || closeHour > 24) {
      console.log("Błędna godzina zamkniecia");
      setErrorMessage(
        "Błędna godzina zamknięcia(mniejsza od 0 lub większa od 24)"
      );
      setError(true);
    } else if (openHour >= closeHour) {
      setErrorMessage(
        "Godzina otwarcia nie może być wcześniejsza bądź równa godzinie zamknięcia"
      );
      setError(true);
    } else {
      setError(false);

      try {
        localStorage.setItem("openHour", openHour);
        localStorage.setItem("closeHour", closeHour);
      } catch (error) {
        console.log(error);
      }
      setMessage(`Pomyślnie ustawiono godzinę otwarcia na ${openHour} oraz zamknięcia na ${closeHour}`)
    }

    console.log(openHour, closeHour);
  };

  return (
    <Modal>
      <div className={classes.settings}>
        <div className={classes.header}>
          <Button
            class={classes.button}
            onClick={() => {
              handleSettingsShown(false);
              setErrorMessage("");
              setError(false);
              setMessage('')
            }}
          >
            Powrót
          </Button>
        </div>
        <p className={paragraphClass}>Nazwa</p>
        <div className={classes.flex}>
          <input
            type="text"
            ref={inputNameRef}
            placeholder="Podaj nowa nazwę"
          ></input>
          <Button onClick={setNameHandler}>Dodaj</Button>
          <Button onClick={deleteNameHandler}>Usuń</Button>
        </div>
        <p className={paragraphClass}>Ustaw godziny pracy</p>

        <div className={classes.flex}>
          <div className={classes.time}>
            <label className={labelClass}>Od:{" "}</label>
            <input type="number" step="1" min="0" max="24" ref={inputOpenRef} />
          </div>

          <div className={classes.time}>
            <label className={labelClass}>Do:{" "}</label>
            <input
              type="number"
              step="1"
              min="0"
              max="24"
              ref={inputCloseRef}
            />
          </div>
          <Button onClick={workHoursHandler}>Zapisz</Button>
        </div>
        {error && <p className={classes.error}>{errorMessage}</p>}
        {message && <p className={paragraphClass}>{message}</p>}
        <div>
          <p className={paragraphClass}> Zmiana Hasła </p>
          <form className={classes.changePasswordForm}>
            <label className={labelClass}>Aktualne Hasło</label>
            <input type="password" required />
            <label className={labelClass}>Nowe Hasło</label>
            <input type="password" required />
            <label className={labelClass}>Powtórz Nowe Hasło</label>
            <input type="password" required />
            <Button>Zapisz</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
