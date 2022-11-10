import React, { useState, createContext } from "react";

export const GridContext = createContext({
  isDeliveryClosed: null,
  isOnSpotClosed: null,
  isTakeawayClosed: null,
  isEditPanelShown: false,
  selectedFile: null,
  isFilePicked: false,
  isSend: false,
  onClosedDelivery: (contiton) => {},
  onClosedOnSpot: (contiton) => {},
  onClosedTakeaway: (contiton) => {},
  setIsEditPanelShown: (condition) => {},
  setSelectedFile: () => {},
  setIsFilePicked: (condition) => {},
  setIsSend: (condition) => {},
});

export const GridContextProvider = ({ children }) => {
  const [isDeliveryClosed, setIsDeliveryClosed] = useState(false);
  const [isOnSpotClosed, setIsOnSpotClosed] = useState(false);
  const [isTakeawayClosed, setIsTakeawayClosed] = useState(false);
  const [isEditPanelShown, setIsEditPanelShown] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSend, setIsSend] = useState(false);

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
  const contextValue = {
    isDeliveryClosed,
    isOnSpotClosed,
    isTakeawayClosed,
    isEditPanelShown,
    selectedFile,
    isFilePicked,
    isSend,
    handleDeliveryClosed,
    handleOnSpotClosed,
    handleTakeawayClosed,
    handleEditPanelShown,
    setSelectedFile,
    setIsFilePicked,
    handleIsSend
  };

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
