import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import { TbUser } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { GridContext } from "../../store/grid-context";
import { LanguageContext } from "../../store/language-context";
import lang from "../../translation/lang.json";
const Welcome = () => {
    const { choosenLanguage, reloadLanguageHandler } = useContext(LanguageContext);

    const { setIsSystemOpen } = useContext(GridContext)
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <NavLink
                        style={{ textDecoration: "none", color: "black", padding: "10px" }}
                        to="/"
                        activeClassName={classes.active}
                    >
                        {lang[choosenLanguage].welcome.headerHome}
                    </NavLink>
                    {authCtx.isLoggedIn && (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "black",
                                padding: "10px",
                            }}
                            to="/system"
                            onClick={() => { setIsSystemOpen(prev => !prev); reloadLanguageHandler(prev => !prev) }}
                        >
                            System
                        </NavLink>
                    )}
                    {!authCtx.isLoggedIn ? (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "black",
                                padding: "10px",
                            }}
                            to="/auth"
                        >
                            {lang[choosenLanguage].welcome.headerLogin}
                        </NavLink>
                    ) : (
                        <div className={classes.flex}>
                            <div className={classes.flexInside}>
                                <TbUser style={{ color: "black", fontSize: "30px" }}></TbUser>
                                {localStorage.getItem("email")}
                            </div>

                            <button
                                className={classes.registerButton}
                                onClick={logoutHandler}
                            >
                                {lang[choosenLanguage].welcome.headerLogout}
                            </button>
                        </div>
                    )}
                </nav>
            </header>
            <div className={classes.welcome}>
                <h1>{lang[choosenLanguage].welcome.mainParagraph}</h1>
                <div className={classes.register}>
                    {!authCtx.isLoggedIn && (
                        <>
                            <h3>{lang[choosenLanguage].welcome.mainInviteRegister}</h3>

                            <NavLink
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    border: "0.5px solid black",
                                    fontSize: "large",
                                }}
                                to="/auth"
                            >
                                {lang[choosenLanguage].welcome.mainRegisterButton}
                            </NavLink>
                        </>
                    )}
                    {authCtx.isLoggedIn && (
                        <>
                            <h3>{lang[choosenLanguage].welcome.mainRegisteredInfo}</h3>
                        </>
                    )}
                </div>

                <h3>{lang[choosenLanguage].welcome.mainInfo}</h3>

                <iframe
                    frameBorder="0"
                    width="30%"
                    height="50%"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    title="tutorial"
                ></iframe>

            </div>
        </>
    );
};

export default Welcome;
