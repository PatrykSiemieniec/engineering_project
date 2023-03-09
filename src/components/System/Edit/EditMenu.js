import React, { useState, useEffect } from "react";
import classes from "./EditMenu.module.css";
import Modal from "../../../UI/Modal";
import EditMenuItems from "./EditMenuItems";
const EditMenu = (props) => {
    const [menu, setMenu] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const user = localStorage.getItem("uid");

    const [name, setName] = useState();
    const [ingredients, setIngredients] = useState();
    const [priceS, setPriceS] = useState();
    const [priceM, setPriceM] = useState();
    const [priceL, setPriceL] = useState();

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(
                `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`
            );

            if (!response.ok) {
                throw new Error("Coś poszło nie tak");
            }
            const responseData = await response.json();
            const loadedMenu = [];

            for (const key in responseData) {
                for (const i in responseData[key])
                    loadedMenu.push({
                        id: responseData[key][i].name,
                        name: responseData[key][i]?.name,
                        ingredients: responseData[key][i]?.ingredients,
                        priceS: responseData[key][i]?.priceS,
                        priceM: responseData[key][i]?.priceM,
                        priceL: responseData[key][i]?.priceL,
                    });
            }

            setMenu(loadedMenu);
        };

        fetchMenu();
    }, []);

    const handleDelete = (position) => {
        console.log(position);
    };

    const handleEdit = (position) => {
        console.log(position.name);
        setEditForm(true);
        setName(position.name);
        setIngredients(position.ingredients);
        setPriceS(position.priceS);
        setPriceM(position.priceM);
        setPriceL(position.priceL);
    };

    const menuList = menu.map((menu) => (
        <EditMenuItems
            id={menu.id}
            key={menu.id}
            name={menu.name}
            ingredients={menu.ingredients}
            priceS={menu.priceS}
            priceM={menu.priceM}
            priceL={menu.priceL}
            onDelete={handleDelete.bind(null, menu)}
            onEdit={handleEdit.bind(null, menu)}
        />
    ));

    return (
        <Modal>
            <button className={classes.button} onClick={props.onClose}>
                Anuluj
            </button>
            <p>Twoje Menu</p>
            {!editForm && (
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Nazwa</th>
                            <th className={classes.ingredients}>Składniki</th>
                            <th>Cena mała sztuka</th>
                            <th>Cena średnia sztuka</th>
                            <th>Cena duża sztuka</th>
                            <th>Usuń</th>
                        </tr>
                        {menuList}
                    </tbody>
                </table>
            )}
            {editForm && (
                <form className={classes.form}>
                    <label>NAZWA</label>
                    <input placeholder={name} required></input>
                    <label>SKŁADNIKI</label>
                    <input placeholder={ingredients} required></input>
                    <label>CENA MAŁA PORCJA</label>
                    <input type="number" placeholder={`${priceS} zł `}></input>
                    <label>CENA ŚREDNIA PORCJA</label>
                    <input type="number" placeholder={`${priceM} zł `}></input>
                    <label>CENA DUŻA PORCJA</label>
                    <input type="number" placeholder={`${priceL} zł `}></input>
                </form>
            )}
        </Modal>
    );
};

export default EditMenu;
