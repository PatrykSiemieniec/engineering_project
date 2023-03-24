import React, { useContext, useRef, useState } from "react";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from "./../../../translation/lang.json";
import classes from "./Settings.module.css";
import Button from "../../../UI/Button";
import Modal from "../../../UI/Modal";
import axios from "axios";

const Settings = () => {
  const gridCtx = useContext(GridContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [themeMessage, setThemeMessage] = useState("");
  const [languageMessage, setLanguageMessage] = useState("");

  const { choosenLanguage, reloadLanguageHandler } =
    useContext(LanguageContext);
  const language = lang[choosenLanguage].system.edit.settings;

  const {
    handleSettingsShown,
    isNightMode,
    themeReloadHandler,
    setNameReload,
  } = gridCtx;
  const inputNameRef = useRef();
  const inputOpenRef = useRef();
  const inputCloseRef = useRef();
  const languageRef = useRef();
  const themeRef = useRef();

  let nameRef;
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const labelClass = `${classes.label} ${isNightMode && classes.labelNight}`;
  const messageClass = `${classes.message} ${isNightMode && classes.messageNight
    }`;
  const headerClass = `${classes.header} ${isNightMode && classes.headerNight}`;

  const URL = process.env.REACT_APP_FIREBASE_URL;

  const setNameHandler = async () => {
    const user = localStorage.getItem("uid");
    nameRef = inputNameRef.current.value;

    await axios
      .get(
        `${URL}/${user}/config.json`
      )
      .then((response) =>
        axios.put(
          `${URL}/${user}/config.json`,
          {
            ...response.data,
            name: nameRef,
          }
        )
      );
    setNameReload((prev) => !prev);
  };

  let openHour = 0;
  let closeHour = 0;

  const workHoursHandler = async () => {
    const user = localStorage.getItem("uid");
    openHour = +inputOpenRef.current.value;
    closeHour = +inputCloseRef.current.value;

    if (openHour < 0 || openHour > 24) {
      setErrorMessage(language.errorHours);
      setError(true);
      setMessage(null);
    } else if (closeHour < 0 || closeHour > 24) {
      setErrorMessage(language.errorHouts);
      setError(true);
      setMessage(null);
    } else if (openHour >= closeHour) {
      setErrorMessage(language.errorEqualHours);
      setError(true);
      setMessage(null);
    } else {
      setError(false);

      await axios
        .get(
          `${URL}/${user}/config.json`
        )
        .then((response) =>
          axios.put(
            `${URL}/${user}/config.json`,
            {
              ...response.data,
              openHour,
              closeHour,
            }
          )
        );

      setMessage(language.setHoursInfo);
    }
  };

  const languageHandler = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("uid");
    const selectedLanguage = languageRef.current.value;

    await axios
      .get(
        `${URL}/${user}/config.json`
      )
      .then((response) =>
        axios.put(
          `${URL}/${user}/config.json`,
          {
            ...response.data,
            choosenLanguage: selectedLanguage,
          }
        )
      )
      .then(setLanguageMessage(language.refreshPage));

    reloadLanguageHandler((prev) => !prev);
  };

  const themeHandler = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("uid");
    const selectedTheme = themeRef.current.value;

    await axios
      .get(
        `${URL}/${user}/config.json`
      )
      .then((response) =>
        axios.put(
          `${URL}/${user}/config.json`,
          {
            ...response.data,
            theme: selectedTheme,
          }
        )
      )
      .then(setThemeMessage(language.refreshPage));

    themeReloadHandler((prev) => !prev);
  };

  return (
    <Modal>
      <div className={classes.settings}>
        <div className={headerClass}>
          <Button
            class={classes.button}
            onClick={() => {
              handleSettingsShown(false);
              setErrorMessage("");
              setError(false);
              setMessage("");
            }}
          >
            {language.back}
          </Button>
        </div>
        <p className={paragraphClass}>{language.name}</p>
        <div className={classes.flex}>
          <input
            type="text"
            ref={inputNameRef}
            placeholder="Podaj nowa nazwę"
          ></input>
          <Button onClick={setNameHandler}>{language.save}</Button>
        </div>
        <p className={paragraphClass}>{language.hours}</p>

        <div className={classes.flex}>
          <div className={classes.time}>
            <label className={labelClass}>{language.from}: </label>
            <input type="number" step="1" min="0" max="24" ref={inputOpenRef} />
          </div>

          <div className={classes.time}>
            <label className={labelClass}>{language.to}: </label>
            <input
              type="number"
              step="1"
              min="0"
              max="24"
              ref={inputCloseRef}
            />
          </div>
          <Button onClick={workHoursHandler}>{language.save}</Button>
        </div>
        <div className={classes.flex}>
          {error && <p className={classes.error}>{errorMessage}</p>}
          {message && <p className={messageClass}>{message}</p>}
        </div>
        <div className={classes.language}>
          <p className={paragraphClass}> {language.lang} </p>
          <form onSubmit={languageHandler}>
            {choosenLanguage === "pl" ? (
              <select ref={languageRef}>
                <option value="pl">{language.pl}</option>
                <option value="en">{language.en}</option>
              </select>
            ) : (
              <select ref={languageRef}>
                <option value="en">{language.en}</option>
                <option value="pl">{language.pl}</option>
              </select>
            )}

            <Button>{language.save}</Button>
          </form>
          {languageMessage && (
            <div className={classes.flex}>
              <p className={messageClass}>{languageMessage}</p>
            </div>
          )}
        </div>
        <div className={classes.theme}>
          <p className={paragraphClass}> {language.theme} </p>
          <form onSubmit={themeHandler}>
            <select ref={themeRef}>
              <option value="day">{language.day}</option>
              <option value="night">{language.night}</option>
            </select>
            <Button>{language.save}</Button>
          </form>
          {themeMessage && (
            <div className={classes.flex}>
              <p className={messageClass}>{themeMessage}</p>
            </div>
          )}
        </div>
        <div>
          <p className={paragraphClass}> {language.changePass} </p>
          <form className={classes.changePasswordForm}>
            <label className={labelClass}>{language.currentPass}</label>
            <input type="password" required />
            <label className={labelClass}> {language.newPass}</label>
            <input type="password" required />
            <label className={labelClass}>{language.repeatNewPass}</label>
            <input type="password" required />
            <Button>{language.save}</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
