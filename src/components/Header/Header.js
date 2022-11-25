import React, {useContext} from "react";
import classes from "./Header.module.css";
import Button from "../../UI/Button";
import { GridContext } from "../../store/grid-context";
const Header = (props) => {
  const onOpen = props.onOpen;
  const onOpenMenu = props.onOpenMenu;

  const gridCtx = useContext(GridContext);
  const {name} = gridCtx;

  return (
    <div className={classes.header}>
      <div>
        <Button class={classes.menuButton} onClick={onOpen}>
          Menu
        </Button>
        <Button class={classes.add} onClick={onOpenMenu}>
          Dodaj zamówienie
        </Button>
        <div className={classes.name}>{name}</div>
      </div>
    </div>
  );
};

export default Header;
