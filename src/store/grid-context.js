import React, { useState, createContext } from "react";

export const GridContext = createContext({
  isDeliveryClosed: null,
  isOnSpotClosed: null,
  isTakeawayClosed: null,
  isEditPanelShown: false,
  name: "NAZWA",
  isSend: false,
  reload: null,
  onClosedDelivery: (contiton) => { },
  onClosedOnSpot: (contiton) => { },
  onClosedTakeaway: (contiton) => { },
  setIsEditPanelShown: (condition) => { },
  setName: (name) => { },
  setIsSend: (condition) => { },
  setReload: (condition) => { },
});

export const GridContextProvider = ({ children }) => {
  const [isDeliveryClosed, setIsDeliveryClosed] = useState(false);
  const [isOnSpotClosed, setIsOnSpotClosed] = useState(false);
  const [isTakeawayClosed, setIsTakeawayClosed] = useState(false);
  const [isEditPanelShown, setIsEditPanelShown] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [name, setName] = useState("NAZWA");
  const [reload, setReload] = useState(false);

  const handleDeliveryClosed = (contition) => {
    setIsDeliveryClosed(contition);
  };
  const handleOnSpotClosed = (contition) => {
    setIsOnSpotClosed(contition);
  };
  const handleTakeawayClosed = (contition) => {
    setIsTakeawayClosed(contition);
  };
  const handleEditPanelShown = (condition) => {
    setIsEditPanelShown(condition);
  };
  const handleIsSend = (condition) => {
    setIsSend(condition);
  };
  const handleName = (name) => {
    setName(name);
  };
  const handleReload = (condition) => {
    setReload(condition);
  };
  const contextValue = {
    isDeliveryClosed,
    isOnSpotClosed,
    isTakeawayClosed,
    isEditPanelShown,
    isSend,
    name,
    reload,
    handleDeliveryClosed,
    handleOnSpotClosed,
    handleTakeawayClosed,
    handleEditPanelShown,
    handleIsSend,
    handleName,
    handleReload
  };

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
