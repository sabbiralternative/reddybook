import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentBets } from "../../hooks/currentBets";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import SidebarLayout from "../../layout/SidebarLayout";

const OpenBets = () => {
  const navigate = useNavigate();
  const { data: myBets } = useCurrentBets();
  const [openBets, setOpenBets] = useState(true);
  const orderedBets = [
    ...myBets.filter((bet) => bet.betType === "Back"),
    ...myBets.filter((bet) => bet.betType === "Lay"),
  ];

  return (
    <SidebarLayout>
      <div className="flex-1 flex white bg-gray1">
        <div className="h-full w-full overflow-auto hide-scrollbar mb-6 md:mb-0 md:px-2 md:pl-[15px] md:pr-3">
          <div className="w-full router-ctn max-md:pb-9">
            <main className="flex w-full flex-col">
              <div
                id="openBetsRightSide"
                title="Open Bets"
                className="py-2 px-3"
              >
                <div className="flex flex-col w-full gap-1">
                  <div
                    onClick={() => setOpenBets((prev) => !prev)}
                    id="matched_1"
                    className="px-3 py-2 cursor-pointer w-full flex items-center justify-between bg-primary rounded"
                  >
                    <span className="text-primary text-xs">Open Bets</span>
                    <div className="flex items-center justify-center autoAnimate text-primary">
                      {openBets ? (
                        <MdOutlineKeyboardArrowUp size={20} />
                      ) : (
                        <MdOutlineKeyboardArrowDown size={20} />
                      )}
                    </div>
                  </div>

                  {openBets &&
                    myBets?.length > 0 &&
                    orderedBets?.length > 0 && (
                      <div className="w-full origin-top scaleVerticalOpen">
                        <div className="flex flex-col gap-1 w-full">
                          {orderedBets?.map((bet, i) => {
                            return (
                              <div
                                key={i}
                                className="bg-bg_Quaternary rounded-md divide-y w-full shadow"
                              >
                                <div
                                  onClick={() => {
                                    navigate(
                                      `/event-details/${bet?.eventTypeId}/${bet?.eventId}`,
                                    );
                                  }}
                                  id="eventHeader"
                                  className="font-semibold px-3 py-2 cursor-pointer"
                                >
                                  <div
                                    className={`font-medium underline capitalize text-sm 
                    ${
                      bet?.betType === "Back"
                        ? "text-text_ChangeAnimationBack "
                        : "text-text_ChangeAnimationLay"
                    }
                    `}
                                  >
                                    {bet?.title}
                                  </div>
                                </div>
                                <div className="px-3 py-2 text-text_Ternary uppercase font-lato flex flex-col">
                                  <span className="font-semibold text-xs">
                                    {bet?.nation}
                                  </span>
                                  <span className="font-normal text-xs">
                                    {bet?.sports}
                                  </span>
                                </div>
                                <div
                                  id="tiem_Date_of_order_0_1724640350689"
                                  className="text-xs px-3 py-2 text-center bg-bg_Ternary8 font-lato font-normal rounded-b-md"
                                >
                                  PLACED - {bet?.placeDate}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {openBets &&
                    myBets?.length === 0 &&
                    orderedBets?.length === 0 && (
                      <div className="w-full origin-top scaleVerticalOpen">
                        <div className="w-full font-medium text-sm bg-bg_Quaternary rounded px-4 py-3 shadow text-text_Ternary">
                          You have no Open Bets.
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default OpenBets;
