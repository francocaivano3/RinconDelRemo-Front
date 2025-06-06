import { TranslateContext } from "../context/translationContext/TranslateLanguage";
import { useContext } from "react";
import { diccionary } from "../translate/diccionario";

export const useTranslate = () => {
  const { language } = useContext(TranslateContext);

  return (key) => {
    const translate =
      diccionary[language]?.find((t) => t.key === key)?.value ||
      diccionary["en"]?.find((t) => t.key === key)?.value;
    return translate || key;
  };
};
