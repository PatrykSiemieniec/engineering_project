import React from "react";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
const Header = (props) => {
  const onOpen = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  return (
    <div className={classes.header}>
      <div>
        <Button class={classes.menuButton} onClick={onOpen}>
          Menu
        </Button>
        <Button class={classes.add} 
        onClick={onOpenMenu}
        >Dodaj zamówienie</Button>
      </div>
    </div>
  );
};

export default Header;
