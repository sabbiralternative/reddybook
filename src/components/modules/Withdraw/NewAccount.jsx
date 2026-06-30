import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useBankAccountMutation } from "../../../redux/features/deposit/event.api";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const NewAccount = ({ setTabs, refetchBankAccounts }) => {
  const [addNewBank] = useBankAccountMutation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    ifsc: "",
    accountNumber: "",
    confirmAccountNumber: "",
    upiId: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();

    if (bankDetails.accountNumber != bankDetails.confirmAccountNumber) {
      return toast.error("Account number not matched!");
    }

    if (mobile && !bankDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }
    /* generating random token for post data */

    let bankData = {
      accountName: bankDetails.accountName,
      ifsc: bankDetails.ifsc,
      accountNumber: bankDetails.accountNumber,
      upiId: bankDetails.upiId,
      type: "addBankAccount",
      nonce: crypto.randomUUID(),
    };
    if (mobile) {
      bankData.mobile = mobile;
      bankData.otp = bankDetails.otp;
      bankData.orderId = orderId;
    }

    const res = await addNewBank(bankData).unwrap();

    if (res?.success) {
      setBankDetails({
        accountName: "",
        ifsc: "",
        accountNumber: "",
        confirmAccountNumber: "",
        otp: "",
      });
      toast.success(res?.result?.message);
      setTabs("oldAccount");
      refetchBankAccounts();
      window.scrollTo(0, 0);
    } else {
      toast.error(res?.result?.message);
    }
  };

  const validateForm = (bankDetails) => {
    const isaccountNameFilled = bankDetails.accountName.trim() !== "";
    const isaccountNumberFilled = bankDetails.accountNumber.trim() !== "";
    const isIfscFilled = bankDetails.ifsc.trim() !== "";
    const isOTPFilled =
      mobile && Settings.otp ? bankDetails.otp.trim() !== "" : true;
    const isFormValid =
      isaccountNameFilled &&
      isIfscFilled &&
      isaccountNumberFilled &&
      isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(bankDetails);
  }, [bankDetails]);

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
    <form
      onSubmit={handleAddBank}
      className="w-full flex flex-col items-start justify-start gap-y-4"
      data-gtm-form-interact-id="0"
    >
      <div className="rounded-lg bg-bg_Quaternary py-2 px-3.5 pb-5 flex flex-col items-start justify-start w-full gap-y-2">
        <div className="w-full relative h-full">
          <div className="flex flex-col w-full">
            <div className="ml-1 text-sm">
              UPI ID (Optional)
              <span className="text-text_Primary"></span>
            </div>
            <div className="relative">
              <input
                onChange={(e) => {
                  setBankDetails({
                    ...bankDetails,
                    upiId: e.target.value,
                  });
                }}
                placeholder="Enter UPI ID"
                className="block w-full focus:outline-none py-2  border rounded-lg pl-4 pr-4 ml-0 mr-0"
                type="text"
                value={bankDetails.upiId}
              />
            </div>
            <div className="text-xs ml-1 text-text_Primary"></div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="ml-1 text-sm">
            Account Name <span className="text-text_Primary">*</span>
          </div>
          <div className="relative">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  accountName: e.target.value,
                });
              }}
              id="accountName"
              label="Account Name"
              required
              placeholder="Enter Account Name"
              className="block w-full focus:outline-none py-2  border rounded-lg pl-4 pr-4 ml-0 mr-0"
              type="text"
              value={bankDetails.accountName}
            />
          </div>
          <div className="text-xs ml-1 text-text_Primary"></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="ml-1 text-sm">
            Account No <span className="text-text_Primary">*</span>
          </div>
          <div className="relative">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                });
              }}
              id="accountNo"
              label="Account No"
              required
              placeholder="Enter Account Number"
              className="block w-full focus:outline-none py-2  border rounded-lg pl-4 pr-4 ml-0 mr-0"
              type="text"
              value={bankDetails.accountNumber}
            />
          </div>
          <div className="text-xs ml-1 text-text_Primary"></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="ml-1 text-sm">
            Confirm Account No
            <span className="text-text_Primary">*</span>
          </div>
          <div className="relative">
            <input
              onChange={(e) => {
                setBankDetails({
                  ...bankDetails,
                  confirmAccountNumber: e.target.value,
                });
              }}
              label="Confirm Account No"
              required
              id="confirmAccountNo"
              placeholder="Re-enter Account Number"
              className="block w-full focus:outline-none py-2  border rounded-lg pl-4 pr-4 ml-0 mr-0"
              type="text"
              value={bankDetails.confirmAccountNumber}
            />
          </div>
          <div className="text-xs ml-1 text-text_Primary"></div>
        </div>
        <div className="w-full relative h-full">
          <div className="flex flex-col w-full">
            <div className="ml-1 text-sm">
              IFSC Code <span className="text-text_Primary">*</span>
            </div>
            <div className="relative">
              <input
                onChange={(e) => {
                  setBankDetails({
                    ...bankDetails,
                    ifsc: e.target.value,
                  });
                }}
                id="ifsc"
                label="IFSC Code"
                required
                placeholder="Enter IFSC Code"
                className="block w-full focus:outline-none py-2  border rounded-lg pl-4 pr-4 ml-0 mr-0"
                type="text"
                value={bankDetails.ifsc}
              />
            </div>
            <div className="text-xs ml-1 text-text_Primary"></div>
          </div>
        </div>

        {mobile && Settings.otp && (
          <div className="flex flex-col gap-1 w-full">
            <div title="passwordInput" className="w-full  ">
              <div className="ml-1  lg:text-sm">
                Mobile <span className="text-text_Primary">*</span>
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
                  className="px-2 block w-full focus:outline-none   bg-auth rounded-none text-text_Ternary pr-2 text-sm xs:text-md"
                  placeholder="Phone Number"
                  type="text"
                  value={mobile}
                />

                <div className="w-max">
                  {timer ? (
                    <button
                      onClick={getOtp}
                      className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-bg_Primary text-primary transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer"
                      type="button"
                    >
                      <span className=" ">Retry in {timer}</span>
                      {/* <span className="shimmer"></span> */}
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button
                        onClick={getOtp}
                        className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-bg_Primary text-primary transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer"
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
        {mobile && Settings.otp && (
          <div className="flex flex-col gap-1 w-full">
            <div title="passwordInput" className="w-full  uppercase">
              <div className=" ml-1  lg:text-sm">
                OTP <span className="text-text_Primary">*</span>
              </div>
              <div className="flex w-full items-center border p-1 bg-auth rounded-lg mt-2">
                <input
                  onChange={(e) => {
                    setBankDetails({
                      ...bankDetails,
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
      </div>

      <div className="flex items-start justify-center gap-x-2">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full bg-bg_Quinary"
            htmlFor="blue"
          >
            <input
              className="before:content[''] before:bg-green-500 rounded-md peer relative cursor-pointer appearance-none border border-green-500 -all before:absolute before:left-2/4 before:top-2/4 before:block before:h-max before:w-max before:-translate-x-2/4 before:-translate-y-2/4 before:opacity-0 before:-opacity checked:border-green-500 checked:bg-green-500 hover:before:opacity-10 h-5 w-5"
              id="blue"
              type="checkbox"
              defaultChecked
            />
            <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
        <span className="text-sm text-textColor  font-[400] leading-5">
          I have read and agree with
          <span className="text-text_Primary underline text-sm  font-[400] leading-4 cursor-pointer">
            the terms of payment and withdrawal policy.
          </span>
        </span>
      </div>
      <div className="w-full text-center">
        <button
          type="submit"
          disabled={!isFormValid}
          className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-bg_Primary w-full text-primary h-10 text-base shadow-lg  rounded-md font-medium leading-4 disabled:opacity-70 flex gap-x-1 items-center justify-center cursor-pointer"
        >
          <span>SUBMIT</span>
        </button>
      </div>
    </form>
  );
};

export default NewAccount;
