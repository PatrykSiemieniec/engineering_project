import React, { useState, createContext } from "react";

export const GridContext = createContext({
  isDeliveryClosed: null,
  isOnSpotClosed: null,
  isTakeawayClosed: null,
  isEditPanelShown: false,
  onClosedDelivery: (contiton) => {},
  onClosedOnSpot: (contiton) => {},
  onClosedTakeaway: (contiton) => {},
  setIsEditPanelShown: (condition) => {}
});

export const GridContextProvider = ({ children }) => {
  const [isDeliveryClosed, setIsDeliveryClosed] = useState(false);
  const [isOnSpotClosed, setIsOnSpotClosed] = useState(false);
  const [isTakeawayClosed, setIsTakeawayClosed] = useState(false);
  const [isEditPanelShown, setIsEditPanelShown] = useState(false);

  const handleDeliveryClosed = (contition) => {
    setIsDeliveryClosed(contition);
  };
  const handleOnSpotClosed = (contition) => {
    setIsOnSpotClosed(contition);
  };
  const handleTakeawayClosed = (contition) => {
    setIsTakeawayClosed(contition);
  };
  const handleEditPanelShown =(condition)=>{
    setIsEditPanelShown(condition);
  };

  const contextValue = {
    isDeliveryClosed,
    isOnSpotClosed,
    isTakeawayClosed,
    isEditPanelShown,
    handleDeliveryClosed,
    handleOnSpotClosed,
    handleTakeawayClosed,
    handleEditPanelShown
  };

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
