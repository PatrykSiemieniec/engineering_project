import React, { useContext, useState } from "react";
import { GridContext } from "../../../store/grid-context";
import classes from "./Sidebar.module.css";
import Delete from "./Delete";
import { TbEdit, TbTrash, TbUser } from "react-icons/tb";
import { CgSun, CgMoon, CgLogOut } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import { TfiBackLeft } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "../../../UI/Button";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import { useHistory } from "react-router-dom";
import SendOwnMenu from "../Edit/SendOwnMenu";
const Sidebar = (props) => {
  const authCtx = useContext(AuthContext);
  const { logout } = authCtx;
  const [toDelete, setToDelete] = useState(false);
  const [toSetNewMenu, setToSetNewMenu] = useState(false);
  const gridCtx = useContext(GridContext);
  const {
    handleEditPanelShown,
    handleReload,
    handleNightMode,
    isNightMode,
    selectedType,
  } = gridCtx;

  const history = useHistory();
  const logoutHandler = () => {
    logout();
    history.replace("/");
  };
  const backHandler = () => {
    history.replace("/");
  }

  const reloadHandler = () => {
    handleReload((prev) => !prev);
    setToDelete(false);
  };
  const deleteHandler = () => {
    setToDelete(true);
  };
  const newMenuHandler = () => {
    setToSetNewMenu(true);
  }
  const closeDelete = () => {
    setToDelete(false);
  };
  const closeNewMenu = () => {
    setToSetNewMenu(false);
  }
  const deleteOrdersHandler = async () => {
    if (selectedType === "delivery") {
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/deliveryOrders.json"
      );
    } else if (selectedType === "onspot") {
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/onspotOrders.json"
      );
    } else if (selectedType === "takeaway") {
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/takeawayOrders.json"
      );
    } else if (selectedType === "all") {
      console.log(selectedType);
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/deliveryOrders.json"
      );
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/onspotOrders.json"
      );
      await axios.delete(
        "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/takeawayOrders.json"
      );
    }
    reloadHandler();
  };

  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const userClass = `${classes.user} ${isNightMode && classes.userNight}`;
  const sidebarItem = (
    <div className={classes.list}>
      <p className={paragraphClass}>Panel </p>
      <div className={userClass}>
        {!isNightMode ? (
          <TbUser style={{ color: "black", fontSize: "25px" }} />
        ) : (
          <TbUser style={{ color: "white", fontSize: "25px" }} />
        )}
        {localStorage.getItem('email')}
        <button className={classes.sidebarItemButton} onClick={logoutHandler}>
          <CgLogOut style={{ color: "black", fontSize: "20px" }} />
          <br />
          <div className={classes.text}>Wyloguj</div>
        </button>
      </div>

      <button
        className={classes.sidebarItemButton}
        onClick={backHandler}
      >
        <TfiBackLeft style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Strona główna</div>
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleNightMode((prev) => !prev);
        }}
      >
        {isNightMode ? (
          <>
            <CgSun style={{ color: "black", fontSize: "20px" }} />
            <br />
            <div className={classes.text}>Tryb dzienny</div>
          </>
        ) : (
          <>
            <CgMoon style={{ color: "black", fontSize: "20px" }} />
            <br />
            <div className={classes.text}>Tryb nocny</div>
          </>
        )}
      </button>
      <button
        className={classes.sidebarItemButton}
        onClick={() => {
          handleEditPanelShown(true);
        }}
      >
        <TbEdit style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Edytuj Nazwę</div>
      </button>
      <button className={classes.sidebarItemButton} onClick={deleteHandler}>
        <TbTrash style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Usuń zamówienia</div>
      </button>

      <button className={classes.sidebarItemButton} onClick={newMenuHandler}>
        <AiOutlineEdit style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Edytuj Menu</div>
      </button>
      <br />
    </div>
  );

  return (
    <>
      <div className={!isNightMode ? classes.sidebar : classes.sidebarNight}>
        <Button class={classes.closeButton} onClick={props.onClose}>
          <VscChromeClose
            style={{
              color: "black",
              fontSize: "15px",
              fontWeight: "bolder",
              marginTop: "3px",
            }}
          />
        </Button>
        {sidebarItem}
        {toDelete && (
          <Delete delete={deleteOrdersHandler} noDelete={closeDelete} />
        )}
        {toSetNewMenu && (
          <SendOwnMenu onClose={closeNewMenu} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
