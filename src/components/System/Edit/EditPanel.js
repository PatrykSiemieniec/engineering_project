import React, { useContext, useRef } from "react";
import { GridContext } from "../../../store/grid-context";
import classes from "./EditPanel.module.css";
import Button from "../../../UI/Button";
import Modal from "../../../UI/Modal";
const EditPanel = () => {
  const gridCtx = useContext(GridContext);
  const { handleEditPanelShown, handleName, isNightMode } = gridCtx;
  const inputRef = useRef();
  let nameRef;
  const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
  const setNameHandler = () => {
    nameRef = inputRef.current.value;
    handleName(nameRef);
  };
  const deleteNameHandler = () => {
    handleName("");
  };

  return (
    <Modal>
      <div className={classes.edit}>
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
        <p className={paragraphClass}>Nazwa</p>
        <div className={classes.flex}>
          <input type='text' ref={inputRef} placeholder="Podaj nowa nazwę"></input>
          <Button onClick={setNameHandler}>Dodaj</Button>
          <Button onClick={deleteNameHandler}>Usuń</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPanel;
