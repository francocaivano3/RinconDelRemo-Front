import { useContext } from 'react';
import { TranslateContext } from '../components/context/translationContext/TranslateLanguage';
import { diccionary } from '../translate/diccionary';

export const useTranslate = () => {
  const { language } = useContext(TranslateContext);

  return (key) => {
    const translate =
      diccionary[language]?.find((t) => t.key === key)?.value ||
      diccionary["en"]?.find((t) => t.key === key)?.value;
    return translate || key;
  };
};
