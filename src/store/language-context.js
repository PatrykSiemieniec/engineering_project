import React, { createContext, useState } from "react";

export const LanguageContext = createContext({
    language: "",
    setLanguage: (lang) => { },
});

export const LanguageContextProvider = ({ children }) => {
    const [choosenLanguage, setChoosenLanguage] = useState("pl");

    const contextValue = { choosenLanguage, setChoosenLanguage };
    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
