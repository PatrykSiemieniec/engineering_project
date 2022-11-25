import React from "react";
import classes from "./Footer.module.css";
import Logo from "./Logo.js";
function Footer() {
  
  return (
    <div className={classes.footer}>
      <Logo></Logo>
    </div>
  );
}

export default Footer;
