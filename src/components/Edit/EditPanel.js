import React, { useContext } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./EditPanel.module.css";
import Button from "../../UI/Button";
const EditPanel = (props) => {
  const gridCtx = useContext(GridContext);
  const { handleEditPanelShown } = gridCtx;
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Button
          class={classes.button}
          onClick={() => {
            handleEditPanelShown(false);
          }}
        >
          Powrót
        </Button>
      </div>
      <div className={classes.panel}></div>
    </div>
  );
};

export default EditPanel;
