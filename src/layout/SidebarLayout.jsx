import LeftSidebar from "./LeftSidebar";

const SidebarLayout = ({ children }) => {
  return (
    <section className="padding-top-101 main-body-container-sec">
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
