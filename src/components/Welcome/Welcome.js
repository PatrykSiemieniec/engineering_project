import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../../UI/Button";
import { TbUser } from "react-icons/tb";
const Welcome = () => {
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
                        Strona główna
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
                            Zaloguj
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
                                Wyloguj
                            </button>
                        </div>
                    )}
                </nav>
            </header>
            <div className={classes.welcome}>
                <h1>Poznaj działanie naszego systemu!</h1>
                <div className={classes.register}>
                    {!authCtx.isLoggedIn && <>
                        <h3>
                            Zarejestruj się bezpłatnie i zacznij już teraz ułatwiać sobie
                            pracę!
                        </h3>

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
                            Zarejestruj!
                        </NavLink>
                    </>
                    }
                    {authCtx.isLoggedIn && <>
                        <h3>
                            Dziękujemy że korzystasz z naszych usług, życzymy miłego dnia!
                        </h3>
                    </>
                    }
                </div>

                <h3>
                    Obejrzyj poniższy film aby dowiedzieć się jakie korzyści dla twojej
                    gastronomii niesie ze sobą korzystanie z naszego serwisu!
                </h3>

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
