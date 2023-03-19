import React from "react";
import classes from "./LogoutInfo.module.css";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { Link } from "react-router-dom";
const LogoutInfo = () => {
    return (
        <div className={classes.container}>
            <Logout className={classes.svg} />
            <div className={classes.info}>
                <h1> Token logowania wygasł. </h1>
                <h3> Wróć na stronę logowania i zaloguj się ponownie! </h3>
            </div>
            <div className={classes.info}>
                <Link
                    style={{
                        textDecoration: "none",
                        color: "black",
                        padding: "1rem 3rem",
                        borderRadius: "8px",
                        border: "0.5px solid black",
                        fontSize: "25px",
                        fontFamily: '"Nunito Sans", sans-serif',
                        width: '100px',
                        textAlign: 'center'

                    }}
                    to="/"
                >
                    Powrót
                </Link>
            </div>
        </div>
    );
};

export default LogoutInfo;
