import React, { useContext } from "react";
import { GridContext } from "../../../store/grid-context";
import classes from "./OwnMenuItems.module.css";
import { TbTrash, TbEdit } from "react-icons/tb";
const OwnMenuItems = (props) => {
    const gridCtx = useContext(GridContext);
    const { isNightMode } = gridCtx;
    const thClass = `${classes.thDay} ${isNightMode && classes.thNight}`;
    return (
        <tr className={classes.tr} key={props.index}>
            <th className={thClass}>{props.id} </th>
            <th className={thClass}>{props.name}</th>
            <th className={thClass}>{props.ingredients}</th>
            <th className={thClass}>{props.priceS}zł</th>
            <th className={thClass}>{props.priceM}zł</th>
            <th className={thClass}>{props.priceL}zł</th>
            <th>
                <div className={classes.action}>
                    <button className={classes.button} onClick={props.onDelete}>
                        <TbTrash style={{ color: "black", fontSize: "20px" }} />
                    </button>
                    <button className={classes.button} onClick={props.onEdit}>
                        <TbEdit style={{ color: "black", fontSize: "20px" }} />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default OwnMenuItems;
