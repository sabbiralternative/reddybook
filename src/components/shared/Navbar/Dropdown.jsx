import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import { useLanguage } from "../../../context/LanguageProvider";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";

const Dropdown = ({ availBalance, deductedExposure, setShowDropdown }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const { valueByLanguage } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleNavigate = (link) => {
    navigate(link);
    setShowDropdown(false);
  };

  const handleOpenSocialLink = (link) => {
    if (link) {
      window.open(link, "_blank");
      setShowDropdown(false);
    }
  };

  const handleDownloadAPK = (e) => {
    e.preventDefault();
    if (Settings.apk_link) {
      const fileUrl = Settings.apk_link;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "site.apk");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };
  return (
    <ul
      style={{
        position: "absolute",
        inset: "0px 0px auto auto",
        margin: "0px",
        transform: "translate3d(0.833333px, 26.6667px, 0px)",
      }}
      className="dropdown-menu show"
      aria-labelledby="dropdownMenuButton1"
    >
      <li className="mobile-num">
        <span className="text-capitalize">Hi, {user}</span>
        <img
          onClick={() => {
            handleCopyToClipBoard(user);
          }}
          className="copy_profile_txt"
          loading="lazy"
          src="/icon/copy_icon.739acd4c.svg"
          alt=""
          srcSet
        />
      </li>
      <div className="right-side-menu-scrollbar">
        {/* <div className="setting-user-checkbox">
          <div className="user-details-r">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              One Click Bet
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                id="flexSwitchCheckDefault"
                type="checkbox"
              />
            </div>
            <div className="one-bet-click-value"></div>
          </div>
          <a
            data-bs-toggle="modal"
            data-bs-target="#clickBetValues"
            style={{ display: "none" }}
          />
        </div> */}
        <li className="menu-rgt-icons">
          <div className="balance-row">
            <div className="balance-text-left">
              Wallet Amount <small>(Inclusive bonus)</small>
            </div>
            <div className="balance-price">{availBalance}</div>
          </div>
          <div className="balance-row">
            <div className="balance-text-left">Net Exposure</div>
            <div className="balance-price">{deductedExposure}</div>
          </div>
        </li>
        <li className="bonus-information-bx">
          <div
            className="credits-chackn-box"
            data-bs-toggle="modal"
            data-bs-target="#informationModal"
          >
            <div className="menu-details-heading">
              <h4>Bonus Information</h4>
              <span className="information-icon">
                <a href="#">
                  <img
                    loading="lazy"
                    src="/icon/info-icon.b941c24d.svg"
                    alt="info-icon"
                  />
                </a>
              </span>
            </div>
          </div>
          <div className="bonus-sec">
            <div className="credits-chackn-box">
              <div className="menu-details-heading">
                <h4>Earned Bonus</h4>
                <span className="ml-2" />
              </div>
            </div>
            <div className="credits-chackn-box">
              <div className="menu-details-heading credits-bonus-list">
                <div className="locked-bonus-dflex">
                  <button className="btn locked-bonus-btn">Locked Bonus</button>
                </div>
                <span className="ml-2" />
              </div>
            </div>
            <div className="credits-chackn-box">
              <div className="menu-details-heading">
                <h4>Welcome Bonus</h4>
                <span />
              </div>
            </div>
            <div className="credits-chackn-box border-0">
              <div className="menu-details-heading">
                <h4>Play with Bonus</h4>
              </div>
              <div className="menu-heading-con">
                <div className="form-check form-switch m-0 p-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="settingCheckDefaults"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
        {Settings?.branchWhatsapplink && (
          <li className="menu-rgt-icons">
            <a
              onClick={() => handleOpenSocialLink(Settings?.branchWhatsapplink)}
              className="dropdown-item"
            >
              <i className="bi bi-people" />
              <span className="menu-rgt-text"> Customer Support</span>
            </a>
          </li>
        )}

        <li className="menu-rgt-icons">
          <Link
            to="/deposit"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text">
              {" "}
              {languageValue(valueByLanguage, LanguageKey.DEPOSIT)}
            </span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/withdraw"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-bar-chart-steps" />
            <span className="menu-rgt-text">
              {" "}
              {languageValue(valueByLanguage, LanguageKey.WITHDRAW)}
            </span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/deposit-report"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-bar-chart-steps" />
            <span className="menu-rgt-text"> Deposit Report</span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/withdraw-report"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text"> Withdraw Report</span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/open-bets"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-file-text" />
            <span className="menu-rgt-text"> Open Bets</span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/betting-profit-loss"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-bar-chart" />
            <span className="menu-rgt-text"> Betting Profit & Loss</span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/my-bank-details"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text">
              {" "}
              {languageValue(valueByLanguage, LanguageKey.MY_BANK_DETAILS)}
            </span>
          </Link>
        </li>
        {Settings?.referral && (
          <li className="menu-rgt-icons">
            <Link
              to="/affiliate"
              onClick={() => setShowDropdown(false)}
              className="dropdown-item"
            >
              <i className="bi bi-people" />
              <span className="menu-rgt-text"> Affiliate</span>
            </Link>
          </li>
        )}
        <li className="menu-rgt-icons">
          <Link
            to="/promotions"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text"> Promotions</span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/bonus-statement"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text">
              {" "}
              {languageValue(valueByLanguage, LanguageKey.BONUS_STATEMENT)}
            </span>
          </Link>
        </li>
        <li className="menu-rgt-icons">
          <Link
            to="/lossback-bonus"
            onClick={() => setShowDropdown(false)}
            className="dropdown-item"
          >
            <i className="bi bi-people" />
            <span className="menu-rgt-text"> Lossback Bonus</span>
          </Link>
        </li>
        {closePopupForForever && (
          <li className="menu-rgt-icons">
            <Link
              to="/app-only-bonus"
              onClick={() => setShowDropdown(false)}
              className="dropdown-item"
            >
              <i className="bi bi-people" />
              <span className="menu-rgt-text"> App Only Bonus</span>
            </Link>
          </li>
        )}

        <li className="menu-rgt-icons">
          <a
            onClick={() => handleNavigate("/profile/overview")}
            className="dropdown-item"
          >
            <i className="bi bi-person" />
            <span className="menu-rgt-text">My Profile</span>
          </a>
        </li>

        <li className="menu-rgt-icons">
          <a
            onClick={() => handleNavigate("/profile/stake-setting")}
            className="dropdown-item"
          >
            <i className="bi bi-bullseye" />
            <span className="menu-rgt-text">Stake Settings</span>
          </a>
        </li>

        <li className="menu-rgt-icons">
          <a data-bs-toggle="modal" data-bs-target="#language_selection_pop_up">
            <i className="bi bi-globe" />
            <span className="menu-rgt-text">Language</span>
          </a>
        </li>
        <li className="menu-rgt-icons">
          <a
            onClick={() => handleNavigate("/profile/change-password")}
            className="dropdown-item"
          >
            <i className="bi bi-lock" />
            <span className="menu-rgt-text">Change Password</span>
          </a>
        </li>
        {Settings.apk_link && (
          <li className="menu-rgt-icons">
            <a onClick={handleDownloadAPK} className="dropdown-item">
              <i className="bi bi-people" />
              <span className="menu-rgt-text"> Download APK</span>
            </a>
          </li>
        )}
      </div>
      <li onClick={handleLogout} className="menu-rgt-icons">
        <a className="dropdown-item signout-btn">
          <i className="bi bi-box-arrow-right" />
          <span className="menu-rgt-text">Sign Out</span>
        </a>
      </li>
    </ul>
  );
};

export default Dropdown;
