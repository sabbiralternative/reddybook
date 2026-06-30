import { createContext, useContext, useEffect, useState } from "react";
import { getSetApis } from "../api/config";

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const isLocalhost = window.location.hostname === "localhost";
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (!noticeLoaded && isLocalhost) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded);
      };
      fetchAPI();
    }
    if (!noticeLoaded && !isLocalhost) {
      setNoticeLoaded(true);
    }
  }, [noticeLoaded, isLocalhost]);

  if (!noticeLoaded) {
    return;
  }

  const stateInfo = { logo, setLogo };
  return (
    <ApiContext.Provider value={stateInfo}>{children}</ApiContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(ApiContext);
  return context;
};

export default ApiProvider;
