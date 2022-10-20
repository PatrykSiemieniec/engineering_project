import React, { useContext } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./Sidebar.module.css";
import { TbPaperBag, TbTruckDelivery, TbHome, TbEdit } from "react-icons/tb";

const Sidebar = (props) => {
  const gridCtx = useContext(GridContext);
  const { handleDeliveryClosed, handleOnSpotClosed, handleTakeawayClosed } =
    gridCtx;

  const sidebarItem = (
    <div className={classes.list}>
      <p>Zamówienia</p>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleDeliveryClosed(false);
        }}
      >
        <TbTruckDelivery
          style={{ color: "white", fontSize: "20px" }}
        />
        <br />
        <text className={classes.text}>Na dowóz</text>
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleOnSpotClosed(false);
        }}
      >
        <TbHome style={{ color: "white", fontSize: "20px" }} />
        <br />
        <text className={classes.text}>Na miejscu</text>
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleTakeawayClosed(false);
        }}
      >
        <TbPaperBag style={{ color: "white", fontSize: "20px" }} />
        <br />
        <text className={classes.text}>Na odbiór</text>
      </button>
      <p>Panel </p>
      <button className={classes.sidebarItemButton}>
        <TbEdit style={{ color: "white", fontSize: "20px" }} />
        <br />
        <text className={classes.text}>Edytuj</text>
      </button>

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
