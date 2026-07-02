import { useRef } from "react";
import { useDispatch } from "react-redux";
import { GrAndroid } from "react-icons/gr";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { setShowAPKModal } from "../../../redux/features/global/globalSlice";
import { Settings } from "../../../api";
import images from "../../../assets/images";

const DownloadAPK = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });

  const closeModal = () => {
    sessionStorage.setItem("apk_modal_shown", true);
    dispatch(setShowAPKModal(false));
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    closeModal();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 overflow-hidden flex h-[100dvh] w-dvw items-center justify-center bg-bg_CasinoPopupBg overflow-y-hidden z-[10000]">
      <div
        ref={modalRef}
        className="relative w-[90%]  sm:w-[85%] md:w-[70%] lg:w-[450px] max-w-[450px] rounded-[20px] bg-bg_Quaternary  popUpBoxShadow popUpOpenAnimation  "
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 active:scale-95 transition-all duration-300 z-50"
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

        <div className="promo-card ">
          <header className="promo-header">
            <div className="header-content">
              <img
                src={images.install_android}
                className="size-20"
                alt="install_android"
              />

              <h1 className="main-title">
                Download APK for Premium Gaming Experience
              </h1>
            </div>
          </header>

          <main className="promo-body">
            <p className="intro-text">
              Kabhi-kabhi website slow ho sakti hai ya link update ho jata hai,
              lekin hamara Official App aapko hamesha connected rakhega 🚀
            </p>

            <h2 className="benefits-title">App ke saath aapko milega:</h2>

            <ul className="benefits-list mb-2">
              <li>
                <strong>24×7 Instant Access</strong> – Har waqt khelo bina
                rukawat
              </li>
              <li>
                <strong>2X Faster Speed</strong> – Website se bhi double fast
                loading
              </li>
              <li>
                <strong>Secure Login</strong> – Aapka data hamesha safe &
                protected
              </li>
              <li>
                <strong>Non-Stop Gaming</strong> – No waiting, no interruptions
              </li>
            </ul>

            <p className="closing-text">
              Yehi wajah hai ki sabse zyada serious players App prefer karte
              hain. Aap bhi join karo unme aur pao ek premium lifestyle
              experience 💎
            </p>

            <a
              onClick={handleDownload}
              className="download-button text-primary"
            >
              <GrAndroid className="android-icon" />
              <span>Download Official App Now ↓</span>
            </a>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DownloadAPK;
