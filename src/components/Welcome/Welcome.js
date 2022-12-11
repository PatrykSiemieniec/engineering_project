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
                            <TbUser style={{ color: "black", fontSize: "30px" }}></TbUser>
                            {localStorage.getItem("email")}
                            <Button onClick={logoutHandler}>Wyloguj</Button>
                        </div>
                    )}
                </nav>
            </header>
            <div className={classes.welcome}>
                <h2>Poznaj działanie naszego systemu!</h2>
                <h3>Obejrzyj poniższy film aby dowiedzieć się jakie korzyści niesie ze sobą korzystanie z naszego serwisu dla twojej gastronomii!</h3>
                <h3>Zarejestruj się bezpłatnie i zacznij już teraz ułatwiać sobie pracę!</h3>
                <iframe
                    width="40%"
                    height="60%"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    title="tutorial"
                ></iframe>
            </div>
        </>
    );
};

export default Welcome;
