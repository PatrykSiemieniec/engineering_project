import React, { useState } from "react";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const [isShown, setIsShown] = useState(false);

  const sidebarOpen = () => {
    setIsShown(true);
  };
  const sidebarClose = () => {
    setIsShown(false);
  };

  const sidebarItem = (
    <div className={classes.list}>
      <p>Zamówienia</p>
      <button className={classes.sidebarItemButton}>Na dowóz</button>
      <button className={classes.sidebarItemButton}>Na miejscu</button>
      <button className={classes.sidebarItemButton}>Na odbiór</button>
      <p>Panel </p>
      <button className={classes.sidebarItemButton}>Edytuj</button><br/>
    </div>

  );

  return (
    <>
      <button className={classes.sidebarButton} onClick={sidebarOpen}>
        Menu
      </button>
      {isShown && (
        <div className={classes.sidebar}>
          <button className={classes.closeButton} onClick={sidebarClose}>
            X
          </button>
          {sidebarItem}
        </div>
      )}
    </>
  );
};

export default Sidebar;
