import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
function Takeaway() {
  const gridCtx = useContext(GridContext);
  const { isTakeawayClosed, handleTakeawayClosed } = gridCtx;
  return (
    <>
      {!isTakeawayClosed && (
        <div className={classes.takeaway}>
          <button
            className={classes.closeButton}
            onClick={() => {
              handleTakeawayClosed(true);
            }}
          >
            X
          </button>
          <Container class={classes.container}>
            <TakeawayItems />
          </Container>
        </div>
      )}
    </>
  );
}

export default Takeaway;
