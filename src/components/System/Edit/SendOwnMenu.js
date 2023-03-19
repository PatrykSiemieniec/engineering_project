import React, { useRef, useState, useContext } from "react";
import classes from "./SendOwnMenu.module.css";
import Modal from "../../../UI/Modal";
import OwnMenuItems from "./OwnMenuItems";
import Button from "../../../UI/Button";
import { GridContext } from "../../../store/grid-context";
import { LanguageContext } from "../../../store/language-context";
import lang from './../../../translation/lang.json'

const SendOwnMenu = (props) => {
    const { isNightMode } = useContext(GridContext);

    const { choosenLanguage } = useContext(LanguageContext)
    const language = lang[choosenLanguage].system.edit.editMenu;

    const [userId, setUserId] = useState("");
    const [data, setData] = useState([]);

    const nameRef = useRef();
    const ingredientsRef = useRef();
    const priceSmallRef = useRef();
    const priceMediumRef = useRef();
    const priceLargeRef = useRef();

    let loadedData = [];
    let items = [];

    const generateID = () => {
        const characters =
            `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[]|:;"'<>,.?/~`;
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };

    const formSubmitHandler = (e) => {
        const user = localStorage.getItem("uid");
        setUserId(user);
        e.preventDefault();
        const name = nameRef.current.value;
        const ingredients = ingredientsRef.current.value;
        const priceS = +priceSmallRef.current.value;
        const priceM = +priceMediumRef.current.value;
        const priceL = +priceLargeRef.current.value;

        const result = generateID();

        console.log(result)
        loadedData.push({
            id: result,
            name,
            ingredients,
            priceS,
            priceM,
            priceL,
        });

        e.target.reset();
        setData((prev) => [...prev, loadedData]);
        console.log(data);
    };
    const deleteItemHandler = (index) => {
        console.log(index);
        const arrayToDelete = [...data];
        arrayToDelete.splice(index, 1);
        setData(arrayToDelete);
    };

    if (data.length === 0) {
        console.log("0");
    } else {
        items = data.map((item, index) => (
            <OwnMenuItems
                key={index}
                id={index}
                ID={item[0].ID}
                name={item[0].name}
                ingredients={item[0].ingredients}
                priceS={item[0].priceS}
                priceM={item[0].priceM}
                priceL={item[0].priceL}
                onDelete={deleteItemHandler.bind(null, index)}
            />
        ));
    }
    const handleSendUserMenu = () => {
        const flatArray = data.flat();
        fetch(
            `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${userId}/menu.json`,
            {
                method: "POST",
                body: JSON.stringify(flatArray),
            }
        );
        props.onClose();
    };

    const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
    const labelClass = `${classes.labelDay} ${isNightMode && classes.labelNight}`;
    return (
        <Modal>
            <Button onClick={props.onClose}>
                {language.cancel}
            </Button>
            <p className={paragraphClass}>{language.addPosition}</p>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <label className={labelClass}>{language.formName}</label>
                <input ref={nameRef} required></input>
                <label className={labelClass}>{language.formIngredients}</label>
                <input ref={ingredientsRef} required></input>
                <label className={labelClass}>{language.formPriceS}</label>
                <input type="number" ref={priceSmallRef} placeholder="zł "></input>
                <label className={labelClass}>{language.formPriceM}</label>
                <input type="number" ref={priceMediumRef} placeholder="zł "></input>
                <label className={labelClass}>{language.formPriceL}</label>
                <input type="number" ref={priceLargeRef} placeholder="zł "></input>
                <Button>{language.add}</Button>
            </form>
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
                        {items}
                    </tbody>
                </table>
            </div>
            <div className={classes.panel}>
                <label className={labelClass}>
                    {language.submitInfo}
                </label>
                <Button onClick={handleSendUserMenu}>
                    {language.save}
                </Button>
            </div>
        </Modal>
    );
};

export default SendOwnMenu;
