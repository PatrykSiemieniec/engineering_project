import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useContext,
} from "react";
import axios from "axios";
import { GridContext } from "./grid-context";
export const LanguageContext = createContext({
    choosenLanguage: "",
    reloadLanguage: false,
    setLanguage: (lang) => { },
    setReloadLanguage: (condition) => { },
});

export const LanguageContextProvider = ({ children }) => {
    const { isSystemOpen } = useContext(GridContext);

    const [choosenLanguage, setChoosenLanguage] = useState("pl");
    const [reloadLanguage, setReloadLanguage] = useState(false);

    const reloadLanguageHandler = (condition) => {
        setReloadLanguage(condition);
    };

    const memo = useMemo(() => choosenLanguage, [choosenLanguage]);
    const user = localStorage.getItem("uid");
    useEffect(() => {
        const fetchConfig = async () => {
            const response = await axios.get(
                `https://engineering-project-89cd8-default-rtdb.europe-west1.firebasedatabase.app/${user}/config.json`
            );

            if (response?.data?.choosenLanguage === "pl") {
                setChoosenLanguage("pl");
            } else if (response?.data?.choosenLanguage === "en") {
                setChoosenLanguage("en");
            } else {
                setChoosenLanguage("pl");
            }

        };
        fetchConfig();
    }, [user, reloadLanguage, isSystemOpen]);

    const contextValue = {
        choosenLanguage: memo,
        setChoosenLanguage,
        reloadLanguage,
        reloadLanguageHandler,
    };
    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
