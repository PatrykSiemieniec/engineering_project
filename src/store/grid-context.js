import React, { useState, createContext } from "react";

export const GridContext = createContext({
  isEditPanelShown: false,
  name: "NAZWA",
  isSend: false,
  reload: null,
  isNightMode: null,
  selectedType: null,
  setIsEditPanelShown: (condition) => { },
  setName: (name) => { },
  setIsSend: (condition) => { },
  setReload: (condition) => { },
  setIsNightMode: (condition) => { },
  setSelectedType: (type) => { }
});

export const GridContextProvider = ({ children }) => {
  const [isEditPanelShown, setIsEditPanelShown] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [name, setName] = useState("NAZWA");
  const [reload, setReload] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedType, setSelectedType] = useState('')

  const handleEditPanelShown = (condition) => {
    setIsEditPanelShown(condition);
  };
  const handleIsSend = (condition) => {
    setIsSend(condition => !condition);
  };
  const handleName = (name) => {
    setName(name);
    window.localStorage.setItem('name', name);
  };
  const handleReload = (condition) => {
    setReload(condition);
  };
  const handleNightMode = (condition) => {
    setIsNightMode(condition);
  };
  const handleSelectedType = (type) => {
    setSelectedType(type);
  }
  const contextValue = {
    isEditPanelShown,
    isSend,
    name,
    reload,
    isNightMode,
    selectedType,
    handleEditPanelShown,
    handleIsSend,
    handleName,
    handleReload,
    handleNightMode,
    handleSelectedType,
  };

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
