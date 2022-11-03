import React, { useContext, useRef } from "react";
import { GridContext } from "../../store/grid-context";
import classes from "./EditPanel.module.css";
import Button from "../../UI/Button";
const EditPanel = (props) => {
  const gridCtx = useContext(GridContext);
  const { handleEditPanelShown, setSelectedFile, setIsFilePicked} = gridCtx;


  const changeHandler =(event) =>{
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }
  const handleSubmission =() =>{}
  /*
  const setDane=()=>{
    window.localStorage.setItem('name', 'dane2')
  }
  let dane = window.localStorage.getItem('name');*/
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
          <p>Logo</p>
          <div className={classes.flex}>
            <input type="file" accept="image/*" onChange={changeHandler}></input>
            <Button onClick={handleSubmission}>Dodaj</Button>
            <Button>Usuń</Button>
            <Button>Zapisz</Button>
          </div>
          <p>Nazwa</p>
          <div className={classes.flex}>
            <input></input>
            <Button>Dodaj</Button>
            <Button>Usuń</Button>
            <Button>Zapisz</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
