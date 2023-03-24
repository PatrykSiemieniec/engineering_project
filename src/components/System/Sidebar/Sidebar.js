import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Sidebar.module.css";
import axios from "axios";
import { GridContext } from "../../../store/grid-context";
import AuthContext from "../../../store/auth-context";
import { LanguageContext } from "../../../store/language-context";

import { TbSettings, TbTrash, TbUser } from "react-icons/tb";
import { CgLogOut } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import { TfiBackLeft } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

import SendOwnMenu from "../Edit/SendOwnMenu";
import EditMenu from "../Edit/EditMenu";
import Delete from "./Delete";

import lang from "../../../translation/lang.json";

const Sidebar = (props) => {
  const [toDelete, setToDelete] = useState(false);
  const [toSetNewMenu, setToSetNewMenu] = useState(false);
  const [editMenu, setEditMenu] = useState(false);

  const { logout } = useContext(AuthContext);

  const {
    handleSettingsShown,
    handleReload,
    isNightMode,
    selectedType,
  } = useContext(GridContext);

  const { choosenLanguage, reloadLanguageHandler } = useContext(LanguageContext);
  const language = lang[choosenLanguage].system.sidebar;

  const { setIsSystemOpen } = useContext(GridContext)

  const history = useHistory();

  const logoutHandler = () => {
    logout();
    setIsSystemOpen((prev) => !prev)
    reloadLanguageHandler((prev) => !prev)
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
  };
  const closeEditMenuHandler = () => {
    setEditMenu(false);
  };
  const deleteOrdersHandler = async () => {
    const user = localStorage.getItem("uid");
    const URL = process.env.REACT_APP_FIREBASE_URL;

    if (selectedType === "delivery") {
      await axios.delete(`${URL}/${user}/deliveryOrders.json`);
    } else if (selectedType === "onspot") {
      await axios.delete(`${URL}/${user}/onspotOrders.json`);
    } else if (selectedType === "takeaway") {
      await axios.delete(`${URL}/${user}//takeawayOrders.json`);
    } else if (selectedType === "all") {
      console.log(selectedType);
      await axios.delete(`${URL}/${user}/deliveryOrders.json`);
      await axios.delete(`${URL}/${user}/onspotOrders.json`);
      await axios.delete(`${URL}/${user}//takeawayOrders.json`);
    }
    reloadHandler();
  };

  const email = localStorage.getItem("email");
  const splitEmail = email.split("@");

  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const userClass = `${classes.user} ${isNightMode && classes.userNight}`;
  const sidebarButtonClass = `${classes.sidebarItemButton} ${isNightMode && classes.sidebarItemButtonNight
    }`;
  const sidebarItem = (
    <div className={classes.list}>
      <button onClick={props.onClose} className={sidebarButtonClass}>

        {!isNightMode ? (
          <VscChromeClose style={{ color: "black", fontSize: "15px" }} />
        ) : (
          <VscChromeClose style={{ color: "white", fontSize: "15px" }} />
        )}
      </button>
      <p className={paragraphClass}>{language.panel} </p>
      <div className={userClass}>
        <div className={classes.email}>
          {!isNightMode ? (
            <TbUser style={{ color: "black", fontSize: "25px" }} />
          ) : (
            <TbUser style={{ color: "white", fontSize: "25px" }} />
          )}

          <div>{splitEmail[0]}</div>
          <div>{"@" + splitEmail[1]}</div>
        </div>
        <button className={sidebarButtonClass} onClick={logoutHandler}>
          {!isNightMode ? (
            <CgLogOut style={{ color: "black", fontSize: "20px" }} />
          ) : (
            <CgLogOut style={{ color: "white", fontSize: "20px" }} />
          )}
          <br />
          <div className={classes.text}>{language.logout}</div>
        </button>
      </div>

      <button className={sidebarButtonClass} onClick={backHandler}>
        {!isNightMode ? (
          <TfiBackLeft style={{ color: "black", fontSize: "20px" }} />
        ) : (
          <TfiBackLeft style={{ color: "white", fontSize: "20px" }} />
        )}
        <div className={classes.text}>{language.mainPage}</div>
      </button>


      <button
        className={sidebarButtonClass}
        onClick={() => {
          handleSettingsShown(true);
        }}
      >
        {!isNightMode ? (
          <TbSettings style={{ color: "black", fontSize: "20px" }} />
        ) : (
          <TbSettings style={{ color: "white", fontSize: "20px" }} />
        )}
        <br />
        <div className={classes.text}>{language.settings}</div>
      </button>
      <button className={sidebarButtonClass} onClick={deleteHandler}>
        {!isNightMode ? (
          <TbTrash style={{ color: "black", fontSize: "20px" }} />
        ) : (
          <TbTrash style={{ color: "white", fontSize: "20px" }} />
        )}
        <br />
        <div className={classes.text}>{language.delete}</div>
      </button>

      <button className={sidebarButtonClass} onClick={newMenuHandler}>
        {!isNightMode ? (
          <BsCartPlus style={{ color: "black", fontSize: "20px" }} />
        ) : (
          <BsCartPlus style={{ color: "white", fontSize: "20px" }} />
        )}
        <br />
        <div className={classes.text}>{language.add}</div>
      </button>

      <button className={sidebarButtonClass} onClick={openEditMenuHandler}>
        {!isNightMode ? (
          <AiOutlineEdit style={{ color: "black", fontSize: "20px" }} />
        ) : (
          <AiOutlineEdit style={{ color: "white", fontSize: "20px" }} />
        )}
        <br />
        <div className={classes.text}>{language.edit}</div>
      </button>
      <br />
    </div>
  );

  return (
    <>
      <div className={!isNightMode ? classes.sidebar : classes.sidebarNight}>
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
