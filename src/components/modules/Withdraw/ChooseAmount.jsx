import useWithdrawBreakdown from "../../../hooks/withdrawBreakdown";

const ChooseAmount = ({ setShowBanks, setAmount, amount }) => {
  const { data: withdrawBreakdown } = useWithdrawBreakdown();

  const handleShowBank = () => {
    if (
      amount < withdrawBreakdown?.minimumWithdraw ||
      amount > withdrawBreakdown?.mainWallet
    ) {
      return;
    } else {
      setShowBanks(true);
    }
  };
  return (
    <div className="px-2 pb-2 flex flex-col items-start justify-start gap-y-2 mt-1 md:mt-[0px] w-full">
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
              4. If multiple users are using same withdraw account then all the
              linked users will be blocked.
            </div>
          </div>
        </div>
      </div>
      <div className="text-base text-text_Ternary font-roboto w-full font-medium flex flex-col items-start justify-start gap-y-1">
        <span className="">Please fill in all required fields*</span>
      </div>
      <div
        className="w-full flex flex-col items-start justify-start gap-y-4"
        data-gtm-form-interact-id="0"
      >
        <div className="rounded-lg bg-bg_Quaternary py-2 px-3.5 pb-5 flex flex-col items-start justify-start w-full gap-y-2">
          <div className="w-full flex items-start justify-start gap-y-[0.5] flex-col">
            <span className="text-sm mt-1 bg-primary rounded  shadow-md text-black px-2 py-1 my-1">
              Available to withdrawal : ₹ {withdrawBreakdown?.mainWallet}
            </span>
            <div className="flex flex-col w-full">
              <div className="ml-1 text-sm">
                Amount <span className="text-text_Primary">*</span>
              </div>
              <div className="relative">
                <span className="px-2 absolute top-1/2 -translate-y-1/2 w-max">
                  ₹
                </span>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  id="amount"
                  label="Amount"
                  required=""
                  placeholder="Enter Amount"
                  className="block w-full focus:outline-none py-2  border rounded-lg pl-10 pr-8 ml-0 mr-0 placeholder:text-gray-300 border-primary"
                  type="number"
                  value={amount}
                />
                <span className="px-2 absolute top-1/2 -translate-y-1/2 right-0">
                  Minimum {withdrawBreakdown?.minimumWithdraw}
                </span>
              </div>
              <div className="text-xs ml-1 text-text_Primary"></div>
            </div>
          </div>
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
            I have read and agree with{" "}
            <span className="text-text_Primary underline text-sm  font-[400] leading-4 cursor-pointer">
              the terms of payment and withdrawal policy.
            </span>
          </span>
        </div>
        <div className="w-full text-center">
          <div
            onClick={handleShowBank}
            className={`inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out bg-bg_Primary w-full text-primary h-10 text-base shadow-lg  rounded-md font-medium leading-4  flex gap-x-1 items-center justify-center  ${
              amount < withdrawBreakdown?.minimumWithdraw ||
              amount > withdrawBreakdown?.mainWallet
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            }`}
          >
            <span>Continue to select account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAmount;
