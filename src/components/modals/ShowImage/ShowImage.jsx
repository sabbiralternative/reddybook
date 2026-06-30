import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const ShowImage = ({ setShowImage, image }) => {
  const showImageRef = useRef();
  useCloseModalClickOutside(showImageRef, () => {
    setShowImage(false);
  });

  return (
    <div
      id="popup-modal"
      className="z-[1000] fixed top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={showImageRef}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-bg_Quaternary p-2 xs:p-5 h-[90%]"
      >
        <div
          onClick={() => setShowImage("")}
          className="transition-all mb-2 ease-in-out duration-200 hover:scale-105 absolute top-2 right-2"
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

        <div className="w-full gap-y-4 flex flex-col h-[90%]">
          <div className=" uppercase text-[10px] md:text-xs lg:text-sm ml-1">
            Image
          </div>
          <div className="flex w-full h-full  items-center justify-center border rounded-md overflow-hidden">
            <img
              className="object-contain w-full h-full overflow-y-scroll"
              src={image}
              alt=""
            />
          </div>

          <div className="w-full mt-auto">
            <button
              onClick={() => setShowImage("")}
              type="submit"
              className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out w-full text-primary bg-primary shadow-lg rounded-md xs:text-[15px] px-5 py-2 flex items-center justify-center gap-x-2  font-medium text-base cursor-pointer"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowImage;
