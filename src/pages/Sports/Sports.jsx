import SportsEvents from "../../components/modules/Home/Sports";
import SidebarLayout from "../../layout/SidebarLayout";

const Sports = () => {
  return (
    <SidebarLayout>
      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
        <div>
          <div className>
            <div className="right-side-bar-main-sec">
              <div className="section-listing-page">
                <SportsEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Sports;
