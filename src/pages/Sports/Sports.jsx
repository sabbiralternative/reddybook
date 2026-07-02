import { useParams } from "react-router-dom";
import SportsEvents from "../../components/modules/Home/Sports";
import SidebarLayout from "../../layout/SidebarLayout";
import HorseGreyhound from "../../components/modules/Home/HorseGreyhound";

const Sports = () => {
  const { id } = useParams();
  return (
    <SidebarLayout>
      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
        <div>
          <div className>
            <div className="right-side-bar-main-sec">
              <div className="section-listing-page">
                {(id === "7" || id === "4339") && <HorseGreyhound />}
                {id !== "7" && id !== "4339" && <SportsEvents />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Sports;
