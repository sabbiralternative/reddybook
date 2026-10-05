import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import { useLogo } from "../../../context/ApiProvider";
import { useDispatch } from "react-redux";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { setShowChangePasswordModal } from "../../../redux/features/global/globalSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const ChangePassword = () => {
  const { getLanguage } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleChangePassword] = useChangePasswordMutation();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    const payload = {
      ...data,
    };

    const res = await handleChangePassword(payload).unwrap();
    if (res.success) {
      localStorage.removeItem("changePassword");
      toast.success(res?.result?.message);
      navigate("/");
      dispatch(setShowChangePasswordModal(false));
    } else {
      toast.error(res?.error?.errorMessage);
    }
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
          <div data-v-39abe11c className="modal-content">
            {/* <button
       
              data-v-39abe11c
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ✖
            </button> */}
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
                          height: Settings.logo_height,
                          width: Settings.logo_width,
                          objectFit: "contain",
                        }}
                        data-v-39abe11c
                        src={logo}
                        alt="logo"
                      />
                    </div>
                  </div>

                  <div
                    data-v-39abe11c
                    className="tab-content"
                    id="pills-tabContent"
                  >
                    <div
                      data-v-39abe11c
                      className={`tab-pane fade  show active`}
                      id="phone-login"
                      role="tabpanel"
                      aria-labelledby="phone-login-tab"
                    >
                      <div data-v-39abe11c className="input-wrap">
                        <input
                          {...register("oldPassword", {
                            required: true,
                          })}
                          data-v-39abe11c
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password*"
                          className="form-control password-input"
                        />

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
                      </div>
                      <div data-v-39abe11c className="input-wrap">
                        <input
                          {...register("password", {
                            required: true,
                          })}
                          data-v-39abe11c
                          type={showNewPass ? "text" : "password"}
                          placeholder="Enter New Password*"
                          className="form-control password-input"
                        />

                        <div
                          onClick={() => setShowNewPass((prev) => !prev)}
                          data-v-39abe11c
                          className="showHide-pass"
                          style={{ cursor: "pointer" }}
                        >
                          {showNewPass ? (
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
                      </div>
                      <div data-v-39abe11c className="input-wrap">
                        <input
                          {...register("passVerify", {
                            required: true,
                          })}
                          data-v-39abe11c
                          type={showConfirmPass ? "text" : "password"}
                          placeholder="Enter Confirm Password*"
                          className="form-control password-input"
                        />

                        <div
                          onClick={() => setShowConfirmPass((prev) => !prev)}
                          data-v-39abe11c
                          className="showHide-pass"
                          style={{ cursor: "pointer" }}
                        >
                          {showConfirmPass ? (
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
                      </div>
                    </div>
                  </div>
                  <div data-v-39abe11c action>
                    <div data-v-39abe11c className="login-cmn-btn">
                      <button data-v-39abe11c type="submit">
                        <span data-v-39abe11c>
                          {" "}
                          {getLanguage(LanguageKey.CHANGE_PASSWORD)}{" "}
                        </span>
                      </button>
                    </div>
                    <div data-v-39abe11c className="download-btnWrap">
                      <a data-v-39abe11c className="downloadApp-btn">
                        <span data-v-39abe11c>
                          {getLanguage(LanguageKey.DOWNLOAD_APK)}
                        </span>
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

export default ChangePassword;
