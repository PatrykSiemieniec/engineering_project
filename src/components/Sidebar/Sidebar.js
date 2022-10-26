import React, { useContext } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./Sidebar.module.css";
import { TbPaperBag, TbTruckDelivery, TbHome, TbEdit } from "react-icons/tb";
import { VscChromeClose } from "react-icons/vsc";
import Button from "../../UI/Button";
const Sidebar = (props) => {
  const gridCtx = useContext(GridContext);
  const {
    handleDeliveryClosed,
    handleOnSpotClosed,
    handleTakeawayClosed,
    handleEditPanelShown,
  } = gridCtx;

  const sidebarItem = (
    <div className={classes.list}>
      <p>Zamówienia</p>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleDeliveryClosed(false);
        }}
      >
        <TbTruckDelivery style={{ color: "white", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Na dowóz</div>
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleOnSpotClosed(false);
        }}
      >
        <TbHome style={{ color: "white", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Na miejscu</div>
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleTakeawayClosed(false);
        }}
      >
        <TbPaperBag style={{ color: "white", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Na odbiór</div>
      </button>
      <p>Panel </p>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleEditPanelShown(true);
        }}
      >
        <TbEdit style={{ color: "white", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Edytuj</div>
      </button>

      <br />
    </div>
  );

  return (
    <>
      <div className={classes.sidebar}>
        <Button class={classes.closeButton} onClick={props.onClose}>
          <VscChromeClose style={{ color: "white", fontSize: "15px", fontWeight:"bolder", marginTop:"3px"}} />
        </Button>
        {sidebarItem}
      </div>
    </>
  );
};

export default Sidebar;
