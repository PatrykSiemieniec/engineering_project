import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./OnSpot.module.css";
import OnSpotItems from "./OnSpotItems";

function OnSpot(props) {
  const gridCtx = useContext(GridContext);
  const { isOnSpotClosed, handleOnSpotClosed } = gridCtx;
  return (
    <>
      {!isOnSpotClosed && (
        <div className={classes.onspot}>
          <button
            className={classes.closeButton}
            onClick={() => {
              handleOnSpotClosed(true);
            }}
          >
            X
          </button>
          <Container class={classes.container}>
            <OnSpotItems />
          </Container>
        </div>
      )}
    </>
  );
}
export default OnSpot;
