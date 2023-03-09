import React, { useContext, useState } from "react";
import { GridContext } from "../../../store/grid-context";
import classes from "./Sidebar.module.css";
import Delete from "./Delete";
import { TbSettings, TbTrash, TbUser } from "react-icons/tb";
import { CgSun, CgMoon, CgLogOut } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import { TfiBackLeft } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";
import { SiInstacart } from "react-icons/si";
import { BsCartPlus } from "react-icons/bs";

import Button from "../../../UI/Button";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import { useHistory } from "react-router-dom";
import SendOwnMenu from "../Edit/SendOwnMenu";
import EditMenu from "../Edit/EditMenu";
const Sidebar = (props) => {
  const authCtx = useContext(AuthContext);
  const { logout } = authCtx;
  const [toDelete, setToDelete] = useState(false);
  const [toSetNewMenu, setToSetNewMenu] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
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
  };

  const reloadHandler = () => {
    handleReload((prev) => !prev);
    setToDelete(false);
  };
  const deleteHandler = () => {
    setToDelete(true);
  };
  const closeDelete = () => {
    setToDelete(false);
  };

  const newMenuHandler = () => {
    setToSetNewMenu(true);
  };
  const closeNewMenu = () => {
    setToSetNewMenu(false);
  };

  const openEditMenuHandler = () => {
    setEditMenu(true);
  }
  const closeEditMenuHandler = () => {
    setEditMenu(false);
  }
  const deleteOrdersHandler = async () => {
    const user = localStorage.getItem("uid");
    const url =
      "https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/";

    if (selectedType === "delivery") {
      await axios.delete(`${url}/${user}/deliveryOrders.json`);
    } else if (selectedType === "onspot") {
      await axios.delete(`${url}/${user}/onspotOrders.json`);
    } else if (selectedType === "takeaway") {
      await axios.delete(`${url}/${user}//takeawayOrders.json`);
    } else if (selectedType === "all") {
      console.log(selectedType);
      await axios.delete(`${url}/${user}/deliveryOrders.json`);
      await axios.delete(`${url}/${user}/onspotOrders.json`);
      await axios.delete(`${url}/${user}//takeawayOrders.json`);
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
        <div>{localStorage.getItem("email")}</div>
        <button className={classes.sidebarItemButton} onClick={logoutHandler}>
          <CgLogOut style={{ color: "black", fontSize: "20px" }} />
          <br />
          <div className={classes.text}>Wyloguj</div>
        </button>
      </div>

      <button className={classes.sidebarItemButton} onClick={backHandler}>
        <TfiBackLeft style={{ color: "black", fontSize: "20px" }} />
        <div className={classes.text}  >Strona główna</div>
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
        <TbSettings style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Ustawienia</div>
      </button>
      <button className={classes.sidebarItemButton} onClick={deleteHandler}>
        <TbTrash style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Usuń zamówienia</div>
      </button>

      <button className={classes.sidebarItemButton} onClick={newMenuHandler}>
        <BsCartPlus style={{ color: "black", fontSize: "20px" }} />
        <br />
        <div className={classes.text}>Dodaj Menu</div>
      </button>

      <button className={classes.sidebarItemButton} onClick={openEditMenuHandler}>
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
        {toSetNewMenu && <SendOwnMenu onClose={closeNewMenu} />}
        {editMenu && <EditMenu onClose={closeEditMenuHandler} />}
      </div>
    </>
  );
};

export default Sidebar;
