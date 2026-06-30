import toast from "react-hot-toast";
import { useBonusMutation } from "../../hooks/bonus";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useBalance from "../../hooks/balance";
import SidebarLayout from "../../layout/SidebarLayout";

const Promotions = () => {
  const { refetch } = useBalance();
  const [coupon, setCoupon] = useState(null);
  const { mutateAsync } = useBonusMutation();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    token ? navigate(link) : toast.error("Please login to claim coupon");
  };

  const claimCoupon = async () => {
    if (token) {
      if (!coupon) {
        return toast.error("Please enter a coupon code");
      }
      const data = await mutateAsync({
        type: "claimCoupon",
        coupon_code: coupon,
      });

      if (data?.success) {
        refetch();
        toast.success(data?.result);
        setCoupon(null);
      } else {
        toast.error(data?.error);
      }
    } else {
      toast.error("Please login to claim coupon");
    }
  };

  return (
    <SidebarLayout>
      <div className="flex-1 flex white bg-gray1">
        <div className="h-full w-full overflow-auto hide-scrollbar mb-6 md:mb-0 md:px-2 md:pl-[15px] md:pr-3">
          <div className="w-full router-ctn max-md:pb-9">
            <main className="flex w-full">
              <div className=" w-full h-max  py-3 px-2.5 flex flex-col gap-y-[15px]">
                <div className=" flex md:flex-row flex-col ring-1 ring-lossback_1 items-center w-full rounded-lg  bg-bg_color_lossback_card_bg ">
                  <div className="px-4 relative py-3 w-full md:w-fit overflow-hidden">
                    <div className="relative text-center z-20 text-white font-black leading-normal text-base tracking-wider uppercase">
                      Lossback bonus
                    </div>
                    <div className="h-[120%] aspect-square absolute bottom-0 translate-y-1/3 md:translate-y-1/2 left-0 z-10">
                      <div className="relative overflow-hidden w-full h-full">
                        <img
                          src={images.cashBundle}
                          alt="Lossback Bonus"
                          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                          className="  w-full h-full object-cover"
                          loading="lazy"
                          title="Lossback Bonus"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-0.5 w-[96%] h-0.5 md:h-8 rounded-full bg-cm_primary" />
                  <div className="flex items-center gap-1.5 w-full lg:w-fit flex-1 px-2 py-2 md:py-0">
                    {!token && (
                      <div className="flex flex-1 flex-col text-white leading-normal tracking-wider z-50">
                        <div className="text-base flex items-center gap-1 text-text_color_lossback_amt font-black w-full">
                          <div className="flex-1 bg-bg_color_avlnowLossback animate-pulse text-text_color_lossback_amt px-3 py-1 text-x font-bold flex items-center gap-1 rounded-full">
                            Login to view claims
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleNavigate("/lossback-bonus")}
                      className="relative overflow-hidden bg-bg_color_lossbackSeeAll ml-auto active:scale-[99%] transition-all duration-300 text-white whitespace-nowrap text-sm font-bold rounded px-4 py-2"
                      type="button"
                    >
                      VIEW ALL
                    </button>
                  </div>
                </div>
                <div className=" w-full  px-[9px]  flex flex-col justify-center relative overflow-hidden rounded-[10px] bg-bg_color_GiftCardBg gap-y-1.5 pb-[9px]">
                  <div className=" absolute top-0 right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={67}
                      height={16}
                      viewBox="0 0 67 16"
                      fill="none"
                    >
                      <path
                        d="M67 0H0L3.31268 5.64947C8.18926 13.966 18.3048 17.62 27.3705 14.3397L67 0Z"
                        fill="var(--icon-color-secondary)"
                        fillOpacity="0.15"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between gap-[9px] items-center h-full">
                    <div className="relative overflow-hidden w-full max-w-[70px] max-h-[auto]">
                      <img
                        src={images.redeemCardGift}
                        alt="ReddemCodeGift"
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                        className="  w-full h-full object-contain"
                        loading="eager"
                        title="ReddemCodeGift - 10Sports"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="flex flex-col items-start text-white gap-[0.5px]">
                      <div className="text-sm md:text-base font-bold  ">
                        Coupon Code
                      </div>
                      <div className="leading-4 text-x sm:text-xs md:text-sm tracking-wide font-normal opacity-80  text-white">
                        Type or Paste your coupon code and get rewards in your
                        wallet.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center w-full text-sm text-white font-normal  bg-bg_color_giftCardInputBg py-1 pl-[10px] pr-[6px] rounded-md border  focus-within:outline-none placeholder:text-white focus-within:shadow-sm cursor-text border-transparent focus-within:border-transparent ">
                      <input
                        value={coupon || ""}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="undefined flex-grow min-w-0 border-none focus:outline-none bg-transparent"
                        placeholder="Enter coupon code here"
                      />
                      <div className="flex-shrink-0 w-max">
                        <button
                          onClick={claimCoupon}
                          className="relative overflow-hidden w-max px-2 py-1  text-white bg-header-gradient  text-xs md:text-sm font-bold leading-4 rounded-md flex items-center justify-center relative cursor-pointer disabled:opacity-70 flex items-center gap-x-1 shadow-sm"
                          type="button"
                        >
                          <div className="flex items-center gap-x-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x={3} y={8} width={18} height={4} rx={1} />
                              <path d="M12 8v13" />
                              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                            </svg>
                            <span>Redeem</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Promotions;
