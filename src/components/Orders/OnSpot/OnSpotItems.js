import React from "react";
import classes from './OnSpotItems.module.css'
function OnSpotItems(props) {
  const {onspotItems} = props;
  return (
    <div className={classes.flex}>{onspotItems}</div>
  );
}

export default OnSpotItems;
