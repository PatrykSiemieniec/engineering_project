import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./OnSpot.module.css";
import OnSpotItems from "./OnSpotItems";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
function OnSpot() {
  const gridCtx = useContext(GridContext);
  const { isOnSpotClosed, handleOnSpotClosed } = gridCtx;


  return (
    <>
      {!isOnSpotClosed && (
        <div className={classes.onspot}>
          <Button
            class={classes.closeButton}
            onClick={() => {
              handleOnSpotClosed(true);
            }}
          >
            <VscChromeClose style={{ color: "white", fontSize: "15px", fontWeight:"bolder", marginTop:"3px"}} />
          </Button>
          <Container class={classes.container}>
            <OnSpotItems />
          </Container>
        </div>
      )}
    </>
  );
}
export default OnSpot;
