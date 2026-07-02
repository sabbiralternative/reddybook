import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import LeftSidebar from "./LeftSidebar";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { showMobileSidebar } = useSelector((state) => state.global);

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
      <section className="help-and-support-box">
        <div className="support-sec">
          <a href="https://wa.me/null" target="_blank">
            <img loading="lazy" src="/icon/wp_support.2f4561c0.webp" alt="" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MainLayout;
