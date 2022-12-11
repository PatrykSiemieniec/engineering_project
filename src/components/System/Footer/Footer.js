import React, { useContext } from "react";
import classes from "./Footer.module.css";
import Logo from "./Logo.js";
import { GridContext } from "../../../store/grid-context";
function Footer() {
  const gridCtx = useContext(GridContext);
  const { isNightMode } = gridCtx;

  const footerStyles = `${classes.footer} ${isNightMode && classes.footerNight
    }`;
  return (
    <div className={footerStyles}>
      <Logo></Logo>
    </div>
  );
}

export default Footer;
