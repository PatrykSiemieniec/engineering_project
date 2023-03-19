import React, { useContext } from "react";
import classes from "./Button.module.css";
import { GridContext } from "../store/grid-context";
const Button = (props) => {
  const { isNightMode } = useContext(GridContext);
  const styles = `${classes.button} ${props.class}`;
  const buttonStyles = `${styles} ${isNightMode && classes.buttonNight}`;
  return (
    <button
      className={buttonStyles}
      onClick={props.onClick}
      style={{ display: props.display }}
    >
      {props.children}
    </button>
  );
};

export default Button;
