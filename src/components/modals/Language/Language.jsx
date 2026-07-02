import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useLanguage } from "../../../context/LanguageProvider";
import { useGetLanguage } from "../../../hooks/language.hook";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setShowLanguageModal } from "../../../redux/features/global/globalSlice";

const Language = () => {
  const dispatch = useDispatch();
  const [selectedLan, setSelectedLag] = useState(
    localStorage.getItem("language") || null,
  );
  const { setLanguage } = useLanguage();
  const { data } = useGetLanguage();

  const languages = data?.CRICKET;

  const handleSetLanguage = () => {
    if (!selectedLan) {
      return toast.error("Please select a language");
    }
    localStorage.setItem("language", selectedLan);
    closeModal();
    setLanguage(selectedLan);
  };
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });

  const closeModal = () => {
    dispatch(setShowLanguageModal(false));
  };

  return (
    <div className="z-[1000] absolute top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg">
      <div
        ref={modalRef}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-bg_Quaternary p-2 xs:p-5 rounded-md"
      >
        <button
          onClick={closeModal}
          className="absolute top-1 right-1 active:scale-95 transition-all duration-300"
        >
          <svg
            className="cursor-pointer z-50"
            height="24"
            width="24"
            fill="var(--icon-color-secondary)"
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
        </button>
        <div className="px-4 pt-5 pb-4 bg-bg_color_primary sm:p-6 sm:pb-4 font-lato">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-text_color_primary1">
                Select Language
              </h3>
              <div className="mt-2">
                <p className="text-sm text-text_color_primary1">
                  Choose your preferred language from the list below:
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {languages &&
                Object.keys(languages)?.map((language, idx) => {
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => setSelectedLag(language)}
                        className={`relative overflow-hidden w-full px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:border-border_color_brand_primary  text-text_color_primary1 border-border_color_brand_primary ${
                          selectedLan === language ? "bg-primary" : ""
                        }`}
                        type="button"
                      >
                        <span className="flex items-center justify-between capitalize">
                          {language}
                          {selectedLan === language && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="18"
                              fill="var(--bg-active-primary)"
                              viewBox="0 0 448 512"
                              className="w-5 h-5"
                            >
                              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                            </svg>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="px-4 py-3 bg-bg_color_primary sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleSetLanguage}
            type="button"
            className="relative overflow-hidden inline-flex justify-center w-full px-4 py-2 text-base font-medium text-text_color_primary2 bg-primary border border-transparent rounded-md shadow-sm  focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm text-primary"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="relative overflow-hidden inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-text_color_primary1 bg-primary  rounded-md shadow-sm hover:bg-bg_color_secondary hover:border-border_color_brand_primary focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Language;
