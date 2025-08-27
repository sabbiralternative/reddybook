import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { useLogo } from "../../../context/ApiProvider";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { setUser } from "../../../redux/features/auth/authSlice";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [handleRegister] = useRegisterMutation();
  const referralCode = localStorage.getItem("referralCode");
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});

  const registerRef = useRef();
  useCloseModalClickOutside(registerRef, () => {
    closeModal();
  });

  const closeModal = () => {
    dispatch(setShowForgotPasswordModal(false));
  };

  const showLogin = () => {
    closeModal();
    dispatch(setShowLoginModal(true));
  };

  const getOtp = async () => {
    /* Get Otp based on settings*/
    if (Settings.otp) {
      const otpData = {
        mobile: mobile,
      };

      const res = await AxiosSecure.post(API.otp, otpData);
      const data = res.data;
      if (data?.success) {
        setOTP({
          orderId: data?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(data?.result?.message);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    }
  };

  const showRegister = () => {
    closeModal();
    dispatch(setShowRegisterModal(true));
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  // const handleGetOtpOnWhatsapp = async () => {
  //   await handleGetOtpOnWhatsapp(mobile, setOTP);
  // };

  const onSubmit = async (data) => {
    const registerData = {
      username: "",
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();

    if (result.success) {
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const memberId = result?.result?.memberId;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;
      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      localStorage.setItem("token", token);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowRegisterModal(false));
        toast.success("Register successful");
        navigate("/dashboard");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

  return (
    <div className="login-model-pop-up-sec forgot-main">
      <div
        className="modal fade show"
        id="forget-password-btn"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" ref={registerRef}>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ✖
            </button>
            <div className="modal-body">
              <div className="login-body-sec">
                <div className="login-body-lft">
                  <div className="forget-login">
                    <div className="login-now">
                      <div className="login-flow-heading">
                        <div className="web-logo">
                          <img
                            style={{
                              height: Settings.logoHeight,
                              width: Settings.logoWidth,
                              objectFit: "contain",
                            }}
                            src={logo}
                            alt="logo"
                          />
                        </div>
                      </div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="register_form"
                      >
                        <input type="hidden" name="_token" id="csrf-token" />
                        <div className="number-var mak-gin sign-up-body">
                          <div className="input-wrap sign-up-row">
                            <div className="contact-info-wrapper">
                              <div className="country-code-flag-top-wrapper">
                                <div className="country-code-flag-top-sec">
                                  <img
                                    loading="lazy"
                                    src="https://flagcdn.com/in.svg"
                                  />{" "}
                                  <span>+91</span>
                                  <i className="fa-solid fa-caret-down" />
                                </div>
                                <ul className="country-code-flag-sec">
                                  <li>
                                    <img
                                      loading="lazy"
                                      src="https://flagcdn.com/bd.svg"
                                    />{" "}
                                    <span>+880</span>
                                  </li>
                                  <li>
                                    <img
                                      loading="lazy"
                                      src="https://flagcdn.com/ae.svg"
                                    />{" "}
                                    <span>+971</span>
                                  </li>
                                  <li>
                                    <img
                                      loading="lazy"
                                      src="https://flagcdn.com/np.svg"
                                    />{" "}
                                    <span>+977</span>
                                  </li>
                                  <li>
                                    <img
                                      loading="lazy"
                                      src="https://flagcdn.com/pk.svg"
                                    />{" "}
                                    <span>+92</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="input-left">
                                <input
                                  onChange={(e) => handleMobileNo(e)}
                                  value={mobile}
                                  type="tel"
                                  maxLength={10}
                                  className="form-control"
                                  id="phone"
                                  placeholder="Enter Mobile Number*"
                                />
                              </div>
                              <button
                                disabled={Settings.otp && mobile?.length < 10}
                                onClick={getOtp}
                                type="button"
                                id="otp-btn"
                                className="thm-btn otp-btn get-otp-btn send_otp_btn"
                              >
                                <span>Get OTP</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mak-gin password-inpt">
                          <input
                            {...register("otp", { required: true })}
                            type="text"
                            className="form-control toggle-password"
                            maxLength={20}
                            id="fpassword"
                            placeholder="Enter OTP"
                          />
                        </div>
                        <div className="mak-gin password-inpt">
                          <input
                            {...register("password", { required: true })}
                            type={showPassword ? "text" : "password"}
                            className="form-control toggle-password"
                            name="password"
                            maxLength={20}
                            id="fpassword"
                            placeholder="Enter Password*"
                            aria-describedby="password"
                          />
                          <div
                            onClick={() => setShowPassword((prev) => !prev)}
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
                        <div className="mak-gin password-inpt">
                          <input
                            {...register("confirmPassword", { required: true })}
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control toggle-password"
                            maxLength={20}
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Enter Confirm Password*"
                            aria-describedby="password"
                          />
                          <div
                            style={{ cursor: "pointer" }}
                            className="showHide-pass"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
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
                        <input
                          type="hidden"
                          id="isDownLine"
                          name="isDownLine"
                        />
                        <button
                          type="submit"
                          className="btn thm-but main-btn"
                          id="submitBtn"
                        >
                          <span>Update Password</span>
                        </button>
                        <p className="forpass-in">
                          Remember your password?
                          <a onClick={showLogin} data-bs-toggle="modal">
                            Login
                          </a>
                        </p>
                        <div className="create-new-acc">
                          <a
                            style={{ color: "white" }}
                            onClick={showRegister}
                            data-bs-toggle="modal"
                          >
                            Create New Account
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="login-body-rgt">
                  <div className="banner-side-img-sec">
                    <div className="slider-model-pic">
                      <div className="slider-model-pic">
                        <img
                          loading="lazy"
                          src="/icon/sl-lc-one-layer-two.f2ba0287.webp"
                          alt="sl-lc-one-layer-two"
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

export default ForgotPassword;
