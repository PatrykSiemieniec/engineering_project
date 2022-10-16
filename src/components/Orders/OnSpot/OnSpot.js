import React from "react";
import Container from "../../../UI/Container";
import classes from "./OnSpot.module.css";
import OnSpotItems from "./OnSpotItems";
function OnSpot() {
  return (
    <div className={classes.onspot}>
    <button className={classes.closeButton}>X</button>
      <Container class={classes.container}>
        <OnSpotItems />
      </Container>
    </div>
  );
}

export default OnSpot;
