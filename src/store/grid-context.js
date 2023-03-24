import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const GridContext = createContext({
  isEditPanelShown: false,
  isSend: false,
  reload: null,
  isNightMode: null,
  selectedType: null,
  themeReload: false,
  isSystemOpen: false,
  nameReload: false,
  setIsEditPanelShown: (condition) => { },
  setIsSend: (condition) => { },
  setReload: (condition) => { },
  setIsNightMode: (condition) => { },
  setSelectedType: (type) => { },
  setThemeReload: (condition) => { },
  setIsSystemOpen: (condition) => { },
  setNameReload: (condition) => { }
});

export const GridContextProvider = ({ children }) => {

  const URL = process.env.REACT_APP_FIREBASE_URL;

  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [reload, setReload] = useState(false);
  const [themeReload, setThemeReload] = useState(false);
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [nameReload, setNameReload] = useState(false)

  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleSettingsShown = (condition) => {
    setIsSettingsShown(condition);
  };
  const handleIsSend = (condition) => {
    setIsSend((condition) => !condition);
  };
  const handleReload = (condition) => {
    setReload(condition);
  };
  const handleNightMode = (condition) => {
    setIsNightMode(condition);
  };
  const handleSelectedType = (type) => {
    setSelectedType(type);
  };
  const themeReloadHandler = (condition) => {
    setThemeReload(condition);
  };
  const contextValue = {
    isSettingsShown,
    isSend,
    reload,
    isNightMode,
    selectedType,
    themeReload,
    isSystemOpen,
    nameReload,
    handleSettingsShown,
    handleIsSend,
    handleReload,
    handleNightMode,
    handleSelectedType,
    themeReloadHandler,
    setIsSystemOpen,
    setNameReload
  };

  const user = localStorage.getItem("uid");
  useEffect(() => {
    const fetchConfig = async () => {

      const response = await axios.get(
        `${URL}/${user}/config.json`
      );

      if (response?.data?.theme === "day") {
        setIsNightMode(false)
      } else {
        setIsNightMode(true)
      }

    };
    fetchConfig();
  }, [user, themeReload, isSystemOpen]);

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
