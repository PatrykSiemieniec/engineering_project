import React, { useContext } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const gridCtx = useContext(GridContext)
  const {handleDeliveryClosed, handleOnSpotClosed, handleTakeawayClosed } = gridCtx;

  const sidebarItem = (
    <div className={classes.list}>
      <p>Zamówienia</p>
      <button className={classes.sidebarItemButton} onClick={()=>{handleDeliveryClosed(false)}}>Na dowóz</button>
      <button className={classes.sidebarItemButton} onClick={()=>{handleOnSpotClosed(false)}}>Na miejscu</button>
      <button className={classes.sidebarItemButton} onClick={()=>{handleTakeawayClosed(false)}}>Na odbiór</button>
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
