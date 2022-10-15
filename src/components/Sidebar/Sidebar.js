import React, { useState } from "react";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const sidebarItem = (
    <div className={classes.list}>
      <p>Zamówienia</p>
      <button className={classes.sidebarItemButton}>Na dowóz</button>
      <button className={classes.sidebarItemButton}>Na miejscu</button>
      <button className={classes.sidebarItemButton}>Na odbiór</button>
      <p>Panel </p>
      <button className={classes.sidebarItemButton}>Edytuj</button>
      <br />
    </div>
  );

  return (
    <>
      <div className={classes.sidebar}>
        <button className={classes.closeButton} onClick={props.onClose}>
          X
        </button>
        {sidebarItem}
      </div>
    </>
  );
};

export default Sidebar;
