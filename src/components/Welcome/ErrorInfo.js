import React from "react";
import classes from "./ErrorInfo.module.css";
import { Link } from "react-router-dom";

const ErrorInfo = () => {
    return (
        <div className={classes.container}>
            <div>
                <div className={classes.top}>
                    <div className={classes.notfound}>
                        <h1>404</h1>
                        <p>Page not found</p>
                    </div>

                    <Link
                        style={{
                            textDecoration: "none",
                            color: "black",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "0.5px solid black",
                            fontSize: "25px",
                            fontFamily: '"Nunito Sans", sans-serif'
                        }}
                        to="/"
                    >
                        Strona główna
                    </Link>
                </div>

                <h1 className={classes.info}>Nie znaleziono, wróć na stronę główną</h1>
            </div>
        </div>
    );
};

export default ErrorInfo;
