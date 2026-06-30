import { useEffect, useState } from "react";
import { useBankAccountQuery } from "../../../hooks/bankAccount";
import NewAccount from "./NewAccount";
import AddUSDTAccount from "./AddUSDTAccount";
import OldAccount from "./OldAccount";

const BankAccounts = ({ amount }) => {
  const { data: bankAccounts, refetch: refetchBankAccounts } =
    useBankAccountQuery({
      type: "getBankAccounts",
      status: "1",
    });
  const [tabs, setTabs] = useState("");
  useEffect(() => {
    if (bankAccounts?.length > 0) {
      setTabs("oldAccount");
    } else {
      setTabs("add-bank-account");
    }
  }, [bankAccounts]);

  return (
    <div className="w-full md:mt-[0px] lg:overflow-auto ">
      <div className="px-2 pb-2 flex flex-col items-start justify-start gap-y-2 mt-1 md:mt-[0px]">
        <div className="w-full flex flex-col gap-2 pt-2 pb-1 px-4 rounded-lg bg-bg_Quaternary">
          <div className=" font-medium text-base leading-5">Withdraw Funds</div>
          <div className="w-full flex flex-col text-xs text-text_Ternary transition-all ease-in-out duration-100">
            <div className="text-xs md:text-sm  pt-1 font-medium leading-4">
              1. This form is for withdrawing the amount from the main wallet
              only.
            </div>
            <div
              className="overflow-hidden transition-height duration-100 ease-in-out"
              style={{ height: "0px" }}
            ></div>
            <div
              className="overflow-hidden transition-height duration-100 ease-in-out"
              style={{ height: "20px" }}
            >
              <div className="text-xs pt-1 md:text-sm  font-medium leading-4">
                2. The bonus wallet amount cannot be withdrawn by this form.
              </div>
            </div>
            <div
              className="overflow-hidden transition-height duration-100 ease-in-out"
              style={{ height: "20px" }}
            >
              <div className="text-xs pt-1 md:text-sm  font-medium leading-4">
                3. Do not put Withdraw request without betting with deposit
                amount. Such activity will be identified as Suspicious
              </div>
            </div>
            <div
              className="overflow-hidden transition-height duration-100 ease-in-out"
              style={{ height: "20px" }}
            >
              <div className="text-xs pt-1 md:text-sm  font-medium leading-4">
                4. If multiple users are using same withdraw account then all
                the linked users will be blocked.
              </div>
            </div>
          </div>
        </div>
        <div className="text-base text-text_Ternary font-roboto w-full font-medium flex flex-col items-start justify-start gap-y-1">
          <span className="">Please fill in all required fields*</span>
          <div className=" text-sm w-full">
            <div
              id="step-selectMode"
              className="relative flex w-[100%] rounded-lg border shadow bg-bg_Quaternary overflow-clip undefined"
            >
              <button
                onClick={() => setTabs("add-bank-account")}
                className={`flex items-center justify-center w-full gap-1.5 tracking-wider undefined p-3 text-sm font-medium ${
                  tabs === "add-bank-account"
                    ? "text-primary"
                    : "text-text_Quinary"
                } undefined`}
                style={{ zIndex: 10 }}
              >
                Add Bank Account
              </button>

              <button
                onClick={() => setTabs("add-usdt-account")}
                className={`flex items-center justify-center w-full gap-1.5 tracking-wider undefined p-3 text-sm font-medium ${
                  tabs === "add-usdt-account"
                    ? "text-primary"
                    : "text-text_Quinary"
                } undefined`}
                style={{ zIndex: 10 }}
              >
                Add USDT Wallet
              </button>
              <button
                onClick={() => setTabs("oldAccount")}
                className={`flex items-center justify-center w-full gap-1.5 tracking-wider undefined p-3 text-sm font-medium  undefined ${
                  tabs === "oldAccount" ? "text-primary" : "text-text_Quinary"
                } `}
                style={{ zIndex: 10 }}
              >
                Use Previous Account
              </button>
              <div
                className={`w-[30%] absolute z-10 h-full transition-all ease-in-out p-1 ${
                  tabs === "add-bank-account"
                    ? "left-0"
                    : tabs === "add-usdt-account"
                      ? "left-[35%]"
                      : "right-0"
                }`}
                style={{ zIndex: 9, width: "35%", bottom: "0px" }}
              >
                <div className="w-full h-full bg-bg_Primary rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        {tabs === "add-bank-account" && (
          <NewAccount
            setTabs={setTabs}
            refetchBankAccounts={refetchBankAccounts}
          />
        )}
        {tabs === "add-usdt-account" && (
          <AddUSDTAccount
            setTabs={setTabs}
            refetchBankAccounts={refetchBankAccounts}
          />
        )}
        {tabs === "oldAccount" && (
          <OldAccount bankAccounts={bankAccounts} amount={amount} />
        )}
      </div>
    </div>
  );
};

export default BankAccounts;
