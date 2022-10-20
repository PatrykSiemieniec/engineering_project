import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const onOpen = props.onOpen;

  return (
    <div className={classes.header}>
      <div>
        <button className={classes.menuButton} onClick={onOpen}>
          Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
