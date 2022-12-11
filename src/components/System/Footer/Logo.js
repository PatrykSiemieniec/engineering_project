import React, { useContext } from "react";
import classes from "./Logo.module.css";
import { GridContext } from "../../../store/grid-context";

const logo = require("../../../assets/logo.png");
const logoBlack = require("../../../assets/logoBlack.png");

const Logo = () => {
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;

  return (
    <div className={classes.logo}>
      <img src={!isNightMode ? logoBlack : logo} className={classes.png} alt="logo" />
    </div>
  );
};

export default Logo;
