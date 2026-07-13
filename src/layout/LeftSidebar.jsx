import toast from "react-hot-toast";
import { Settings } from "../api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningCondition from "../components/shared/WarningCondition/WarningCondition";
import { useDispatch, useSelector } from "react-redux";
import { handleDownloadAPK } from "../utils/handleDownloadAPK";
import { setShowMobileSidebar } from "../redux/features/global/globalSlice";
import useCloseModalClickOutside from "../hooks/closeModal";
import { useLogo } from "../context/ApiProvider";
import { useLanguage } from "../context/LanguageProvider";
import { languageValue } from "../utils/language";
import { LanguageKey } from "../const";
import { eventNameList } from "../static/event-name-list";

const LeftSidebar = () => {
  const { valueByLanguage } = useLanguage();
  const { logo } = useLogo();
  const ref = useRef();
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token, bonusToken } = useSelector((state) => state.auth);
  const { showMobileSidebar } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
    dispatch(setShowMobileSidebar(false));
  };

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (bonusToken) {
        return toast.error("Bonus wallet is available only on sports.");
      }
      if (Settings.casino_currency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
      dispatch(setShowMobileSidebar(false));
    } else {
      toast.error("Please login to access the game");
    }
  };

  useCloseModalClickOutside(ref, () => {
    if (showMobileSidebar) {
      dispatch(setShowMobileSidebar(false));
    }
  });
  return (
    <div className="left-side-bar-sec" id="show-m-toggle" ref={ref}>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div className="app-lft-sidebar">
        <div className="left-close-btn">
          <div className="offcanvass-logo-sec mobile-logo">
            <a
              className="router-link-active router-link-exact-active"
              aria-current="page"
            >
              <img
                loading="lazy"
                src={logo}
                style={{
                  height: Settings.logo_height,
                  width: Settings.logo_width,
                }}
                alt="Site logo"
              />
            </a>
          </div>
          <button
            onClick={() => dispatch(setShowMobileSidebar(false))}
            type="button"
            className="right-colse-icon"
          />
        </div>
        <div className="depo-and-wdrl-sec">
          <ul />
        </div>

        <div className="accordion side-menu-tabs" id="accordionExample">
          <div
            className="accordion-item"
            onClick={() => handleNavigate("/sports/cricket/4")}
          >
            <h2 className="accordion-header" id="headingOne2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne10"
                aria-expanded="true"
                aria-controls="collapseOne10"
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-tennis"
                    />
                  </span>
                  <span className="sports-name-h">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.HOME)}{" "}
                  </span>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne10"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne2"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
          <div
            className="accordion-item"
            onClick={() => handleNavigate("/sports/soccer/1")}
          >
            <h2 className="accordion-header" id="headingOne2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne11"
                aria-expanded="true"
                aria-controls="collapseOne11"
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-tennis"
                    />
                  </span>
                  <span className="sports-name-h">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.FOOTBALL)}{" "}
                  </span>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne11"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne2"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
          <div
            onClick={() => handleNavigate("/sports/tennis/2")}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingOne2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne12"
                aria-expanded="true"
                aria-controls="collapseOne12"
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-tennis"
                    />
                  </span>
                  <span className="sports-name-h">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.CRICKET)}{" "}
                  </span>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne12"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne2"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
          <div
            onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingten">
              <a
                className="accordion-button no-collapse-btn collapsed"
                style={{ padding: "9px 10px" }}
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-sports-book"
                    />
                  </span>
                  <span className="sports-name-h">Sports Book</span>
                </span>
              </a>
            </h2>
          </div>

          <div
            onClick={() => handleNavigate("/casino?product=All&category=All")}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingeight">
              <a
                className="accordion-button no-collapse-btn collapsed"
                style={{ padding: "9px 10px" }}
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-99999"
                    />
                  </span>
                  <span className="sports-name-h">Casino</span>
                </span>
              </a>
            </h2>
          </div>
          <div
            onClick={() => handleNavigateToIFrame("EvolutionGaming", 200296)}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingten">
              <a
                className="accordion-button no-collapse-btn collapsed"
                style={{ padding: "9px 10px" }}
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-99998"
                    />
                  </span>
                  <span className="sports-name-h">Evolution</span>
                </span>
              </a>
            </h2>
          </div>

          <div
            onClick={() => handleNavigate("/sports/election/6")}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingOne4">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne42"
                aria-expanded="true"
                aria-controls="collapseOne42"
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-tennis"
                    />
                  </span>
                  <span className="sports-name-h">ELECTION</span>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne42"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne4"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
          <div
            onClick={() => handleNavigate("/sports/kabaddi/5")}
            className="accordion-item"
          >
            <h2 className="accordion-header" id="headingOne4">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne43"
                aria-expanded="true"
                aria-controls="collapseOne43"
              >
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="menu-tennis"
                    />
                  </span>
                  <span className="sports-name-h">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.KABADDI)}{" "}
                  </span>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne43"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne4"
              data-bs-parent="#accordionExample"
            ></div>
          </div>
          {eventNameList.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() =>
                  handleNavigate(`/sports/${item?.name}/${item?.id}`)
                }
                className="accordion-item"
              >
                <h2 className="accordion-header" id="headingOne4">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne43"
                    aria-expanded="true"
                    aria-controls="collapseOne43"
                  >
                    <span className="side-menu-heading">
                      <span className="img-side-logo">
                        <img
                          loading="lazy"
                          src={item?.image}
                          alt="menu-tennis"
                        />
                      </span>
                      <span className="sports-name-h"> {item.name}</span>
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseOne43"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne4"
                  data-bs-parent="#accordionExample"
                ></div>
              </div>
            );
          })}
          {Settings.apk_link && (
            <div onClick={handleDownloadAPK} className="download-apk-bx">
              <a data-bs-toggle="modal">
                <span className="side-menu-heading">
                  <span className="img-side-logo">
                    <img
                      loading="lazy"
                      src="data:image/webp;base64,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"
                    />
                  </span>
                  <span className="sports-name-h">Download APK</span>
                </span>
              </a>
            </div>
          )}

          <div className="instant-id-bx">
            <div className="social_wrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
