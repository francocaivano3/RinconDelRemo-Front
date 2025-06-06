import { createContext, useState } from "react";

export const TranslateContext = createContext();

const savedLanguage = localStorage.getItem("translate");

export const TranslateProvider = ({ children }) => {
  const [language, setLanguage] = useState(savedLanguage || "es");

  const changeLanguage = (newLanguage) => {
    console.log(newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem("translate", newLanguage);
  };

  return (
    <TranslateContext.Provider value={{ language, changeLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
};
