import { useRef } from "react";
import toast from "react-hot-toast";
import { useBankAccountQuery } from "../../../hooks/bankAccount";
import { useBankAccountMutation } from "../../../redux/features/deposit/event.api";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const RemoveAccount = ({ setRemoveBank, removeBank }) => {
  const { refetchBankAccounts } = useBankAccountQuery({
    type: "getBankAccounts",
    status: "1",
  });
  const [deleteBank] = useBankAccountMutation();
  const deleteBankRef = useRef();
  useCloseModalClickOutside(deleteBankRef, () => {
    setRemoveBank(false);
  });

  const handleDeleteBank = async () => {
    const bankData = {
      type: "deleteBankAccount",
      bankId: removeBank,
    };
    const res = await deleteBank(bankData).unwrap();
    if (res?.success) {
      setRemoveBank("");
      toast.success(res?.result?.message);
      refetchBankAccounts();
    } else {
      setRemoveBank("");
      toast.error(res?.error?.errorMessage);
    }
  };
  return (
    <div
      id="popup-modal"
      className="z-[1000] absolute top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={deleteBankRef}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[351px] py-6 h-max bg-bg_Quaternary shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-lg undefined p-2 xs:p-5 rounded-md"
      >
        <div
          onClick={() => setRemoveBank("")}
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
        <div className="w-full flex items-center justify-center flex-col gap-y-4 mt-2">
          <span className="text-sm  font-[400] leading-5">
            Are you sure you want to delete this account?
          </span>
          <div className="w-full flex items-center justify-center gap-x-2">
            <button
              onClick={() => setRemoveBank("")}
              className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-transparent text-base font-medium  text-text_Primary border border-primary h-10 w-32 rounded-md cursor-pointer"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBank}
              className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-primary text-base font-medium  text-primary h-10 w-32 rounded-md flex items-center justify-center gap-x-1 cursor-pointer"
              type="button"
            >
              <span className=" font-normal text-[16px]">Yes, Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveAccount;
