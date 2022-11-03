import React from "react";
import classes from "./DeliveryItems.module.css";

const DeliveryItems = (props) => {
  const { deliveryItems } = props;

  return <div className={classes.flex}>{deliveryItems}</div>;
};
export default DeliveryItems;
