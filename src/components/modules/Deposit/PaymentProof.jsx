import toast from "react-hot-toast";
import { API } from "../../../api";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import useUTR from "../../../hooks/utr";
import { useBankAccountMutation } from "../../../redux/features/deposit/event.api";
import ImageUploadMessage from "./ImageUploadMessage";

const PaymentProof = ({ paymentId, amount, tabs }) => {
  const [imageUploadMessage, setImageUploadMessage] = useState(null);
  const { mutate: getUTR } = useUTR();
  const [handleBankDeposit] = useBankAccountMutation();
  const token = useSelector(userToken);
  const navigate = useNavigate();
  const [utr, setUtr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [filePath, setFilePath] = useState(null);
  // const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (image) {
      setLoading(true);
      setImageUploadMessage("Uploading Image");
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        if (data?.success) {
          setImageUploadMessage("Image uploaded, Fetching UTR");
          getUTR(data?.filePath, {
            onSuccess: (data) => {
              if (data?.success) {
                if (data?.utr !== null) {
                  toast.success(data?.message);
                  setImageUploadMessage(null);
                  setUtr(data?.utr);
                }
              } else {
                toast.error(data?.message);
                setImageUploadMessage(null);
              }
            },
            onError: () => {
              setImageUploadMessage(null);
            },
          });
          setLoading(false);
          setUploadedImage(data?.fileName);

          setFilePath(data?.filePath);
          setImage(null);
        } else {
          setImageUploadMessage(null);
          setLoading(false);
          setUtr(null);
          setImage(null);
          setFilePath("");
          setUploadedImage(null);
          toast.error(data?.error);
        }
      };
      handleSubmitImage();
    }
  }, [image, token, getUTR]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
  };

  const handleDepositSubmit = async () => {
    if (!filePath || !utr) {
      return;
    }
    if (uploadedImage || utr) {
      let screenshotPostData = {
        type: "depositSubmit",
        paymentId,
        amount: amount,
        fileName: uploadedImage,
        utr: String(utr),
      };
      // if (tabs === "usdt" || tabs === "usdt_bep20") {
      //   screenshotPostData.receipt_no = receipt;
      // }
      const res = await handleBankDeposit(screenshotPostData).unwrap();

      if (res?.success) {
        setUtr(null);
        setImage(null);
        toast.success(res?.result?.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setUtr("");
        setImage(null);
        setFilePath("");
        setUploadedImage(null);
        toast.error(res?.error?.errorMessage || res?.result?.message);
      }
    }
  };

  const handleUTRChange = (e) => {
    const value = e.target.value;

    setUtr(value);
  };

  return (
    <Fragment>
      {imageUploadMessage && (
        <ImageUploadMessage imageUploadMessage={imageUploadMessage} />
      )}
      <div className="w-full md:mt-[0px] lg:overflow-auto">
        <div className="mx-2">
          <div>
            {!filePath && !loading && (
              <div className="w-full mt-2.5 rounded-md bg-bg_Quaternary py-3.5 px-3">
                <div className=" font-medium text-base leading-5 mb-2">
                  Upload your payment slip below
                  <span className="text-green-500">*</span>
                </div>
                <label id="fileInput" className="w-full relative mt-2">
                  <div className="flex items-center border border-dashed rounded-[4px] py-3 pl-3 pr-1 border-green-500 cursor-pointer">
                    <input
                      onChange={(e) => handleImageChange(e)}
                      className="hidden w-0 h-0"
                      accept=".jpg,.jpeg,.png,.pdf.webp"
                      type="file"
                      id="fileInput"
                    />
                    <span
                      id="fileInput"
                      className="cursor-pointer pl-8 font-inherit text-base text-placeHolderUploadFileDeposit font-normal"
                    >
                      Upload
                    </span>
                    <span
                      id="fileInput"
                      className="ml-1 font-inherit text-base text-placeHolderUploadFileDeposit font-normal"
                    >
                      or drop a file right here
                    </span>
                  </div>
                  <div className="absolute top-[14px] left-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.7491 10.9999V16.9999C21.8078 17.5066 21.7512 18.0199 21.5835 18.5016C21.4158 18.9833 21.1414 19.4209 20.7807 19.7815C20.42 20.1422 19.9825 20.4166 19.5008 20.5843C19.0191 20.752 18.5057 20.8086 17.9991 20.7499H5.99906C5.4924 20.8086 4.97902 20.752 4.49732 20.5843C4.01563 20.4166 3.57808 20.1422 3.21742 19.7815C2.85676 19.4209 2.58232 18.9833 2.41463 18.5016C2.24694 18.0199 2.19034 17.5066 2.24906 16.9999V6.9999C2.19034 6.49324 2.24694 5.97986 2.41463 5.49817C2.58232 5.01647 2.85676 4.57893 3.21742 4.21827C3.57808 3.8576 4.01563 3.58316 4.49732 3.41547C4.97902 3.24778 5.4924 3.19118 5.99906 3.2499H13.9991C14.198 3.2499 14.3887 3.32892 14.5294 3.46957C14.67 3.61023 14.7491 3.80099 14.7491 3.9999C14.7491 4.19882 14.67 4.38958 14.5294 4.53023C14.3887 4.67089 14.198 4.7499 13.9991 4.7499H5.99906C4.42206 4.7499 3.74906 5.4229 3.74906 6.9999V16.2499L6.28906 13.7099C6.47787 13.5226 6.73307 13.4174 6.99906 13.4174C7.26505 13.4174 7.52025 13.5226 7.70906 13.7099L8.64906 14.6499C8.74252 14.7415 8.86818 14.7928 8.99906 14.7928C9.12994 14.7928 9.2556 14.7415 9.34906 14.6499L14.2891 9.7099C14.4779 9.52255 14.7331 9.41742 14.9991 9.41742C15.265 9.41742 15.5203 9.52255 15.7091 9.7099L20.2491 14.2499V10.9999C20.2491 10.801 20.3281 10.6102 20.4687 10.4696C20.6094 10.3289 20.8001 10.2499 20.9991 10.2499C21.198 10.2499 21.3887 10.3289 21.5294 10.4696C21.67 10.6102 21.7491 10.801 21.7491 10.9999ZM7.99206 7.7499C7.66005 7.75083 7.34198 7.88349 7.1077 8.11875C6.87342 8.35401 6.7421 8.67264 6.74256 9.00465C6.74302 9.33666 6.87524 9.65492 7.11017 9.88952C7.34511 10.1241 7.66355 10.2559 7.99556 10.2559C8.32757 10.2559 8.64601 10.1241 8.88095 9.88952C9.11588 9.65492 9.24809 9.33666 9.24856 9.00465C9.24902 8.67264 9.1177 8.35401 8.88342 8.11875C8.64914 7.88349 8.33107 7.75083 7.99906 7.7499H7.99206ZM18.5291 5.0299L18.7491 4.8109V6.9999C18.7491 7.19882 18.8281 7.38958 18.9687 7.53023C19.1094 7.67089 19.3001 7.7499 19.4991 7.7499C19.698 7.7499 19.8887 7.67089 20.0294 7.53023C20.17 7.38958 20.2491 7.19882 20.2491 6.9999V4.8109L20.4691 5.0299C20.6112 5.16238 20.7993 5.23451 20.9936 5.23108C21.1879 5.22765 21.3733 5.14894 21.5107 5.01153C21.6481 4.87411 21.7268 4.68873 21.7302 4.49443C21.7337 4.30013 21.6615 4.11208 21.5291 3.9699L20.0291 2.4699C19.8883 2.3297 19.6977 2.25098 19.4991 2.25098C19.3004 2.25098 19.1098 2.3297 18.9691 2.4699L17.4691 3.9699C17.3366 4.11208 17.2645 4.30013 17.2679 4.49443C17.2713 4.68873 17.35 4.87411 17.4874 5.01153C17.6249 5.14894 17.8102 5.22765 18.0045 5.23108C18.1988 5.23451 18.3869 5.16238 18.5291 5.0299Z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                </label>
                <span></span>
              </div>
            )}
            {filePath && !loading && (
              <div className="w-full mt-2.5 rounded-md bg-bg_Quaternary py-3.5 px-3">
                <div className=" font-medium text-base leading-5 relative">
                  <div
                    onClick={() => {
                      setFilePath("");
                      setUploadedImage(null);
                      setImage(null);
                    }}
                    className="absolute top-0 right-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2rem"
                      height="1.2rem"
                      viewBox="0 0 14 15"
                      fill="none"
                      style={{
                        border: "1px solid gray",
                        borderRadius: "50%",
                        background: "gray",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.91728 10.7587C2.68949 10.9866 2.68952 11.3559 2.91735 11.5837C3.14517 11.8115 3.51452 11.8115 3.7423 11.5836L7.00036 8.32499L10.2587 11.5833C10.4865 11.8111 10.8558 11.8111 11.0836 11.5833C11.3114 11.3555 11.3114 10.9862 11.0836 10.7584L7.82525 7.49998L11.0834 4.24126C11.3111 4.01343 11.3111 3.64409 11.0833 3.41631C10.8555 3.18851 10.4861 3.18855 10.2583 3.41638L7.00024 6.67503L3.74191 3.41666C3.5141 3.18885 3.14475 3.18885 2.91695 3.41666C2.68914 3.64446 2.68914 4.01381 2.91695 4.24162L6.17541 7.50004L2.91728 10.7587Z"
                        fill="#111827"
                        className="ng-tns-c159-2"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      loading="lazy"
                      id="bank-receipt"
                      src={filePath}
                      alt=""
                      style={{ borderRadius: "0.375rem", width: "15rem" }}
                    />
                  </div>
                </div>

                <span></span>
              </div>
            )}
            {loading && (
              <div className="w-full mt-2.5 rounded-md bg-bg_Quaternary py-3.5 px-3">
                <div className=" font-medium text-base leading-5 flex items-center w-full justify-center">
                  <FaSpinner className="animate-spin" size={30} />
                </div>

                <span></span>
              </div>
            )}

            <div className="w-full mt-2.5 bg-bg_Quaternary rounded-md px-3 py-3.5">
              <div className=" font-medium text-sm mb-2 leading-5">
                {tabs === "usdt" || tabs === "usdt_bep20"
                  ? "Hash Code"
                  : " Unique Transaction Reference"}

                <span className="text-primary">*</span>
              </div>
              <div className="w-full relative ">
                <input
                  onChange={handleUTRChange}
                  className="block w-full focus:outline-none border-[1px]  px-3 py-2.5 rounded-[4px]  placeholder: font-medium text-base border-quinary focus:border-ternary"
                  placeholder={
                    tabs === "usdt" || tabs === "usdt_bep20"
                      ? "Enter Hash code"
                      : "6 to 23 Digit UTR/RRN Number"
                  }
                  type="number"
                  value={utr ? utr : null}
                />
                <span className="text-text_Danger text-xs  font-[450] leading-4"></span>
              </div>
            </div>
            {/* {tabs === "usdt" || tabs === "usdt_bep20" ? (
            <div className="w-full mt-2.5 bg-bg_Quaternary rounded-md px-3 py-3.5">
              <div className=" font-medium text-sm mb-2 leading-5">
                Receipt Number
              </div>
              <div className="w-full relative ">
                <input
                  onChange={(e) => setReceipt(e.target.value)}
                  className="block w-full focus:outline-none border-[1px]  px-3 py-2.5 rounded-[4px]  placeholder: font-medium text-base border-quinary focus:border-ternary"
                  placeholder={"Enter Receipt Number"}
                  type="number"
                  value={receipt}
                />
                <span className="text-text_Danger text-xs  font-[450] leading-4"></span>
              </div>
            </div>
          ) : null} */}

            <div className="flex items-start justify-center gap-x-2 py-3 px-5">
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
                I have read and agree with{" "}
                <span className="text-text_Primary underline text-sm  font-[400] leading-4 cursor-pointer">
                  the terms of payment and withdrawal policy.
                </span>
              </span>
            </div>
            <div className="w-full text-center py-4 px-2">
              <button
                disabled={!filePath || !utr}
                style={{
                  cursor: `${!filePath || !utr ? "not-allowed" : "pointer"}`,
                }}
                onClick={handleDepositSubmit}
                className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-bg_Primary flex items-center justify-center gap-x-2 w-full text-primary h-10 text-base rounded-md font-[500] leading-4 disabled:bg-bg_Quinary cursor-pointer"
              >
                <span>I have made the payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentProof;
