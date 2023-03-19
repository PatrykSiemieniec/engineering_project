import React, { useContext, useRef, useState } from "react";
import classes from "./Delete.module.css";
import Modal from "../../../UI/Modal";
import { GridContext } from "../../../store/grid-context";
import Button from "../../../UI/Button";

const Delete = (props) => {
    const gridCtx = useContext(GridContext);
    const { isNightMode, handleSelectedType } = gridCtx;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const paragraphClass = `${classes.day} ${isNightMode && classes.night}`;
    const selectRef = useRef();
    let selected;
    const submitHandler = (event) => {
        event.preventDefault();
        selected = selectRef.current.value;
        setIsSubmitted(true);
        handleSelectedType(selected);
    };

    return (
        <Modal>
            <div>
                <Button onClick={props.noDelete}>Powrót</Button>
                <div className={classes.box}>
                    {!isSubmitted && (
                        <>
                            <p className={paragraphClass}>Które zamówienia chcesz usunąć?</p>
                            <form className={classes.form} onSubmit={submitHandler}>
                                <select ref={selectRef}>
                                    <option value="delivery">Na dowóz</option>
                                    <option value="onspot">Na miejscu</option>
                                    <option value="takeaway">Na wynos</option>
                                    <option value="all">Wszystkie</option>
                                </select>
                                <Button>Potwierdź</Button>
                            </form>
                        </>
                    )}
                    {isSubmitted && (
                        <>
                            <p className={paragraphClass}>
                                Czy na pewno chcesz usunąć zamówienia?
                            </p>
                            <button className={classes.deleteButton} onClick={props.delete}>
                                Tak
                            </button>

                            <button
                                className={classes.noDeleteButton}
                                onClick={props.noDelete}
                            >
                                Nie
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Delete;
