import React from "react";
import Container from "../../../UI/Container";
import classes from "./Delivery.module.css";
import DeliveryItems from "./DeliveryItems";

function Delivery() {
  return (
    <div className={classes.delivery}>
    <button className={classes.closeButton}>X</button>
      <Container class={classes.container}>
        <DeliveryItems />
      </Container>
    </div>
  );
}

export default Delivery;
