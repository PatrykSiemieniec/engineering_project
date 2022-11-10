import React from "react";
import classes from './TakeawayItems.module.css'
function TakeawayItems(props) {
  const {takeawayItems} = props;
  return <div className={classes.flex}>{takeawayItems}</div>;
}

export default TakeawayItems;
