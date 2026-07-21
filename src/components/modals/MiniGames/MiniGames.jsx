import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userToken } from "../../../redux/features/auth/authSlice";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const MiniGames = ({ setShowMiniGamesModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => setShowMiniGamesModal(false));
  const [iFrame, setIFrame] = useState("");
  const token = useSelector(userToken);

  useEffect(() => {
    const getCasinoVideo = async () => {
      const payload = {
        gameId: 150899,
        isHome: false,
        mobileOnly: true,
        casinoCurrency: Settings.casino_currency,
      };

      try {
        const res = await AxiosSecure.post(API.liveCasinoIFrame, payload);
        const data = res?.data;
        setIFrame(data?.gameUrl);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    getCasinoVideo();
  }, [token]);

  return (
    <div
      style={{
        backgroundColor: "#132225",
        width: "100%",
        position: "fixed",
        bottom: "0px",
        height: "fit-content",
        zIndex: 9999999,
        left: 0,
        right: 0,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          height: "245px",
          width: "98%",
          position: "relative",
        }}
      >
        <div
          onClick={() => setShowMiniGamesModal(false)}
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            cursor: "pointer",
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            style={{ color: "#ae7526" }}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
          </svg>
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <iframe
            src={iFrame}
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px 10px 0 0",
              border: "none",
            }}
            sandbox="allow-same-origin allow-forms allow-scripts allow-top-navigation allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
