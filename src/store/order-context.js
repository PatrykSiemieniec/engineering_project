// napisac ordercontext zeby zapisywal wartosci do niego co potem pozwoli je uzyc w poszczegolnych sekcjach
import React, { useReducer, createContext } from "react";

export const OrderContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultOrderState = {
  items: [],
  totalAmount: 0,
};

const orderReducer = (state, action) => {
  if (action.type === "ADD") {
    let price = 0;
    if (action.item.size === "small") {
      price = action.item.priceS;
    } else if (action.item.size === "medium") {
      price = action.item.priceM;
    } else {
      price = action.item.priceL;
    }

    const updatedTotalAmount = state.totalAmount + price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id && item.size === action.item.size
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let price = 0;
    if (existingItem.size === "small") {
      price = existingItem.priceS;
    } else if (existingItem.size === "medium") {
      price = existingItem.priceM;
    } else if (existingItem.size === "large"){
      price = existingItem.priceL;
    }

    const updatedTotalAmount = state.totalAmount - price;
    
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultOrderState;
};

export const OrderContextProvider = ({ children }) => {
  const [orderState, dispatchOrderAction] = useReducer(
    orderReducer,
    defaultOrderState
  );

  const addItemToOrderHandler = (item) => {
    dispatchOrderAction({ type: "ADD", item: item });
  };
  const removeItemFromOrderHandler = (id) => {
    dispatchOrderAction({ type: "REMOVE", id: id });
  };
  const contextValue = {
    items: orderState.items,
    totalAmount: orderState.totalAmount,
    addItem: addItemToOrderHandler,
    removeItem: removeItemFromOrderHandler,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};
