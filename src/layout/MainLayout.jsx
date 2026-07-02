import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import LeftSidebar from "./LeftSidebar";
import { useSelector } from "react-redux";
import { Settings } from "../api";

const MainLayout = () => {
  const { showMobileSidebar } = useSelector((state) => state.global);
  const handleNavigateToSocialLink = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div>
      {showMobileSidebar && (
        <div className="mobile-offcanvass">
          <div className="offcanvas offcanvas-start show">
            <LeftSidebar />
          </div>
        </div>
      )}

      <Navbar />
      <Outlet />
      {(location.pathname === "/" && Settings?.branchWhatsapplink) ||
        (Settings?.whatsapplink && (
          <section className="help-and-support-box">
            <div className="support-sec">
              <a
                onClick={() =>
                  handleNavigateToSocialLink(
                    Settings?.branchWhatsapplink || Settings?.whatsapplink,
                  )
                }
                target="_blank"
              >
                <img
                  loading="lazy"
                  src="/icon/wp_support.2f4561c0.webp"
                  alt=""
                />
              </a>
            </div>
          </section>
        ))}
    </div>
  );
};

export default MainLayout;
