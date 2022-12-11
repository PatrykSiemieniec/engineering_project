import React, { useRef, useState, useContext } from "react";
import classes from "./SendOwnMenu.module.css";
import Modal from "../../../UI/Modal";
import OwnMenuItems from "./OwnMenuItems";
import { GridContext } from "../../../store/grid-context";

const user = localStorage.getItem("uid");
let id = 0;

const SendOwnMenu = (props) => {
    const gridCtx = useContext(GridContext);
    const { isNightMode } = gridCtx;
    const [data, setData] = useState([]);
    const nameRef = useRef();
    const ingredientsRef = useRef();
    const priceSmallRef = useRef();
    const priceMediumRef = useRef();
    const priceLargeRef = useRef();
    const deleteRef = useRef();

    let loadedData = [];
    let items = [];

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const ingredients = ingredientsRef.current.value;
        const priceS = +priceSmallRef.current.value;
        const priceM = +priceMediumRef.current.value;
        const priceL = +priceLargeRef.current.value;

        loadedData.push({
            id,
            name,
            ingredients,
            priceS,
            priceM,
            priceL,
        });

        e.target.reset();
        setData((prev) => [...prev, loadedData]);
        id++;
        console.log(data)
    };
    const deleteItemHandler = (e) => {
        e.preventDefault();
        const deleteID = +deleteRef.current.value;
    };

    if (data.length === 0) {
        console.log("0");
    } else {
        items = data.map((item, index) => (
            <OwnMenuItems
                key={index}
                id={item[0].id}
                name={item[0].name}
                ingredients={item[0].ingredients}
                priceS={item[0].priceS}
                priceM={item[0].priceM}
                priceL={item[0].priceL}
            />
        ));
    }
    const handleSendUserMenu = () => {
        fetch(
            `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/menu.json`,
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    };
    const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
    const labelClass = `${classes.labelDay} ${isNightMode && classes.labelNight}`;
    return (
        <Modal>
            <button onClick={props.onClose}> Anuluj </button>
            <p className={paragraphClass}>DODAJ POZYCJE DO SWOJEGO MENU</p>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <label className={labelClass}>NAZWA</label>
                <input ref={nameRef}></input>
                <label className={labelClass}>SKŁADNIKI</label>
                <input ref={ingredientsRef}></input>
                <label className={labelClass}>CENA MAŁA PORCJA</label>
                <input type="number" ref={priceSmallRef} placeholder="zł "></input>
                <label className={labelClass}>CENA ŚREDNIA PORCJA</label>
                <input type="number" ref={priceMediumRef} placeholder="zł "></input>
                <label className={labelClass}>CENA DUŻA PORCJA</label>
                <input type="number" ref={priceLargeRef} placeholder="zł "></input>
                <button >Dodaj do menu</button>
            </form>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Nazwa</th>
                        <th className={classes.ingredients}>Składniki</th>
                        <th>Cena mała sztuka</th>
                        <th>Cena średnia sztuka</th>
                        <th>Cena duża sztuka</th>
                    </tr>
                    {items}
                </tbody>
            </table>
            <div className={classes.panel}>
                <label className={labelClass}>Klikając <b>Zapisz</b> wyślesz zamówienia do bazy danych</label>
                <button onClick={handleSendUserMenu}>Zapisz </button>
                <label className={labelClass}>Podaj ID produktu który chcesz usunąć</label>
                <form onSubmit={deleteItemHandler}>
                    <input type="number" ref={deleteRef} />
                    <button>Usuń</button>
                </form>
            </div>
        </Modal>
    );
};

export default SendOwnMenu;
