import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../../modals/Login/Login";
import ForgotPassword from "../../modals/ForgotPassword/ForgotPassword";
import Register from "../../modals/Register/Register";
import { Settings } from "../../../api";
import {
  setClosePopUpForForever,
  setHeaderHeight,
  setShowAPKModal,
  setShowAppPopUp,
  setShowLoginModal,
  setShowMobileSidebar,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import useBalance from "../../../hooks/balance";
import Dropdown from "./Dropdown";
import NavMenu from "./NavMenu";
import { Fragment, useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import SearchBox from "./SearchBox";
import { useLogo } from "../../../context/ApiProvider";
import { useLatestEvent } from "../../../hooks/latestEvent";
import Marquee from "react-fast-marquee";
import { useLanguage } from "../../../context/LanguageProvider";
import Error from "../../modals/Error/Error";
import Language from "../../modals/Language/Language";
import AppPopup from "./AppPopUp";
import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";

const Navbar = () => {
  const { valueByLanguage } = useLanguage();
  const headerRef = useRef();
  const { setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: latestEvent } = useLatestEvent();
  const { logo } = useLogo();
  const ref = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data } = useBalance();
  const dispatch = useDispatch();
  const {
    showRegisterModal,
    showLoginModal,
    showForgotPasswordModal,
    windowWidth,
    showLanguageModal,
    showAppPopUp,
    closePopupForForever,
    showAPKModal,
  } = useSelector((state) => state.global);
  const { token, user } = useSelector((state) => state.auth);

  useCloseModalClickOutside(ref, () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  });

  useEffect(() => {
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    dispatch(setClosePopUpForForever(closePopupForForever ? true : false));
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      dispatch(setClosePopUpForForever(true));
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        dispatch(setShowAPKModal(true));
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings.apk_link) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);
  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "english");
  }, [setLanguage]);

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;

      dispatch(setHeaderHeight(headerHeight));
    }
  }, [headerRef, dispatch, location.pathname, windowWidth]);
  if (Settings.app_only && !closePopupForForever) {
    return <Error />;
  }
  return (
    <>
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}
      <header
        ref={headerRef}
        className="header-wapper header-search "
        loading="lazy"
        style={{ height: "auto" }}
      >
        {showLanguageModal && <Language />}
        {Settings.apk_link && showAppPopUp && windowWidth < 1040 && (
          <AppPopup />
        )}
        {Settings.apk_link && showAPKModal && <DownloadAPK />}
        <div className="container">
          <div className="navbar-sec">
            <div className="nav-left">
              <ul>
                <li>
                  <Link
                    to="/"
                    className="router-link-active router-link-exact-active desktop-logo"
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
                  </Link>
                  <Link
                    to="/"
                    className="router-link-active router-link-exact-active mobile-logo"
                    aria-label="Home"
                    aria-current="page"
                  >
                    <img loading="lazy" src={logo} alt="Site logo" />
                  </Link>
                </li>
                {windowWidth > 800 && <SearchBox />}

                {token && (
                  <li className="rules-box">
                    <div className="d-w-box">
                      <ul>
                        <li>
                          <Link to="/withdraw" className>
                            <img
                              loading="lazy"
                              src="/icon/withdrawal-icon.0cb9bbfd.svg"
                              alt="withdrawal-icon"
                              style={{ height: "15px" }}
                            />
                            <span>
                              {" "}
                              {languageValue(
                                valueByLanguage,
                                LanguageKey.WITHDRAW,
                              )}{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="cnm-deposit-wdr-btn">
                          <Link to="/deposit" className="deposit-btn">
                            <img
                              loading="lazy"
                              src="data:image/webp;base64,UklGRhwEAABXRUJQVlA4WAoAAAAwAAAAHwAAHwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIAAIAAA2QKNu2aUcztm2rbdu2bdu2bdu2bdu2EdvJzTvndH9BREwA/729+++f/yLPnMI4fR16TlnR+cS/8qk4c+MWRYab2DqE712nL5/8RcY6MRmowosZkDwnqH2TTUIm4zqZGz+bv4U8HEd7qF6BB0L1c5OsX2xgZN8UI6MUjTHJCB+MbR2bq+riYV+Hlmp6NhwMO3BVLKlz25YNS19eYPoooemWcXeDJ/DjpBjsalb66q5u0HpisyWFIbwLNQyOipRsyme0X+o3bub96+gy2GG+a4su6zVsvZ4D0TN3fUI7durqFbdzaFbPlUur7J+6d12H6OLU4fN7a0blh+SBKBzTo6HpZaAv/X6+gfD832Ti97RrtguwZi2KT9SoYh99K/yTt/87RRF2oROtQ7p89PH5qMiM8LMudSe8Dqr89le8krycXe86x2dbi8H90ouGq2jPoedw5PrcwSG5ukxR0JCos0FGFx+yf7bR6aF/t0iFDGUkHR6jfbJh3vqL6yTyLOXYR3Qvfrtged9UsSkcW4/owlYe9g1bnLzx9Ccm+YpU/9zXiwmIf/Vwy0f1Erld0gH0DjjzXeKHq2e5xDGFQB+Se94xt0wOlzhfcbnZ+XgqPzX78CasXZH8XEJycXC7cqTPhwQ6zq3tyZdJMkn1vwbxEO3ldv6O338i/+Q1OqPv/EEUVlA4ICYAAADQAgCdASogACAAPm00lkekIyIhKAgAgA2JaQAAPaOgAP77nMAAAA=="
                              alt="deposit-icon"
                            />
                            <span>
                              {" "}
                              {languageValue(
                                valueByLanguage,
                                LanguageKey.DEPOSIT,
                              )}{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {token ? (
              <div className="nav-right header-nav-rgt">
                {/**/}
                <ul className="exposer-user-h">
                  <li>
                    <a className="bal-exp">
                      <span>BAL</span>
                      <b>{data?.availBalance}</b>
                    </a>
                  </li>
                  <li>
                    <a to="/market-analysis" className="bal-exp exp-bal-show">
                      <span>EXP</span>
                      <b>{data?.deductedExposure}</b>
                    </a>
                  </li>
                  <li ref={ref}>
                    <div className="dropdown open-menu-btn">
                      <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="btn btn-secondary"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="text-capitalize">{user}</span>
                        <img
                          loading="lazy"
                          src="/icon/user-i.c4b01ab0.svg"
                          alt=""
                        />
                      </button>
                      {showDropdown && (
                        <Dropdown
                          setShowDropdown={setShowDropdown}
                          availBalance={data?.availBalance}
                          deductedExposure={data?.deductedExposure}
                        />
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="nav-right header-nav-rgt">
                <ul className="login-sign-btn-m">
                  <li>
                    {Settings.registration && (
                      <button
                        onClick={() => dispatch(setShowRegisterModal(true))}
                        to="#register-btn"
                        data-bs-toggle="modal"
                        className="cmn-btn12"
                      >
                        {languageValue(
                          valueByLanguage,
                          LanguageKey.REGISTER,
                        )}{" "}
                      </button>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(setShowLoginModal(true))}
                      to="#login-btn"
                      data-bs-toggle="modal"
                      className="cmn-btn12 login-btn-header"
                    >
                      {languageValue(valueByLanguage, LanguageKey.LOGIN)}{" "}
                    </button>
                  </li>
                </ul>
                {/**/}
              </div>
            )}
          </div>
        </div>
        {!location.pathname.includes("/casino/") && (
          <Fragment>
            <section className="nav-new-bar-sec">
              <NavMenu />
              <div className="mobile-toggle-btn-sec">
                <div className="mobile-search-menu">
                  <button
                    onClick={() => dispatch(setShowMobileSidebar(true))}
                    type="button"
                    data-bs-toggle="offcanvas"
                    to="#offcanvasExample11"
                    role="button"
                    aria-controls="offcanvasExample11"
                    aria-label="Toggle menu"
                  >
                    <span id="menu-toggle1" className="menu-toggle">
                      <img
                        loading="lazy"
                        src="data:image/webp;base64,UklGRt4CAABXRUJQVlA4WAoAAAAwAAAAPwAAPwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBInQAAAA1wVdu2sX1qogTO4h9n/JnsLh8T/Ery4XWPz3iJCIVt2zbsA1M5glmEl3gzhVrkYfAHHes6nmD5W5BZ3wXpCSjRa5Oi29mQxteiSE+on5MW8+D8UJ5AgGin7hudH/XlT4TupzvzI0G3Qzu1Jtke9bazWah+8aXxtShS5wc61XU8XqNN0/VbISgyEegG4frXJluLKoHr/ztRxSyniwEAVlA4IEoAAAAwBQCdASpAAEAAPl0kjUWjoiEb9AA4BcS0gAtuI6k+q/Og2fHPx653+rYgPOH76lvMAAD9Mf//5ezp/Kqx//t0EUZP///LkAAAAA=="
                        alt="Open menu"
                        className="group-toggle-icon"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </section>
            {latestEvent?.length > 0 && (
              <div data-v-97263362 className="livematch">
                <span className="lm_icon">
                  <img
                    style={{ height: "20px", width: "20px" }}
                    src="/icon/download.png"
                    className="img-fluid"
                  />
                </span>
                <div className="custom-marquee lm_datas">
                  <div
                    className="custom-marquee__track------"
                    // style={{ animationDuration: "4s" }}
                  >
                    <Marquee>
                      {latestEvent?.map((event) => {
                        return (
                          <div
                            key={event?.eventId}
                            className="latest-event-item"
                            style={{ marginRight: "20px" }}
                          >
                            <a
                              onClick={() =>
                                navigate(
                                  `/event-details/${event?.eventTypeId}/${event?.eventId}`,
                                )
                              }
                              className="new-launch-text"
                            >
                              <div>
                                <b tabIndex={0}>{event?.eventName}</b>
                              </div>
                            </a>
                          </div>
                        );
                      })}
                    </Marquee>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </header>
    </>
  );
};

export default Navbar;
