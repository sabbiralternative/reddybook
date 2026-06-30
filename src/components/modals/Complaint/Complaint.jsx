import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";

const Complaint = ({ setComplaintId, method, complaintId }) => {
  const complaintRef = useRef();
  const { register, handleSubmit } = useForm();

  const closeModal = () => {
    setComplaintId(null);
  };

  useCloseModalClickOutside(complaintRef, () => {
    closeModal();
  });

  const onSubmit = async ({ message }) => {
    const payload = {
      message,
      statement_id: complaintId,
      method,
      type: "raise_complaint",
    };

    const { data } = await AxiosSecure.post(API.index, payload);

    if (data?.success) {
      closeModal();
      toast.success(data?.result?.message);
    }
  };

  return (
    <div
      id="popup-modal"
      className="z-[1000] fixed top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={complaintRef}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-bg_Quaternary p-2 xs:p-5 rounded-md"
      >
        <div
          onClick={closeModal}
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
              onSubmit={handleSubmit(onSubmit)}
              className="w-full gap-y-4 flex flex-col"
            >
              <div title="loginFormMonileUserIdInput" className="w-full">
                <div className=" uppercase text-[10px] md:text-xs lg:text-sm ml-1">
                  Complaint
                </div>
                <div className="flex w-full items-center py-3.5 bg-auth rounded-lg border">
                  <textarea
                    {...register("message", { required: true })}
                    className="px-2 block w-full focus:outline-none w-full  bg-auth text-text_Ternary pr-2 text-sm xs:text-md"
                    placeholder="Write your complaint"
                  />
                  <span className="h-fit"> </span>
                </div>
              </div>

              <div id="googleRecaptcha" className="hidden"></div>
              <div title="loginButton" className="w-full">
                <button
                  type="submit"
                  className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out w-full text-primary bg-primary shadow-lg rounded-md xs:text-[15px] px-5 py-2 flex items-center justify-center gap-x-2  font-medium text-base cursor-pointer"
                >
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
