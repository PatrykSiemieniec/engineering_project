import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  
  return (
    <div className={classes.header}>
      <button className={classes.sidebarButton} onClick={props.onOpen}>
        Menu
      </button>
    </div>
  );
};

export default Header;
