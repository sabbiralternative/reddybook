import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import toast from "react-hot-toast";
import Ladder from "../../modals/Ladder/Ladder";
import BetSlip from "./BetSlip";

const Fancy = ({ data }) => {
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true,
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { windowWidth } = useSelector((state) => state.global);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (games?.status !== "OPEN") return;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId,
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };

      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      toast.error("Please login to place a bet.");
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };
  return (
    <>
      {ladderData?.length > 0 && (
        <Ladder
          ladderData={ladderData}
          setLadderData={setLadderData}
          marketName={marketName}
        />
      )}
      {fancyData?.length > 0 && (
        <section data-v-4efaf06d className="fancy-tab-sec">
          <div data-v-4efaf06d className="fancy-tab-list">
            <ul
              data-v-4efaf06d
              className="nav nav-tabs"
              id="myTab"
              role="tablist"
            >
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link active"
                  id="all-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Fancy
                </button>
              </li>
            </ul>
            <div data-v-4efaf06d className="tab-content" id="myTabContent">
              <div
                data-v-4efaf06d
                className="tab-pane fade show collapes-con-sec"
                id="premium-fancy-m-tab"
                role="tabpanel"
                aria-labelledby="premium-fancy-m-tab-tab"
              >
                <div data-v-4efaf06d className="score-img"></div>
              </div>
            </div>
            <div data-v-4efaf06d className="tab-content" id="myTabContent">
              <div
                data-v-4efaf06d
                className="tab-pane fade show active"
                id="all"
                role="tabpanel"
                aria-labelledby="all-tab"
              >
                <div data-v-4efaf06d className="fancyMarket-details-list">
                  <div
                    data-v-4efaf06d
                    className="fancy-market-tabs-details-sec"
                  >
                    <div data-v-4efaf06d className="row g-0">
                      <div data-v-4efaf06d className="col-8 col-md-6"></div>
                      <div data-v-4efaf06d className="col-4 col-md-6">
                        <div data-v-4efaf06d className="fancy-group-box">
                          <div data-v-4efaf06d className="fancy-box-1">
                            <button
                              data-v-4efaf06d
                              type="button"
                              className="yes-no-btn back-title"
                            >
                              No
                            </button>
                            <button
                              data-v-4efaf06d
                              type="button"
                              className="yes-no-btn lay-title"
                            >
                              Yes
                            </button>
                          </div>
                          <div
                            data-v-4efaf06d
                            className="fancy-box-1 fancy-min-max"
                          >
                            <button data-v-4efaf06d type="button" />
                            <button data-v-4efaf06d type="button" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {fancyData?.map((game) => {
                    const pnl = pnlBySelection?.find(
                      (pnl) => pnl?.MarketId === game?.id,
                    );

                    return (
                      <div
                        key={game?.id}
                        data-v-4efaf06d
                        className="fancy-market-tabs-details-sec bet-slip-area"
                      >
                        <div data-v-4efaf06d className="row g-0">
                          <div data-v-4efaf06d className="col-8 col-md-6">
                            <div
                              data-v-4efaf06d
                              className="fancy-tab-lft-content"
                            >
                              <div
                                data-v-4efaf06d
                                className="fancy-left-title-info"
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span
                                  data-v-4efaf06d
                                  className="market-event-head"
                                >
                                  {game?.name}
                                </span>
                                <div
                                  data-v-4efaf06d
                                  className="back-lay-status"
                                >
                                  {" "}
                                  {pnl ? (
                                    <span
                                      onClick={() =>
                                        handleGetLadder(pnl, game?.name)
                                      }
                                      className="col-span-2 md:col-span-2 flex flex-row items-center justify-end"
                                    >
                                      <div className="opacity-100 cursor-pointer">
                                        <svg
                                          height="18"
                                          width="18"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="63d691358b4e4026f6539708_stairs 1">
                                            <path
                                              id="Vector"
                                              d="M5.21875 3.13672V13.1367"
                                              stroke="var(--primary-color)"
                                            ></path>
                                            <path
                                              id="Vector_2"
                                              d="M5.21875 5.48047H10.5312"
                                              stroke="var(--primary-color)"
                                            ></path>
                                            <path
                                              id="Vector_3"
                                              d="M5.21875 8.13672H10.5312"
                                              stroke="var(--primary-color)"
                                            ></path>
                                            <path
                                              id="Vector_4"
                                              d="M5.21875 11.1055H10.5312"
                                              stroke="var(--primary-color)"
                                            ></path>
                                            <path
                                              id="Vector_5"
                                              d="M10.5312 3.13672V13.1367"
                                              stroke="var(--primary-color)"
                                            ></path>
                                          </g>
                                        </svg>
                                      </div>
                                    </span>
                                  ) : (
                                    <span className="col-span-2 md:col-span-2 flex flex-row items-center justify-end">
                                      <div className="opacity-50 cursor-not-allowed">
                                        <svg
                                          height="18"
                                          width="18"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="63d691358b4e4026f6539708_stairs 1">
                                            <path
                                              id="Vector"
                                              d="M5.21875 3.13672V13.1367"
                                              stroke="var(--secondary-color)"
                                            ></path>
                                            <path
                                              id="Vector_2"
                                              d="M5.21875 5.48047H10.5312"
                                              stroke="var(--secondary-color)"
                                            ></path>
                                            <path
                                              id="Vector_3"
                                              d="M5.21875 8.13672H10.5312"
                                              stroke="var(--secondary-color)"
                                            ></path>
                                            <path
                                              id="Vector_4"
                                              d="M5.21875 11.1055H10.5312"
                                              stroke="var(--secondary-color)"
                                            ></path>
                                            <path
                                              id="Vector_5"
                                              d="M10.5312 3.13672V13.1367"
                                              stroke="var(--secondary-color)"
                                            ></path>
                                          </g>
                                        </svg>
                                      </div>
                                    </span>
                                  )}
                                  {pnl && (
                                    <div
                                      className={`  ${
                                        pnl?.pnl > 0
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {pnl?.pnl}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            data-v-4efaf06d
                            className="col-4 col-md-6 relative"
                          >
                            <div data-v-4efaf06d className="fancy-group-box">
                              <div data-v-4efaf06d className="fancy-box-1 ">
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      game?.runners?.[0],
                                      game?.runners?.[0]?.lay?.[0]?.line,
                                      game?.runners?.[0]?.lay?.[0]?.price,
                                    )
                                  }
                                  data-v-4efaf06d
                                  type="button"
                                  className="fancy-betting-box light-pink"
                                >
                                  <span data-v-4efaf06d>
                                    <b data-v-4efaf06d>
                                      {" "}
                                      {game?.runners?.[0]?.lay?.[0]?.line}
                                    </b>
                                  </span>
                                  <span data-v-4efaf06d>
                                    {" "}
                                    {game?.runners?.[0]?.lay?.[0]?.price}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      game?.runners?.[0],
                                      game?.runners?.[0]?.back?.[0]?.line,
                                      game?.runners?.[0]?.back?.[0]?.price,
                                    )
                                  }
                                  data-v-4efaf06d
                                  type="button"
                                  className="fancy-betting-box light-blue"
                                >
                                  <span data-v-4efaf06d>
                                    <b data-v-4efaf06d>
                                      {" "}
                                      {game?.runners?.[0]?.back?.[0]?.line}
                                    </b>
                                  </span>
                                  <span data-v-4efaf06d>
                                    {" "}
                                    {game?.runners?.[0]?.back?.[0]?.price}
                                  </span>
                                </button>
                              </div>
                              <div
                                data-v-4efaf06d
                                className="fancy-box-1 fancy-min-max"
                              >
                                <div
                                  data-v-4efaf06d
                                  className="max-min-bet-rgt-box"
                                >
                                  <span data-v-4efaf06d>
                                    Min : {game?.minLiabilityPerBet}
                                  </span>
                                  <span data-v-4efaf06d>
                                    Max : {game?.maxLiabilityPerBet}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {game?.status !== "SUSPENDED" && (
                              <span
                                className="suspended__div"
                                style={{ right: "unset" }}
                              >
                                <b>SUSPENDED</b>
                              </span>
                            )}
                          </div>
                        </div>
                        {game?.id === runnerId && windowWidth < 500 && (
                          <BetSlip currentPlaceBetEvent={game} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Fancy;
