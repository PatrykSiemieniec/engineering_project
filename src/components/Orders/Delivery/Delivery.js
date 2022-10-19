import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Delivery.module.css";
import DeliveryItems from "./DeliveryItems";

function Delivery() {
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, handleDeliveryClosed } = gridCtx;

  return (
    <>
      {!isDeliveryClosed && (
        <div className={classes.delivery}>
          <button
            className={classes.closeButton}
            onClick={() => handleDeliveryClosed(true)}
          >
            X
          </button>
          <Container class={classes.container}>
            <DeliveryItems />
          </Container>
        </div>
      )}
    </>
  );
}

export default Delivery;
