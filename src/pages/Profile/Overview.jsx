import { useSelector } from "react-redux";

import { Settings } from "../../api";
import ProfileLayout from "../../layout/ProfileLayout";
import useBalance from "../../hooks/balance";

const Overview = () => {
  const { user, memberId } = useSelector((state) => state.auth);
  const { data } = useBalance();

  return (
    <ProfileLayout>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-overview"
          role="tabpanel"
          aria-labelledby="pills-overview-tab"
        >
          <div className="overview-details-page">
            <span>
              Welcome to {Settings.siteTitle}, <b>{user}</b>
            </span>
            <div className="user-over-view">
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-3">
                  <div className="user-lft-side">
                    <span className="user-side-text">User Id</span>
                    <span className="right-colons">:</span>
                  </div>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-9">
                  <div className="user-rgt-side">
                    <span className="user-side-text">{memberId}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-3">
                  <div className="user-lft-side">
                    <span className="user-side-text">Available Chips</span>
                    <span className="right-colons">:</span>
                  </div>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-9">
                  <div className="user-rgt-side">
                    <span className="user-side-text text-green">0</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-3">
                  <div className="user-lft-side">
                    <span className="user-side-text">Exposure</span>
                    <span className="right-colons">:</span>
                  </div>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-9">
                  <div className="user-rgt-side">
                    <span className="user-side-text text-danger">
                      {data?.deductedExposure}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-3">
                  <div className="user-lft-side">
                    <span className="user-side-text">Total Chips</span>
                    <span className="right-colons">:</span>
                  </div>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-9">
                  <div className="user-rgt-side">
                    <span className="user-side-text text-green">
                      {data?.availBalance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-3">
                  <div className="user-lft-side">
                    <span className="user-side-text">Profit/Loss</span>
                    <span className="right-colons">:</span>
                  </div>
                </div>
                <div className="col-8 col-sm-8 col-md-8 col-lg-9">
                  <div className="user-rgt-side">
                    <span className="user-side-text text-danger">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Overview;
