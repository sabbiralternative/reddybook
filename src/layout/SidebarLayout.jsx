import { useSelector } from "react-redux";
import LeftSidebar from "./LeftSidebar";

const SidebarLayout = ({ children }) => {
  const { headerHeight } = useSelector((state) => state.global);

  console.log(headerHeight);
  return (
    <section
      className=" main-body-container-sec"
      style={{ paddingTop: `${headerHeight + 5}px` }}
    >
      <div className="row g-0">
        <div className="col-0 col-sm-0 col-md-0 col-lg-2">
          <LeftSidebar />
        </div>
        {children}
      </div>
    </section>
  );
};

export default SidebarLayout;
