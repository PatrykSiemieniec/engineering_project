import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { TfiBackLeft } from "react-icons/tfi";
import Button from "../../UI/Button";
import lang from '../../translation/lang.json';
import { LanguageContext } from "../../store/language-context";
const AuthForm = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const { choosenLanguage } = useContext(LanguageContext);

    const language = lang[choosenLanguage].login;

    const authCtx = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const authApiKey = process.env.REACT_APP_AUTH_API_KEY;
        const SIGNIN_URL = process.env.REACT_APP_SIGNIN_URL;
        const SIGNUP_URL = process.env.REACT_APP_SIGNUP_URL;

        let url;
        if (isLogin) {
            url = `${SIGNIN_URL}${authApiKey}`
                ;
        } else {
            url = `${SIGNUP_URL}${authApiKey}`

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
                        const errorMessage = data.error.message;
                        let message;
                        if (errorMessage === 'INVALID_PASSWORD') {
                            message = language.errorMessage.invalid;
                        } else if (errorMessage === 'EMAIL_NOT_FOUND') {
                            message = language.errorMessage.not_found;
                        } else if (errorMessage === 'EMAIL_EXISTS') {
                            message = language.errorMessage.exist;
                        } else {
                            message = language.errorMessage.weak;
                        }
                        throw new Error(message);

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
                <h3>{isLogin ? language.login : language.register}</h3>
            </div>
            <button className={classes.button} onClick={() => history.replace("/")}>
                <TfiBackLeft style={{ color: "black", fontSize: "25px" }} />{" "}
            </button>
            <section className={classes.auth}>


                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">{language.email}</label>
                        <input type="email" id="email" ref={emailInputRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">{language.password}</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordInputRef}
                            required
                        />
                    </div>
                    <div className={classes.actions}>
                        <button className={classes.loginButton}>{isLogin ? language.login : language.register}</button>
                        <button
                            type="button"
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin
                                ? language.registerInfo
                                : language.loginInfo}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AuthForm;
