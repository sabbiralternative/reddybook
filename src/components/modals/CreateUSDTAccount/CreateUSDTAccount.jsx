import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useBankAccountMutation } from "../../../redux/features/deposit/event.api";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API, Settings } from "../../../api";

const CreateUSDTAccount = ({ refetchBankAccounts, setShowUSDTModal }) => {
  const addUSDTRef = useRef();
  const [addNewUSDTAccount] = useBankAccountMutation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [usdtDetails, setUsdtDetails] = useState({
    otp: "",
    usdt_type: "",
    wallet_address: "",
  });
  const [mobile, setMobile] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);

  useCloseModalClickOutside(addUSDTRef, () => {
    setShowUSDTModal(false);
  });

  const handleAddUSDTAccount = async (e) => {
    e.preventDefault();

    if (mobile && !usdtDetails.otp) {
      return toast.error("Please enter otp to add new account");
    }

    let payload = {
      wallet_address: usdtDetails.wallet_address,
      usdt_type: usdtDetails.usdt_type,
      type: "addUSDTAccount",
    };
    if (mobile) {
      payload.mobile = mobile;
      payload.otp = usdtDetails.otp;
      payload.orderId = orderId;
    }

    const res = await addNewUSDTAccount(payload).unwrap();

    if (res?.success) {
      setUsdtDetails({
        otp: "",
        usdt_type: "",
        wallet_address: "",
      });
      toast.success(res?.result?.message);
      setShowUSDTModal(false);
      refetchBankAccounts();
    } else {
      toast.error(res?.result?.message);
    }
  };

  const validateForm = (bankDetails) => {
    const isUSDTTypeFilled = bankDetails.usdt_type.trim() !== "";
    const isWalletAddressFilled = bankDetails.wallet_address.trim() !== "";
    const isOTPFilled = mobile ? bankDetails.otp.trim() !== "" : true;
    const isFormValid =
      isUSDTTypeFilled && isWalletAddressFilled && isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(usdtDetails);
  }, [usdtDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);
      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  return (
    <div
      id="popup-modal"
      className="z-[1000] absolute top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={addUSDTRef}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-bg_Quaternary p-2 xs:p-5 rounded-md"
      >
        <h2 className="mb-5 text-base md:text-xl font-medium">
          Add New USDT Account
        </h2>
        <div
          onClick={() => setShowUSDTModal(false)}
          className="transition-all mb-2 ease-in-out duration-200 hover:scale-105 absolute -top-3 -right-3"
        >
          <svg
            className="cursor-pointer z-50"
            height="24"
            width="24"
            fill="var(--color-quaternary)"
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="circle-xmark"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g className="fa-duotone-group">
              <path
                fill="currentColor"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              ></path>
              <path
                fill="white"
                d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="flex gap-10 items-start h-[95%] lg:h-auto w-full">
          <div
            title="mobileLogin"
            className="flex flex-col items-start gap-y-4 w-full"
          >
            <form
              onSubmit={handleAddUSDTAccount}
              className="w-full gap-y-4 flex flex-col"
            >
              <div className="flex flex-col gap-1">
                <div title="passwordInput" className="w-full  uppercase">
                  <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                    USDT Type
                  </div>
                  <div className="flex w-full items-center gap-x-3 py-2 px-2 bg-auth rounded-lg border">
                    <div className="flex items-center gap-x-2">
                      <p>BEP20</p>
                      <input
                        name="usdt-type"
                        onChange={(e) => {
                          setUsdtDetails({
                            ...usdtDetails,
                            usdt_type: e.target.value,
                          });
                        }}
                        type="radio"
                        placeholder="Enter Wallet Address"
                        className="pr-2"
                        value="BEP20"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p>TRC20</p>
                      <input
                        name="usdt-type"
                        onChange={(e) => {
                          setUsdtDetails({
                            ...usdtDetails,
                            usdt_type: e.target.value,
                          });
                        }}
                        type="radio"
                        placeholder="Enter Wallet Address"
                        className="pr-2"
                        value="TRC20"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div title="passwordInput" className="w-full  uppercase">
                  <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                    Wallet Address
                  </div>
                  <div className="flex w-full items-center py-2 px-2 bg-auth rounded-lg border">
                    <input
                      onChange={(e) => {
                        setUsdtDetails({
                          ...usdtDetails,
                          wallet_address: e.target.value,
                        });
                      }}
                      placeholder="Enter Wallet Address"
                      id="password-input"
                      className="block w-full focus:outline-none w-full pr-2 rounded-none text-text_Ternary bg-auth text-sm xs:text-md"
                      value={usdtDetails.wallet_address}
                    />
                  </div>
                </div>
              </div>
              {mobile && Settings.otp && (
                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      Mobile
                    </div>
                    <div className="flex w-full items-center py-2 bg-auth rounded-lg border">
                      {/* <span
               id="dropdown-phone-button"
               className="flex-shrink-0 z-10 inline-flex items-center pl-2 pr-1 text-sm sm:text-md font-normal text-center"
             >
               +91
             </span> */}
                      <input
                        readOnly
                        id="mobile-no-input"
                        className="px-2 block w-full focus:outline-none w-full  bg-auth rounded-none text-text_Ternary pr-2 text-sm xs:text-md"
                        placeholder="Phone Number"
                        type="text"
                        value={mobile}
                      />

                      <div className="w-max">
                        {timer ? (
                          <button
                            className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out  h-fit bg-bg_Primary text-primary transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center !cursor-text"
                            type="button"
                          >
                            <span className=" ">Retry in {timer}</span>
                            {/* <span className="shimmer"></span> */}
                          </button>
                        ) : (
                          <div className="flex items-center">
                            <button
                              onClick={getOtp}
                              className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out  h-fit bg-bg_Primary text-primary transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer"
                              type="button"
                            >
                              <span className=" ">Get OTP Message</span>
                              <span className="shimmer"></span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {mobile && (
                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      OTP
                    </div>
                    <div className="flex w-full items-center border p-1 bg-auth rounded-lg mt-2">
                      <input
                        onChange={(e) => {
                          setUsdtDetails({
                            ...usdtDetails,
                            otp: e.target.value,
                          });
                        }}
                        id="otpSignUp"
                        className="block w-full focus:outline-none w-full  rounded-none py-1 text-text_Ternary px-2 text-sm xs:text-md bg-auth"
                        placeholder="Enter OTP"
                        type="text"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div id="googleRecaptcha" className="hidden"></div>
              <div title="loginButton" className="w-full">
                <button
                  disabled={!isFormValid}
                  type="submit"
                  className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out w-full text-primary bg-primary shadow-lg rounded-md xs:text-[15px] px-5 py-2 flex items-center justify-center gap-x-2  font-medium text-base cursor-pointer"
                >
                  <span>Add USDT Wallet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUSDTAccount;
