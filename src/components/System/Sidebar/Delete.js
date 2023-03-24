import React, { useContext, useRef, useState } from "react";
import classes from "./Delete.module.css";
import Modal from "../../../UI/Modal";
import { GridContext } from "../../../store/grid-context";
import Button from "../../../UI/Button";
import { LanguageContext } from "../../../store/language-context";
import lang from './../../../translation/lang.json'

const Delete = (props) => {
    const { isNightMode, handleSelectedType } = useContext(GridContext);

    const { choosenLanguage } = useContext(LanguageContext)
    const language = lang[choosenLanguage].system.edit.delete;
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
                <Button onClick={props.noDelete}>{language.back}</Button>
                <div className={classes.box}>
                    {!isSubmitted && (
                        <>
                            <p className={paragraphClass}>{language.info}</p>
                            <form className={classes.form} onSubmit={submitHandler}>
                                <select ref={selectRef}>
                                    <option value="delivery">{language.delivery}</option>
                                    <option value="onspot">{language.onspot}</option>
                                    <option value="takeaway">{language.takeaway}</option>
                                    <option value="all">{language.all}</option>
                                </select>
                                <Button>{language.confirmButton}</Button>
                            </form>
                        </>
                    )}
                    {isSubmitted && (
                        <>
                            <p className={paragraphClass}>
                                {language.confirm}
                            </p>
                            <button className={classes.deleteButton} onClick={props.delete}>
                                {language.yes}
                            </button>

                            <button
                                className={classes.noDeleteButton}
                                onClick={props.noDelete}
                            >
                                {language.no}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Delete;
