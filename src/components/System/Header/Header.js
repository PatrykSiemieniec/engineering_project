import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import Button from "../../../UI/Button";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from "./../../../translation/lang.json";
import axios from "axios";
const Header = (props) => {
  const onOpenPanel = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  const [response, setResponse] = useState("");

  const { isNightMode, nameReload } = useContext(GridContext);
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.header;

  const URL = process.env.REACT_APP_FIREBASE_URL;

  useEffect(() => {
    const fetchConfig = async () => {
      const user = localStorage.getItem("uid");
      axios
        .get(
          `${URL}/${user}/config.json`
        )
        .then((response) => {
          setResponse(response);
        });
    };

    fetchConfig();
  }, [nameReload]);

  const headerStyles = `${classes.header} ${isNightMode && classes.headerNight
    }`;
  const nameStyles = `${classes.name} ${isNightMode && classes.nameNight}`;
  return (
    <div className={headerStyles}>
      <div>
        <Button class={classes.menuButton} onClick={onOpenPanel}>
          {language.panel}
        </Button>
        <Button class={classes.menuButton} onClick={onOpenMenu}>
          {language.add}
        </Button>
        <div className={nameStyles}>{response?.data?.name}</div>
      </div>
    </div>
  );
};

export default Header;
