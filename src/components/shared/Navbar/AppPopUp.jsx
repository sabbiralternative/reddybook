import { useDispatch } from "react-redux";
import { setShowAppPopUp } from "../../../redux/features/global/globalSlice";
import { Settings } from "../../../api";
import images from "../../../assets/images";

const AppPopup = () => {
  const dispatch = useDispatch();
  const closeAppModal = () => {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("installPromptExpiryTime", expiryTime);
    dispatch(setShowAppPopUp(false));
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    closeAppModal();
  };
  return (
    <div className="android-popup">
      {/* <div className="rect-1"></div>
      <div className="rect-2"></div> */}
      <div className="android-card">
        <div
          onClick={closeAppModal}
          className="cancel-icon"
          style={{
            height: "fit-content",
            width: "fit-content",
            cursor: "pointer",
            margin: "0px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.0837 7.32778C1.92099 7.49053 1.92102 7.75432 2.08375 7.91703C2.24648 8.07974 2.5103 8.07973 2.673 7.91699L5.00019 5.5894L7.32756 7.91678C7.49027 8.07948 7.7541 8.07948 7.91681 7.91678C8.07952 7.75407 8.07952 7.49024 7.91681 7.32753L5.5894 5.00011L7.91665 2.67245C8.07931 2.50972 8.07931 2.2459 7.91656 2.0832C7.75385 1.92049 7.49002 1.92051 7.32731 2.08325L5.0001 4.41086L2.67272 2.08345C2.51 1.92073 2.24618 1.92073 2.08347 2.08345C1.92075 2.24617 1.92075 2.50998 2.08347 2.67271L4.41094 5.00015L2.0837 7.32778Z"
              fill="#111827"
            ></path>
          </svg>
        </div>
        <div className="side-logo">
          <img src={images.playStore} alt="" />
        </div>
        <div className="app-text">
          <h2>Download Android Application</h2>

          <div className="star">
            <img src={images.appStar} alt="star" />
            <img src={images.appStar} alt="star" />
            <img src={images.appStar} alt="star" />
            <img src={images.appStar} alt="star" />
            <img src={images.appStar} alt="star" />
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex rounded-full hover:opacity-100 w-max font-extrabold items-center justify-center px-4 py-1.5 bg-bg_Quaternary"
      >
        <span className="text-x text-text_Primary  md:font-medium xs:text-xs md:text-sm font-[500]">
          Install
        </span>
      </button>
    </div>
  );
};

export default AppPopup;
