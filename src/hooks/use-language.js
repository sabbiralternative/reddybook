import { useContext, useCallback } from "react";
import { LanguageContext } from "../context/LanguageProvider";

const useLanguage = () => {
  const { valueByLanguage, language, setLanguage } =
    useContext(LanguageContext);

  const getLanguage = useCallback(
    (key) => {
      if (!key) return "";

      const language = localStorage.getItem("language") || "english";

      const translatedValue = valueByLanguage?.[key]?.[language];

      if (translatedValue) {
        return translatedValue;
      }

      return key
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    },
    [valueByLanguage],
  );

  return { getLanguage, language, setLanguage, valueByLanguage };
};

export default useLanguage;
