import { FaQrcode } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import { useBankAccountQuery } from "../../../hooks/bankAccount";
import {
  useBankAccountMutation,
  usePgPaymentMutation,
} from "../../../redux/features/deposit/event.api";
import images from "../../../assets/images";

const PaymentMethod = ({
  setUploadTransaction,
  setPaymentMethods,
  setPaymentId,
  amount,
  paymentId,
  setTabs,
  tabs,
}) => {
  const paymentMethodRef = useRef();
  const [depositData, setDepositData] = useState({});
  const [handlePgPayment] = usePgPaymentMutation();
  const [handleBankPayment] = useBankAccountMutation();

  const { data: paymentMethods, isFetched } = useBankAccountQuery({
    type: "depositMethods",
    amount,
  });

  const handleVisibleBankMethod = async (e, method) => {
    e.preventDefault();

    setTabs(method?.type);
    setPaymentId(method?.paymentId);

    if (
      method?.type === "upigateway" ||
      method?.type === "toitgateway" ||
      method?.type === "i100gateway" ||
      method?.type === "upiclick"
    ) {
      const pgPayload = {
        paymentId: method?.paymentId,

        amount,
        method: method?.type,
      };
      const res = await handlePgPayment(pgPayload).unwrap();

      if (res?.success) {
        window.location.href = res?.result?.link;
        // if (settings?.paymentIntent) {
        //   setPgPaymentMethods(data?.result);
        //   setTime(60 * 20);
        //   setQrcode(data?.result?.upi);
        //   setOrderId(data?.result?.orderId);
        // } else {
        //   window.location.href = data?.result?.link;
        // }
      } else {
        toast.error(res?.result?.message);
      }
    } else {
      const depositDetail = {
        type: "depositDetails",
        paymentId: method?.paymentId,

        amount,
      };

      const res = await handleBankPayment(depositDetail).unwrap();

      if (res?.success) {
        if (method?.type === "whatsapp") {
          window.location.href = res?.result?.link;
        } else {
          setDepositData(res?.result);
        }
      }
    }
  };

  useEffect(() => {
    if (
      paymentMethodRef &&
      paymentMethodRef.current &&
      tabs &&
      tabs !== "upigateway" &&
      tabs !== "toitgateway" &&
      tabs !== "i100gateway" &&
      tabs !== "upiclick"
    ) {
      paymentMethodRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [tabs]);

  return (
    <div className="w-full mt-[4px] lg:overflow-auto">
      <div className="mx-2">
        <form>
          <div className="rounded-lg bg-bg_Quaternary overflow-hidden transition-height duration-500 ease-in-out h-max px-3 pt-[15px] pb-[20px]">
            <div
              id="payMentOptions"
              className="flex flex-col gap-y-2 items-center gap-x-1.5 pt-[18px] pb-[8px] overflow-x-auto no-scrollbar scroll-smooth cursor-pointer w-full transition-all ease-in-out duration-150"
            >
              {paymentMethods?.length > 0 &&
                paymentMethods
                  ?.sort((a, b) => a?.sort - b?.sort)
                  .map((method, i) => {
                    return (
                      <div
                        onClick={(e) => handleVisibleBankMethod(e, method)}
                        key={i}
                        className={`flex  justify-between items-center  gap-y-2 rounded-[10px] bg-bg_Quaternary py-2 w-full  px-2 md:px-4 relative border ${
                          paymentId === method?.paymentId
                            ? "border-green-500  "
                            : "border-quinary"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs  font-medium truncate w-full uppercase">
                            {method?.title?.toUpperCase()}
                          </span>
                          <span className="text-sm">{method?.type}</span>
                        </div>
                        <div className="">
                          {method?.type == "qr" && (
                            <FaQrcode size={20} color="gray" />
                          )}
                          {method?.type == "bank" && (
                            <CiBank size={20} color="gray" />
                          )}
                          {method?.type == "upi" || method?.type == "pg" ? (
                            <img
                              style={{
                                height: "20px",
                                width: "20px",
                                margin: "0px",
                              }}
                              src={images.upi}
                            />
                          ) : null}
                          {method?.type == "usdt" ? (
                            <img
                              style={{
                                height: "20px",
                                width: "20px",
                                margin: "0px",
                              }}
                              src={images.trc}
                            />
                          ) : null}
                          {method?.type == "usdt_bep20" ? (
                            <img
                              style={{
                                height: "20px",
                                width: "20px",
                                margin: "0px",
                              }}
                              src={images.bep}
                            />
                          ) : null}
                          {method?.type == "whatsapp" ? (
                            <img
                              style={{
                                height: "17px",
                                width: "17px",
                                margin: "0px",
                              }}
                              src={images.whatsApp}
                            />
                          ) : null}
                          {method?.type == "upigateway" ||
                          method?.type === "toitgateway" ||
                          method?.type === "i100gateway" ||
                          method?.type === "upiclick" ? (
                            <img
                              style={{
                                height: "17px",
                                width: "17px",
                                margin: "0px",
                              }}
                              src={images.bhim}
                            />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
              {isFetched && paymentMethods?.length === 0 && (
                <div className="py-10 flex items-center justify-center w-full">
                  <h2>No payment method available right now.</h2>
                </div>
              )}
            </div>
          </div>
          {/* details */}
          <div ref={paymentMethodRef}>
            {tabs === "bank" && (
              <div className="w-full mt-2.5 rounded-[10px] bg-bg_Quaternary px-3 py-[15px]">
                <div className=" font-medium mt-[4px] text-base leading-5">
                  Payment Details
                </div>
                <div className="mt-2 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      Account
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.accountNumber}</span>
                      <span
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.accountNumber)
                        }
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-2.5 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      IFSC
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.ifsc}</span>
                      <span
                        onClick={() => handleCopyToClipBoard(depositData?.ifsc)}
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-2.5 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      Account Name
                    </span>
                    <div
                      onClick={() =>
                        handleCopyToClipBoard(depositData?.accountName)
                      }
                      className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide"
                    >
                      <span> {depositData?.accountName}</span>
                      <span className="relative float-right">
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-2.5 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      Bank Name
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.bankName}</span>
                      <span
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.bankName)
                        }
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            )}
            {tabs === "upi" && (
              <div className="w-full mt-2.5 rounded-[10px] bg-bg_Quaternary px-3 py-[15px]">
                <div className=" font-medium mt-[4px] text-base leading-5">
                  Payment Details
                </div>
                <div className="mt-2 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      Display Name
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.upiAccountName}</span>
                      <span
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.upiAccountName)
                        }
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
                <div className="mt-2.5 w-full">
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      UPI Details
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.upiId}</span>
                      <span
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.upiId)
                        }
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            )}
            {tabs === "qr" && (
              <div className="w-full mt-2.5 rounded-[10px] bg-bg_Quaternary px-3 py-[15px]">
                <div className=" font-medium mt-[4px] text-base leading-5">
                  QR code for payment
                </div>
                <div className="mt-2 w-full">
                  <div className="flex items-center justify-center my-3">
                    <img
                      style={{
                        height: "250px",
                        borderRadius: "4px",
                        objectFit: "contain",
                        width: "100%",
                      }}
                      loading="lazy"
                      src={depositData?.qrCodeLink}
                      alt=""
                      className="border"
                    />
                  </div>
                  {depositData?.qrDisplayName && (
                    <span className="flex flex-col items-start justify-start">
                      <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                        Display Name
                      </span>
                      <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                        <span> {depositData?.qrDisplayName}</span>
                        <span
                          onClick={() =>
                            handleCopyToClipBoard(depositData?.qrDisplayName)
                          }
                          className="relative float-right"
                        >
                          <div>
                            <span className="bg-bg_Ternary11">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_1711_2966)">
                                  <path
                                    d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                    fill="#C10B32"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_1711_2966">
                                    <rect
                                      width="14"
                                      height="14"
                                      fill="white"
                                    ></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                          </div>
                        </span>
                      </div>
                    </span>
                  )}
                </div>
              </div>
            )}
            {tabs === "usdt" || tabs === "usdt_bep20" ? (
              <div className="w-full mt-2.5 rounded-[10px] bg-bg_Quaternary px-3 py-[15px]">
                {depositData?.token && (
                  <span className="flex flex-col items-start justify-start">
                    <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                      Wallet Address
                    </span>
                    <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                      <span> {depositData?.token}</span>
                      <span
                        onClick={() =>
                          handleCopyToClipBoard(depositData?.token)
                        }
                        className="relative float-right"
                      >
                        <div>
                          <span className="bg-bg_Ternary11">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1711_2966)">
                                <path
                                  d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                  fill="#C10B32"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_1711_2966">
                                  <rect
                                    width="14"
                                    height="14"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </span>
                    </div>
                  </span>
                )}

                <span className="flex flex-col items-start justify-start">
                  <span className="text-AccountDetailsHeadings text-[10px]  leading-4 sm:text-xs md:text-sm">
                    Amount
                  </span>
                  <div className="flex items-center justify-between w-full  text-base font-medium leading-5 tracking-wide">
                    <span> USDT {depositData?.depositAmount}</span>
                    <span
                      onClick={() =>
                        handleCopyToClipBoard(
                          depositData?.depositAmount?.toString(),
                        )
                      }
                      className="relative float-right"
                    >
                      <div>
                        <span className="bg-bg_Ternary11">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_1711_2966)">
                              <path
                                d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z"
                                fill="#C10B32"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_1711_2966">
                                <rect
                                  width="14"
                                  height="14"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </div>
                    </span>
                  </div>
                </span>

                <div className=" font-medium mt-[4px] text-base leading-5">
                  QR code for payment
                </div>
                <div className="mt-2 w-full">
                  <div className="flex items-center justify-center my-3">
                    <img
                      style={{ height: "250px", borderRadius: "4px" }}
                      loading="lazy"
                      src={depositData?.qrCodeLink}
                      alt=""
                      className="border"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* buttons */}
          {paymentMethods?.length > 0 && (
            <div className="flex items-start justify-center gap-x-2 py-3 px-5">
              <div className="inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full bg-bg_Quinary"
                  htmlFor="blue"
                >
                  <input
                    className="before:content[''] before:bg-primary3 rounded-md peer relative cursor-pointer appearance-none border border-success transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-max before:w-max before:-translate-x-2/4 before:-translate-y-2/4 before:opacity-0 before:transition-opacity checked:border-success checked:bg-bg_Success hover:before:opacity-10 h-5 w-5"
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
          )}
          {paymentMethods?.length > 0 && (
            <div className="w-full text-center py-4 px-2">
              <button
                disabled={
                  paymentMethods?.length === 0 || !tabs || tabs === "whatsapp"
                }
                onClick={() => {
                  setPaymentMethods(false);
                  setUploadTransaction(true);
                }}
                type="submit"
                className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-bg_Primary flex items-center justify-center gap-x-2 w-full text-primary h-10 text-base rounded-md font-[500] leading-4 disabled:bg-bg_Quinary cursor-pointer"
              >
                <span>I have made the payment</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
