import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import LeftSidebar from "./LeftSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../api";
import images from "../assets/images";
import { useRef, useState } from "react";
import MiniGames from "../components/modals/MiniGames/MiniGames";
import useCloseModalClickOutside from "../hooks/closeModal";
import { setShowMobileSidebar } from "../redux/features/global/globalSlice";

const MainLayout = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [showMiniGamesModal, setShowMiniGamesModal] = useState(false);
  const { showMobileSidebar } = useSelector((state) => state.global);
  const handleNavigateToSocialLink = (link) => {
    window.open(link, "_blank");
  };

  useCloseModalClickOutside(ref, () => {
    dispatch(setShowMobileSidebar(false));
  });
  return (
    <div>
      {showMobileSidebar && (
        <div className="mobile-offcanvass">
          <div className="offcanvas offcanvas-start show" ref={ref}>
            <LeftSidebar />
          </div>
        </div>
      )}
      {showMiniGamesModal && (
        <MiniGames setShowMiniGamesModal={setShowMiniGamesModal} />
      )}
      <Navbar />
      <Outlet />
      {location.pathname === "/" && (
        <section className="help-and-support-box">
          <div className="support-sec">
            {Settings?.instagramLink && (
              <a
                onClick={() =>
                  handleNavigateToSocialLink(Settings?.instagramLink)
                }
                target="_blank"
              >
                <img
                  style={{ height: "50px", width: "50px" }}
                  loading="lazy"
                  src={images.instagram}
                  alt=""
                />
              </a>
            )}
            {Settings?.telegramLink && (
              <a
                onClick={() =>
                  handleNavigateToSocialLink(Settings?.telegramLink)
                }
                target="_blank"
              >
                <img
                  style={{ height: "50px", width: "50px" }}
                  loading="lazy"
                  src={images.telegram}
                  alt=""
                />
              </a>
            )}
            {(Settings?.branchWhatsapplink || Settings?.whatsapplink) && (
              <a
                onClick={() =>
                  handleNavigateToSocialLink(
                    Settings?.branchWhatsapplink || Settings?.whatsapplink,
                  )
                }
                target="_blank"
              >
                <img
                  style={{ height: "50px", width: "50px" }}
                  loading="lazy"
                  src="/icon/wp_support.2f4561c0.webp"
                  alt=""
                />
              </a>
            )}
            <a onClick={() => setShowMiniGamesModal(true)} target="_blank">
              <img
                style={{ height: "50px", width: "50px" }}
                loading="lazy"
                src="/icon/uv_games-CkYT1PYz.gif"
                alt=""
              />
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default MainLayout;
