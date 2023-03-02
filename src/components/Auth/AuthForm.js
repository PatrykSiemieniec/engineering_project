import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { TfiBackLeft } from "react-icons/tfi";
const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url;
        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHaM6eKKL1315urq3uyxPB3mw8f_lr5Vg";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHaM6eKKL1315urq3uyxPB3mw8f_lr5Vg";
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        const errorMessage = "Autoryzacja nieudana";
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                const expirationTime = new Date(
                    new Date().getTime() + data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime.toISOString());
                authCtx.setUserInfo({
                    email: data.email,
                    uid: data.localId,
                });
                history.replace("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <h3>{isLogin ? "Zaloguj" : "Zarejestruj"}</h3>
            </div>
            <button className={classes.button} onClick={() => history.replace("/")}>
                <TfiBackLeft style={{ color: "black", fontSize: "25px" }} />{" "}
            </button>
            <section className={classes.auth}>


                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Twój E-mail</label>
                        <input type="email" id="email" ref={emailInputRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Twoje Hasło</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordInputRef}
                            required
                        />
                    </div>
                    <div className={classes.actions}>
                        <button>{isLogin ? "Zaloguj" : "Załóż Konto"}</button>
                        <button
                            type="button"
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin
                                ? "Utwórz nowe konto"
                                : "Zaloguj się poprzez istniejące konto"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AuthForm;
