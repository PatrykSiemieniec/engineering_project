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
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
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
      (item) => item.id === action.id && item.size === action.size
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
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
  const removeItemFromOrderHandler = (id, size) => {
    dispatchOrderAction({ type: "REMOVE", id: id, size: size });
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
