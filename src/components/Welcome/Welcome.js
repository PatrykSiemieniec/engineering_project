import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../../UI/Button";
import { TbUser } from "react-icons/tb";
import { LanguageContext } from "../../store/language-context";
import { ReactComponent as ENG } from "../../assets/eng.svg";
import { ReactComponent as PL } from "../../assets/pl.svg";
import lang from "../../translation/lang.json";
const Welcome = () => {
    const { choosenLanguage, setChoosenLanguage } = useContext(LanguageContext);
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
                <div className={classes.language}>
                    <div className={classes.langButton} onClick={() => setChoosenLanguage('pl')}>
                        <PL />
                    </div>
                    <div className={classes.langButton} onClick={() => setChoosenLanguage('en')}>
                        <ENG />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
