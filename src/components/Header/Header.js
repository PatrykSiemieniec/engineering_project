import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const onOpen = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  return (
    <div className={classes.header}>
      <div>
        <button className={classes.menuButton} onClick={onOpen}>
          Menu
        </button>
        <button className={classes.add} 
        onClick={onOpenMenu}
        >Dodaj zamówienie</button>
      </div>
    </div>
  );
};

export default Header;
