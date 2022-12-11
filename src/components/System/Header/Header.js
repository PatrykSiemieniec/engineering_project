import React, { useContext } from "react";
import classes from "./Header.module.css";
import Button from "../../../UI/Button";
import { GridContext } from "../../../store/grid-context";
const Header = (props) => {
  const onOpen = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;

  const name = window.localStorage.getItem('name');

  const headerStyles = `${classes.header} ${isNightMode && classes.headerNight}`;
  const nameStyles = `${classes.name} ${isNightMode && classes.nameNight}`;
  return (
    <div className={headerStyles}>
      <div>
        <Button class={classes.menuButton} onClick={onOpen}>
          Panel
        </Button>
        <Button class={classes.add} onClick={onOpenMenu}>
          Dodaj zamówienie
        </Button>
        <div className={nameStyles}>{name}</div>
      </div>
    </div>
  );
};

export default Header;
