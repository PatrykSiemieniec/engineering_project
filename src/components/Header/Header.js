import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const onOpen = props.onOpen;

  return (
    <div className={classes.header}>
      <button className={classes.sidebarButton} onClick={onOpen}>
        Menu
      </button>
    </div>
  );
};

export default Header;
