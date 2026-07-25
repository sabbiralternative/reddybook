import { Navigate, useLocation } from "react-router-dom";

const APK = () => {
  const location = useLocation();

  return <Navigate to="/" state={location} />;
};

export default APK;
