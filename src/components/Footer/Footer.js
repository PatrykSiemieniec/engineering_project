import React from "react";
import classes from "./Footer.module.css";
import Logo from "./Logo.js";
import Countdown from "react-countdown";
function Footer() {
  
  return (
    <div className={classes.footer}>
      <Logo></Logo>
    </div>
  );
}

export default Footer;
