import React, { useContext, useRef } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./EditPanel.module.css";
import Button from "../../UI/Button";
const EditPanel = () => {
  const gridCtx = useContext(GridContext);
  const { handleEditPanelShown, handleName } = gridCtx;

  const inputRef = useRef();
  let nameRef;

  const setNameHandler = () => {
    nameRef = inputRef.current.value;
    handleName(nameRef);
  };
  const deleteNameHandler = () => {
    handleName("");
  };

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
      <div className={classes.panel}>
        <div className={classes.panelItems}>
          <p>Nazwa</p>
          <div className={classes.flex}>
            <input ref={inputRef}></input>
            <Button onClick={setNameHandler}>Dodaj</Button>
            <Button onClick={deleteNameHandler}>Usuń</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
