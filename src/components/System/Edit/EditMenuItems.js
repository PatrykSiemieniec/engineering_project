import { TbTrash, TbEdit } from "react-icons/tb";
const EditMenuItems = (props) => {
    return (
        <tr key={props.index} >
            <th>{props.id} </th>
            <th>{props.name}</th>
            <th>{props.ingredients}</th>
            <th>{props.priceS}zł</th>
            <th>{props.priceM}zł</th>
            <th>{props.priceL}zł</th>
            <th>
                <button onClick={props.onDelete}>
                    <TbTrash style={{ color: "black", fontSize: "20px" }} />
                </button>
                <button onClick={props.onEdit}>
                    <TbEdit style={{ color: "black", fontSize: "20px" }} />
                </button>
            </th>
        </tr>
    );
};
export default EditMenuItems;
