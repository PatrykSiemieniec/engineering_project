import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import Container from "../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
import Button from "../../../UI/Button";
import { VscChromeClose } from "react-icons/vsc";
function Takeaway() {
  const gridCtx = useContext(GridContext);
  const { isTakeawayClosed, handleTakeawayClosed } = gridCtx;
  return (
    <>
      {!isTakeawayClosed && (
        <div className={classes.takeaway}>
          <Button
            class={classes.closeButton}
            onClick={() => {
              handleTakeawayClosed(true);
            }}
          >
            <VscChromeClose style={{ color: "white", fontSize: "15px", fontWeight:"bolder", marginTop:"3px"}} />
          </Button>
          <Container class={classes.container}>
            <TakeawayItems />
          </Container>
        </div>
      )}
    </>
  );
}

export default Takeaway;
