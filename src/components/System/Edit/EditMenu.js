import React, { useState, useEffect, useContext } from "react";
import classes from "./EditMenu.module.css";
import Modal from "../../../UI/Modal";
import EditMenuItems from "./EditMenuItems";
import Button from "../../../UI/Button";
import axios from "axios";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from '../../../translation/lang.json'

const EditMenu = (props) => {
    const [menu, setMenu] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);
    const user = localStorage.getItem("uid");

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [ingredients, setIngredients] = useState();
    const [priceS, setPriceS] = useState();
    const [priceM, setPriceM] = useState();
    const [priceL, setPriceL] = useState();
    const [menuIdx, setMenuIdx] = useState();

    const { isNightMode } = useContext(GridContext);
    const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
    const formClass = `${classes.form} ${isNightMode && classes.formNight}`;


    const { choosenLanguage } = useContext(LanguageContext);
    const language = lang[choosenLanguage].system.edit.editMenu;
    console.log(language)

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(
                `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`
            );

            if (!response.ok) {
                throw new Error("Coś poszło nie tak");
            }

            const responseData = await response.json();

            if (responseData === null) {
                setEmptyResponse(true);
            }
            const loadedMenu = [];

            for (const key in responseData) {
                for (const i in responseData[key])
                    if (responseData[key][i] !== null) {
                        loadedMenu.push({
                            id: responseData[key][i].id,
                            index: key,
                            deleteIndex: i,
                            name: responseData[key][i]?.name,
                            ingredients: responseData[key][i]?.ingredients,
                            priceS: responseData[key][i]?.priceS,
                            priceM: responseData[key][i]?.priceM,
                            priceL: responseData[key][i]?.priceL,
                        });
                    }
            }

            setMenu(loadedMenu);
        };

        fetchMenu();
    }, [deleted]);

    const handleEdit = (position) => {
        setEditForm(true);
        setId(position.id);
        setName(position.name);
        setIngredients(position.ingredients);
        setPriceS(position.priceS);
        setPriceM(position.priceM);
        setPriceL(position.priceL);

        const indexOfEditedMenu = menu.findIndex(
            (array) => array.id === position.id
        );
        setMenuIdx(indexOfEditedMenu);
    };

    const saveEdit = () => {
        console.log(menu[menuIdx].name);

        const updatedMenu = [...menu];

        updatedMenu[menuIdx].name = name;
        updatedMenu[menuIdx].ingredients = ingredients;
        updatedMenu[menuIdx].priceS = +priceS;
        updatedMenu[menuIdx].priceM = +priceM;
        updatedMenu[menuIdx].priceL = +priceL;

        console.log(updatedMenu);

        axios.delete(
            `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`
        );

        const timer = setTimeout(() => {
            fetch(
                `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`,
                {
                    method: "POST",
                    body: JSON.stringify(updatedMenu),
                }
            );
        }, 1000);

        setEditForm(false);
        return () => clearTimeout(timer);
    };

    const handleDelete = (position) => {
        axios
            .delete(
                `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu/${position.index}/${position.deleteIndex}.json`
            )
            .then((res) => console.log(res));
        setDeleted(true);
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
            <div className={classes.header}>
                {!editForm ? (
                    <Button onClick={props.onClose}>
                        {language.cancel}
                    </Button>
                ) : (
                    <Button onClick={() => setEditForm(false)}>
                        {language.back}
                    </Button>
                )}
                {editForm && (
                    <Button onClick={saveEdit}>
                        {language.save}
                    </Button>
                )}
            </div>

            {!deleted ? (
                <>
                    <p className={paragraphClass}>{language.yourMenu}</p>
                    {!editForm && (
                        <div className={classes.box}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.headers}>
                                        <th>#</th>
                                        <th>{language.tableName}</th>
                                        <th className={classes.ingredients}>{language.tableIngredients}</th>
                                        <th>{language.tablePriceS}</th>
                                        <th>{language.tablePriceM}</th>
                                        <th>{language.tablePriceL}</th>
                                        <th>{language.action}</th>
                                    </tr>
                                    {!emptyResponse ? (
                                        menuList
                                    ) : (
                                        <tr>
                                            <th colSpan="7">
                                                <div className={classes.text}>
                                                    {language.emptyInfo}
                                                </div>
                                            </th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {editForm && (
                        <form className={formClass}>
                            <label>ID: {id}</label>
                            <br />
                            <label>{language.formName}</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={name}
                                required
                            />
                            <label>{language.formIngredients}</label>
                            <input
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            ></input>
                            <label>{language.formPriceS}</label>
                            <input
                                type="number"
                                value={priceS}
                                onChange={(e) => setPriceS(e.target.value)}
                            ></input>
                            <label>{language.formPriceM}</label>
                            <input
                                type="number"
                                value={priceM}
                                onChange={(e) => setPriceM(e.target.value)}
                            ></input>
                            <label>{language.formPriceL}</label>
                            <input
                                type="number"
                                value={priceL}
                                onChange={(e) => setPriceL(e.target.value)}
                            ></input>
                        </form>
                    )}
                </>
            ) : (
                <div className={classes.deleteContainer}>
                    <button
                        className={classes.button}
                        onClick={() => {
                            setDeleted(false);
                        }}
                    >
                        {language.backToEdit}
                    </button>
                    <p>{language.successMsg}</p>
                </div>
            )}
        </Modal>
    );
};

export default EditMenu;
