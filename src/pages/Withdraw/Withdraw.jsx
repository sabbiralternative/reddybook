import { useState } from "react";
import ChooseAmount from "../../components/modules/Withdraw/ChooseAmount";
import BankAccounts from "../../components/modules/Withdraw/BankAccounts";
import SidebarLayout from "../../layout/SidebarLayout";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [showBanks, setShowBanks] = useState(false);

  return (
    <SidebarLayout>
      <div className="flex-1 flex white bg-gray1 mt-4">
        <div className="h-full w-full overflow-auto hide-scrollbar mb-6 md:mb-0 md:px-2 md:pl-[15px] md:pr-3">
          <div className="w-full router-ctn max-md:pb-9">
            <main className="flex w-full mt-2">
              {!showBanks && (
                <ChooseAmount
                  setShowBanks={setShowBanks}
                  setAmount={setAmount}
                  amount={amount}
                />
              )}
              {showBanks && <BankAccounts amount={amount} />}
            </main>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Withdraw;
