import React,{useContext} from "react";
import { GridContext } from "../../store/grid-context";
const EditPanel = (props) => {
  const gridCtx = useContext(GridContext);
  const { handleEditPanelShown } = gridCtx;
  return (
    <div>
      <div>EditPanel</div>
      <button
        onClick={() => {
          handleEditPanelShown(false);
        }}
      >
        Powrót
      </button>
    </div>
  );
};

export default EditPanel;
