import React from "react";
import Container from "../../../UI/Container";
import classes from "./Takeaway.module.css";
import TakeawayItems from "./TakeawayItems";
function Takeaway() {
  return (
    <div className={classes.takeaway}>
      <button className={classes.closeButton}>X</button>
      <Container class={classes.container}>
        <TakeawayItems />
      </Container>
    </div>
  );
}

export default Takeaway;
