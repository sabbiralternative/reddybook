import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
// import { useLanguage } from "../../../context/LanguageProvider";
import { useLogo } from "../../../context/ApiProvider";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { useForm } from "react-hook-form";
import { setUser } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useLanguage } from "../../../context/LanguageProvider";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";

const Login = () => {
  const { valueByLanguage } = useLanguage();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [tab, setTab] = useState(Settings.registration ? "mobile" : "userId");
  //   const { valueByLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const loginRef = useRef();
  useCloseModalClickOutside(loginRef, () => {
    dispatch(setShowLoginModal(false));
  });
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const loginData = {
      username: userName,
      password: password,
      b2c: Settings.b2c,
    };

    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        dispatch(setShowLoginModal(false));
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
        navigate("/");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const showRegister = () => {
    closeLoginModal();
    dispatch(setShowRegisterModal(true));
  };

  const showForgotPassword = () => {
    closeLoginModal();
    dispatch(setShowForgotPasswordModal(true));
  };
  return (
    <div data-v-39abe11c className="login-model-pop-up-sec main-login">
      <div
        data-v-39abe11c
        className="modal fade show"
        id="login-btn"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        style={{ display: "block", paddingLeft: "0px" }}
        aria-modal="true"
        role="dialog"
      >
        <div data-v-39abe11c className="modal-dialog modal-dialog-centered">
          <div data-v-39abe11c className="modal-content" ref={loginRef}>
            <button
              onClick={closeLoginModal}
              data-v-39abe11c
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ✖
            </button>
            <div data-v-39abe11c className="modal-body">
              <div data-v-39abe11c className="login-body-sec">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  data-v-39abe11c
                  className="login-body-lft"
                >
                  <div data-v-39abe11c className="login-flow-heading">
                    <div data-v-39abe11c className="web-logo">
                      <img
                        style={{
                          height: Settings.logoHeight,
                          width: Settings.logoWidth,
                          objectFit: "contain",
                        }}
                        data-v-39abe11c
                        src={logo}
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div data-v-39abe11c className="login-option-h">
                    <ul
                      data-v-39abe11c
                      className="nav nav-pills mb-3 login-type-tab"
                      id="pills-tab"
                      role="tablist"
                    >
                      {Settings.registration && (
                        <li
                          data-v-39abe11c
                          className="nav-item"
                          role="presentation"
                        >
                          <button
                            onClick={() => setTab("mobile")}
                            data-v-39abe11c
                            className={`nav-link phone-tab ${
                              tab === "mobile" ? "active" : ""
                            }`}
                            id="phone-login-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#phone-login"
                            type="button"
                            role="tab"
                            aria-controls="phone-login"
                            aria-selected="true"
                          >
                            Mobile Number
                          </button>
                        </li>
                      )}

                      <li
                        data-v-39abe11c
                        className="nav-item"
                        role="presentation"
                      >
                        <button
                          onClick={() => setTab("userId")}
                          data-v-39abe11c
                          className={`nav-link user-tab ${
                            tab === "userId" ? "active" : ""
                          }`}
                          id="user-login-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#user-login"
                          type="button"
                          role="tab"
                          aria-controls="user-login"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          User ID
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div
                    data-v-39abe11c
                    className="tab-content"
                    id="pills-tabContent"
                  >
                    <div
                      data-v-39abe11c
                      className={`tab-pane fade  ${
                        tab === "mobile" ? "show active" : ""
                      }`}
                      id="phone-login"
                      role="tabpanel"
                      aria-labelledby="phone-login-tab"
                    >
                      <div data-v-39abe11c className="input-wrap">
                        <div
                          data-v-39abe11c
                          className="contact-info-wrapper login-contact"
                        >
                          <div data-v-39abe11c className="select-country-code">
                            <div
                              data-v-39abe11c
                              className="country-code-flag-top-wrapper"
                            >
                              <div
                                data-v-39abe11c
                                className="country-code-flag-top-sec"
                              >
                                <img
                                  data-v-39abe11c
                                  loading="lazy"
                                  src="https://flagcdn.com/in.svg"
                                />{" "}
                                <span data-v-39abe11c>+91</span>
                                <i
                                  data-v-39abe11c
                                  className="fa-solid fa-caret-down"
                                />
                              </div>
                              <ul
                                data-v-39abe11c
                                className="country-code-flag-sec"
                              >
                                {/**/}
                                <li data-v-39abe11c>
                                  <img
                                    data-v-39abe11c
                                    loading="lazy"
                                    src="https://flagcdn.com/bd.svg"
                                  />{" "}
                                  <span data-v-39abe11c>+880</span>
                                </li>
                                <li data-v-39abe11c>
                                  <img
                                    data-v-39abe11c
                                    loading="lazy"
                                    src="https://flagcdn.com/ae.svg"
                                  />{" "}
                                  <span data-v-39abe11c>+971</span>
                                </li>
                                <li data-v-39abe11c>
                                  <img
                                    data-v-39abe11c
                                    loading="lazy"
                                    src="https://flagcdn.com/np.svg"
                                  />{" "}
                                  <span data-v-39abe11c>+977</span>
                                </li>
                                <li data-v-39abe11c>
                                  <img
                                    data-v-39abe11c
                                    loading="lazy"
                                    src="https://flagcdn.com/pk.svg"
                                  />{" "}
                                  <span data-v-39abe11c>+92</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div data-v-39abe11c className="input-left">
                            <input
                              data-v-39abe11c
                              type="tel"
                              placeholder="Enter Mobile Number*"
                              maxLength={10}
                              className="form-control"
                              onChange={(e) => setUserName(e.target.value)}
                              value={userName}
                              required={tab === "mobile"}
                            />
                          </div>
                        </div>
                        {/**/}
                        {/**/}
                      </div>
                      {/* <div data-v-39abe11c className="login-method-section">
                        <div data-v-39abe11c className="login-option">
                          <input
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required={tab === "mobile"}
                            data-v-39abe11c
                            className="form-check-input flexRadioDefault-sec"
                            type="radio"
                            name="login-method"
                            id="login-password"
                            defaultValue="password"
                          />
                          <label
                            data-v-39abe11c
                            htmlFor="login-password"
                            className="ps-1 text-white"
                          >
                            Password
                          </label>
                        </div>
                        <div data-v-39abe11c className="login-option">
                          <input
                            data-v-39abe11c
                            className="form-check-input flexRadioDefault-sec"
                            type="radio"
                            name="login-method"
                            id="login-otp"
                            defaultValue="otp"
                          />
                          <label
                            data-v-39abe11c
                            htmlFor="login-otp"
                            className="ps-1 text-white"
                          >
                            OTP
                          </label>
                        </div>
                      </div> */}
                      <div data-v-39abe11c className="input-wrap">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required={tab === "mobile"}
                          data-v-39abe11c
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password*"
                          className="form-control password-input"
                        />
                        {/**/}
                        {/**/}
                        <div
                          onClick={() => setShowPassword((prev) => !prev)}
                          data-v-39abe11c
                          className="showHide-pass"
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="/icon/eye.caf8dd05.svg"
                              alt=""
                            />
                          ) : (
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="/icon/eye-slash.2aa08859.svg"
                              alt=""
                            />
                          )}
                        </div>
                        {/**/}
                        {/**/}
                        {/**/}
                      </div>
                    </div>
                    <div
                      data-v-39abe11c
                      className={`tab-pane fade ${
                        tab === "userId" ? "show active" : ""
                      }`}
                      id="user-login"
                      role="tabpanel"
                      aria-labelledby="user-login-tab"
                    >
                      <div data-v-39abe11c className="input-wrap">
                        <div data-v-39abe11c className="row">
                          <div
                            data-v-39abe11c
                            className="col-12 col-sm-12 col-md-12"
                          >
                            <div data-v-39abe11c className="input-left">
                              <input
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                required={tab === "userId"}
                                data-v-39abe11c
                                type="text"
                                className="form-control password-input"
                                placeholder="Enter User ID"
                              />
                              <i data-v-39abe11c className="fa-solid fa-user" />
                            </div>
                          </div>
                          {/**/}
                        </div>
                      </div>
                      <div data-v-39abe11c className="input-wrap">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required={tab === "userId"}
                          data-v-39abe11c
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password*"
                          className="form-control password-input"
                        />
                        <div
                          onClick={() => setShowPassword((prev) => !prev)}
                          data-v-39abe11c
                          className="showHide-pass"
                        >
                          {showPassword ? (
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="/icon/eye.caf8dd05.svg"
                              alt=""
                            />
                          ) : (
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="/icon/eye-slash.2aa08859.svg"
                              alt=""
                            />
                          )}
                        </div>
                        {/**/}
                      </div>
                    </div>
                  </div>
                  <div data-v-39abe11c action>
                    <div data-v-39abe11c className="input-wrap box-right">
                      <a
                        data-v-39abe11c
                        onClick={showForgotPassword}
                        data-bs-toggle="modal"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div data-v-39abe11c className="login-cmn-btn">
                      <button
                        onClick={loginWithDemo}
                        data-v-39abe11c
                        type="button"
                      >
                        <span data-v-39abe11c>Login with Demo ID</span>
                        {/**/}
                      </button>
                      <button data-v-39abe11c type="submit">
                        <span data-v-39abe11c>
                          {" "}
                          {languageValue(
                            valueByLanguage,
                            LanguageKey.LOGIN,
                          )}{" "}
                        </span>
                        {/**/}
                      </button>
                    </div>
                    <div data-v-39abe11c className="download-btnWrap">
                      <a data-v-39abe11c className="downloadApp-btn">
                        <span data-v-39abe11c>Download APK</span>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-v-39abe11c
                        >
                          <path
                            d="M13.102 2.42459L14.364 0.555334C14.4737 0.392912 14.4305 0.170334 14.2681 0.0606463C14.1057 -0.0490022 13.8831 -0.00579907 13.7735 0.156584L12.4701 2.08713C11.7174 1.74365 10.881 1.55225 9.99994 1.55225C9.11896 1.55225 8.28248 1.74365 7.52986 2.08717L6.22642 0.156584C6.11677 -0.00579907 5.89416 -0.0490022 5.73177 0.0606463C5.56935 0.170334 5.52619 0.392873 5.63584 0.555334L6.89787 2.42459C5.31341 3.3933 4.2156 5.08022 4.06162 7.03303H15.9383C15.7843 5.08022 14.6865 3.39338 13.102 2.42459ZM7.57615 5.23401C7.11701 5.23401 6.74478 4.86182 6.74478 4.40264C6.74478 3.94346 7.11701 3.57127 7.57615 3.57127C8.03529 3.57127 8.40751 3.94346 8.40751 4.40264C8.40751 4.86182 8.03529 5.23401 7.57615 5.23401ZM12.4238 5.23401C11.9646 5.23401 11.5924 4.86182 11.5924 4.40264C11.5924 3.94346 11.9646 3.57127 12.4238 3.57127C12.8829 3.57127 13.2551 3.94346 13.2551 4.40264C13.2551 4.86182 12.8829 5.23401 12.4238 5.23401Z"
                            fill="currentColor"
                            data-v-39abe11c
                          />
                          <path
                            d="M3.97076 16.4073C3.97076 16.9465 4.41138 17.3871 4.9506 17.3871H6.5706V18.9905C6.5706 19.5451 7.02431 20 7.58013 20C8.13474 20 8.58966 19.5451 8.58966 18.9905V17.3871H11.4401V18.9905C11.4401 19.5451 11.8938 20 12.4496 20C13.0043 20 13.4592 19.5451 13.4592 18.9905V17.3871H14.8677C15.4058 17.3871 15.8476 16.9465 15.8476 16.4073V8.08443H3.97076V16.4073Z"
                            fill="currentColor"
                            data-v-39abe11c
                          />
                          <path
                            d="M1.82611 8.08443C1.18447 8.08443 0.659546 8.60936 0.659546 9.251V13.0938C0.659546 13.7354 1.18451 14.2603 1.82611 14.2603C2.46771 14.2603 2.99267 13.7354 2.99267 13.0938V9.251C2.99267 8.6094 2.46771 8.08443 1.82611 8.08443Z"
                            fill="currentColor"
                            data-v-39abe11c
                          />
                          <path
                            d="M18.1738 8.08443C17.5322 8.08443 17.0072 8.60936 17.0072 9.251V13.0938C17.0072 13.7354 17.5322 14.2603 18.1738 14.2603C18.8154 14.2603 19.3404 13.7354 19.3404 13.0938V9.251C19.3403 8.6094 18.8154 8.08443 18.1738 8.08443Z"
                            fill="currentColor"
                            data-v-39abe11c
                          />
                        </svg>
                      </a>
                    </div>
                    {/**/}
                    <div data-v-39abe11c className="logon-option">
                      <div data-v-39abe11c className="or-login-with">
                        or Login with
                      </div>
                      <ul data-v-39abe11c className="submenu social-icons mb-2">
                        <li data-v-39abe11c>
                          <a
                            data-v-39abe11c
                            target="_blank"
                            rel="noopener"
                            className="facebook"
                          >
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="data:image/webp;base64,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"
                              alt="facebook icon"
                            />
                          </a>
                        </li>
                        <li data-v-39abe11c>
                          <a
                            data-v-39abe11c
                            target="_blank"
                            rel="noopener"
                            className="twitter"
                          >
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="data:image/webp;base64,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"
                              alt="instagram icon"
                            />
                          </a>
                        </li>
                        <li data-v-39abe11c>
                          <a data-v-39abe11c target="_blank" className="email">
                            <img
                              data-v-39abe11c
                              loading="lazy"
                              src="data:image/webp;base64,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"
                              alt="telegram icon"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p data-v-39abe11c className="forpass-in">
                      {"Don't"} have an account ?{" "}
                      <a
                        data-v-39abe11c
                        onClick={showRegister}
                        data-bs-toggle="modal"
                      >
                        Register
                      </a>
                    </p>
                  </div>
                </form>
                <div className="login-body-rgt" data-v-39abe11c>
                  <div className="banner-side-img-sec" data-v-39abe11c>
                    <div className="slider-model-pic" data-v-39abe11c>
                      <div className="slider-model-pic" data-v-39abe11c>
                        <img
                          loading="lazy"
                          src="/icon/sl-lc-one-layer-two.f2ba0287.webp"
                          alt="one-layer"
                          data-v-39abe11c
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
