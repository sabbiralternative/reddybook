import useDepositBreakdown from "../../../hooks/depositBreakdown";
import toast from "react-hot-toast";

const ChooseAmount = ({ amount, setAmount, setPaymentMethods }) => {
  const { mutate: handleDepositBreakdown } = useDepositBreakdown();

  const handleShowPaymentMethods = () => {
    const floatAmount = parseFloat(amount);

    if (typeof floatAmount !== "number") {
      return toast.error("Please enter a valid number");
    }

    if (floatAmount) {
      handleDepositBreakdown(
        { amount: floatAmount },
        {
          onSuccess: (data) => {
            if (data?.minimumDeposit && floatAmount < data?.minimumDeposit) {
              toast.error(`Minimum deposit amount is ${data?.minimumDeposit}`);
            } else {
              setPaymentMethods(true);
            }
          },
        },
      );
    } else {
      return toast.error("Amount is required");
    }
  };

  return (
    <div
      className="w-full md:mt-[0px] lg:overflow-auto"
      style={{ minHeight: "calc(-110px + 100dvh)" }}
    >
      <div className="mx-2">
        <div>
          <div className="w-full mt-2.5 py-[15px] rounded-lg bg-bg_Quaternary px-3">
            <div className=" font-medium text-text_Ternary text-base leading-5">
              <p>
                Amount<span className="text-text_Danger">*</span>
              </p>
            </div>
            <div className="w-full mt-2 py-2 grid grid-cols-12 border rounded-[4px] px-2 items-center justify-center border-green-500">
              <input
                onChange={(e) =>
                  setAmount(
                    e.target.value <= 10000000 ? e.target.value : 10000000,
                  )
                }
                value={amount !== null && amount !== undefined ? amount : ""}
                className="block  focus:outline-none col-span-11 w-full h-max  placeholder: placeholder:font-normal font-medium text-base"
                placeholder="₹ Enter Amount"
                required=""
                type="number"
              />
              <span className=" font-medium  text-teranry text-base col-span-1 text-center">
                INR
              </span>
            </div>
            <div className="w-full grid grid-cols-3 gap-[10px] mt-[18px]">
              <button
                onClick={() => setAmount(500)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+500</span>
              </button>

              <button
                onClick={() => setAmount(1000)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+1,000</span>
              </button>
              <button
                onClick={() => setAmount(2000)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+2,000</span>
              </button>
              <button
                onClick={() => setAmount(5000)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+5,000</span>
              </button>
              <button
                onClick={() => setAmount(10000)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+10,000</span>
              </button>
              <button
                onClick={() => setAmount(50000)}
                className="inline-block leading-normal relative overflow-hidden  duration-150  bg-bg_Primary -all   active:scale-95 text-primary min-h-9 text-base  rounded-md font-medium  cursor-pointer"
                type="button"
              >
                <span>+50,000</span>
              </button>
            </div>
          </div>

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
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-primary opacity-0 -opacity peer-checked:opacity-100">
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
              <span className="text-text_Primary underline text-sm  font-[400]  cursor-pointer">
                the terms of payment and withdrawal policy.
              </span>
            </span>
          </div>
          <div className="w-full text-center py-4 px-2">
            <button
              onClick={handleShowPaymentMethods}
              //   disabled={!amount}
              //   style={{
              //     cursor: `${!amount ? "not-allowed" : "pointer"}`,
              //     opacity: `${!amount ? "0.5" : "1"}`,
              //   }}
              className=" leading-normal relative overflow-hidden  duration-150  bg-bg_Primary flex items-center justify-center gap-x-2 w-full text-primary h-10 text-base rounded-md font-[500]  disabled:bg-bg_Quinary cursor-pointer"
            >
              <span>Proceed to select payment method</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAmount;
