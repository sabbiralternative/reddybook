import { useEffect } from "react";
import { useSettingsMutation } from "../hooks/settings";
import { useSelector } from "react-redux";
import { API } from "../api";

const SettingsWrapper = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { mutate } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!API.login) {
    return null;
  }

  return children;
};

export default SettingsWrapper;
