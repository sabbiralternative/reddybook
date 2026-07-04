import CasinoProvider from "../../components/modules/Home/CasinoProvider";
import CasinoSlider from "../../components/modules/Home/CasinoSlider";
import NewCasinoSlider from "../../components/modules/Home/NewCasinoSlider";
import Sports from "../../components/modules/Home/Sports";
import Upcoming from "../../components/modules/Home/Upcoming";
import { useIndexQuery } from "../../hooks";
import SidebarLayout from "../../layout/SidebarLayout";

const Home = () => {
  const { data } = useIndexQuery({
    type: "99_casino_dashboard",
  });
  return (
    <SidebarLayout>
      <div className="col-12 col-sm-12 col-md-12 col-lg-10 ">
        <div>
          <div className>
            <div className="right-side-bar-main-sec">
              <div className="section-listing-page">
                <CasinoSlider highlight_casino={data?.highlight_casino} />
                <NewCasinoSlider data={data?.new_launch} title="New Launch" />
                <Sports />

                <div id="casinosection" />
                <CasinoProvider our_provider={data?.our_provider} />
                <div />
                <Upcoming />
                {/* <section className="upcoming-section">
                  <div className="bet-details-header">
                    <div className="row">
                      <div className="col-12">
                        <div className="upcomingmatch-title">
                          <img
                            loading="lazy"
                            src="data:image/png;base64,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"
                            alt="menu-upcoming"
                          />
                          <span>Upcoming Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Sports />
                </section> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Home;
