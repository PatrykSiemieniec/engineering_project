import React, { useContext } from "react";
import classes from "./Header.module.css";
import Button from "../../../UI/Button";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from "./../../../translation/lang.json";
const Header = (props) => {
  const onOpen = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  const { isNightMode } = useContext(GridContext);
  const { choosenLanguage } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.header;

  const name = window.localStorage.getItem("name");

  const headerStyles = `${classes.header} ${isNightMode && classes.headerNight
    }`;
  const nameStyles = `${classes.name} ${isNightMode && classes.nameNight}`;
  return (
    <div className={headerStyles}>
      <div>
        <Button class={classes.menuButton} onClick={onOpen}>
          {language.panel}
        </Button>
        <Button class={classes.menuButton} onClick={onOpenMenu}>
          {language.add}
        </Button>
        <div className={nameStyles}>{name}</div>
      </div>
    </div>
  );
};

export default Header;
