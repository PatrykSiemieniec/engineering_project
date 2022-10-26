import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Delivery.module.css";
import DeliveryItems from "./DeliveryItems";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
function Delivery() {
  const gridCtx = useContext(GridContext);
  const { isDeliveryClosed, handleDeliveryClosed } = gridCtx;

  return (
    <>
      {!isDeliveryClosed && (
        <div className={classes.delivery}>
          <Button
            class={classes.closeButton}
            onClick={() => handleDeliveryClosed(true)}
          >
            <VscChromeClose
              style={{
                color: "white",
                fontSize: "15px",
                fontWeight: "bolder",
                marginTop: "3px",
              }}
            />
          </Button>
          <Container class={classes.container}>
            <DeliveryItems></DeliveryItems>
          </Container>
        </div>
      )}
    </>
  );
}

export default Delivery;
