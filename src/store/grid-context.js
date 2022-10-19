import React, { useState, createContext } from "react";

export const GridContext = createContext({
  isDeliveryClosed: null,
  isOnSpotClosed: null,
  isTakeawayClosed: null,
  onClosedDelivery: (contiton) => {},
  onClosedOnSpot: (contiton) => {},
  onClosedTakeaway: (contiton) => {},
});

export const GridContextProvider = ({ children }) => {
  const [isDeliveryClosed, setIsDeliveryClosed] = useState(false);
  const [isOnSpotClosed, setIsOnSpotClosed] = useState(false);
  const [isTakeawayClosed, setIsTakeawayClosed] = useState(false);

  const handleDeliveryClosed = (contition) => {
    setIsDeliveryClosed(contition);
  };
  const handleOnSpotClosed = (contition) => {
    setIsOnSpotClosed(contition);
  };
  const handleTakeawayClosed = (contition) => {
    setIsTakeawayClosed(contition);
  };

  const contextValue = {
    isDeliveryClosed,
    isOnSpotClosed,
    isTakeawayClosed,
    handleDeliveryClosed,
    handleOnSpotClosed,
    handleTakeawayClosed,
  };

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
