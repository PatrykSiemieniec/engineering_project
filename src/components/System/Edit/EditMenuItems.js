import { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import { TbTrash, TbEdit } from "react-icons/tb";
import classes from './EditMenuItems.module.css';


const EditMenuItems = (props) => {

    const { isNightMode } = useContext(GridContext);

    const trClasses = `${classes.tr} ${isNightMode && classes.trNight} `;

    return (
        <tr key={props.index} className={trClasses}>
            <th>{props.id} </th>
            <th>{props.name}</th>
            <th>{props.ingredients}</th>
            <th>{props.priceS}zł</th>
            <th>{props.priceM}zł</th>
            <th>{props.priceL}zł</th>
            <th className={classes.action}>
                <button className={classes.button} onClick={props.onDelete}>
                    <TbTrash style={{ color: "black", fontSize: "20px" }} />
                </button>
                <button className={classes.button} onClick={props.onEdit}>
                    <TbEdit style={{ color: "black", fontSize: "20px" }} />
                </button>
            </th>
        </tr>
    );
};
export default EditMenuItems;
