import { useSelector } from "react-redux";
import SidebarLayout from "./SidebarLayout";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div>
      <SidebarLayout>
        <div className="col-12 col-sm-12 col-md-12 col-lg-10">
          <div>
            <div className="right-side-bar-main-sec">
              <div className="profile-container-sec">
                <div className="profile-head">
                  <span>PROFILE</span>
                </div>
                <div className="profile-main-body-sec">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                      <div className="profile-lft-card-body">
                        <img
                          loading="lazy"
                          src="/icon/profile_image.04d2a560.webp"
                          alt="profile_image"
                        />
                        <h2>{user}</h2>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                      <div className="profile-rgt-card-body">
                        <div className="profile-tab-list">
                          <ul
                            className="nav nav-pills"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() => navigate("/profile/overview")}
                                className={`nav-link ${
                                  pathname === "/profile/overview"
                                    ? "active"
                                    : ""
                                }`}
                                id="pills-overview-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-overview"
                                type="button"
                                role="tab"
                                aria-controls="pills-overview"
                                aria-selected="true"
                              >
                                Overview
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() =>
                                  navigate("/profile/stake-setting")
                                }
                                className={`nav-link ${
                                  pathname === "/profile/stake-setting"
                                    ? "active"
                                    : ""
                                }`}
                                id="pills-stake-setting-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-stake-setting"
                                type="button"
                                role="tab"
                                aria-controls="pills-stake-setting"
                                aria-selected="false"
                                tabIndex={-1}
                              >
                                STAKE SETTINGS
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() =>
                                  navigate("/profile/change-password")
                                }
                                className={`nav-link ${
                                  pathname === "/profile/change-password"
                                    ? "active"
                                    : ""
                                }`}
                                id="pills-change-pass-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-change-pass"
                                type="button"
                                role="tab"
                                aria-controls="pills-change-pass"
                                aria-selected="false"
                                tabIndex={-1}
                              >
                                Change Password
                              </button>
                            </li>
                          </ul>
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default ProfileLayout;
