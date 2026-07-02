import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import toast from "react-hot-toast";
import SpeedCashOut from "../../modals/SpeedCashOut/SpeedCashOut";
import { isGameSuspended } from "../../../utils/isOddSuspended";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import { Settings } from "../../../api";
import BetSlip from "./BetSlip";

const Bookmaker = ({ data }) => {
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { windowWidth } = useSelector((state) => state.global);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
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
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
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
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
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

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    if (exposureA > 0 && exposureB > 0) {
      const difference = Math.abs(exposureA - exposureB);
      if (difference <= 10) {
        speedCashOut = true;
      }
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      data?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      data.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  return (
    <>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {data?.map((game) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === game?.id && profit?.isOnePositiveExposure,
        );

        return (
          <div key={game?.id} data-v-4efaf06d className="accordion-item">
            <h2
              data-v-4efaf06d
              className="accordion-header"
              id="heading-match-odd"
            >
              <div data-v-4efaf06d className="mark-lft-head">
                <div data-v-4efaf06d className="market-name">
                  <span data-v-4efaf06d className="mrkname">
                    {game?.name}
                  </span>
                </div>
                <div data-v-4efaf06d className="favourite-cashout-btn">
                  {Settings.cashout &&
                    game?.runners?.length !== 3 &&
                    game?.status === "OPEN" &&
                    !speedCashOut && (
                      <button
                        onClick={() =>
                          handleCashOutPlaceBet(
                            game,
                            "lay",
                            dispatch,
                            pnlBySelection,
                            token,
                            teamProfitForGame,
                          )
                        }
                        style={{
                          cursor: `${
                            !teamProfitForGame ? "not-allowed" : "pointer"
                          }`,
                          opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                        }}
                        className={`active:opacity-70 px-2 tracking-wide text-white font-bold leading-none relative overflow-hidden text-[11px] transition-all duration-150 ease-in-out rounded-md text-center flex items-center justify-center flex-row h-[26px]  shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-white/20 loss ${
                          teamProfitForGame?.profit > 0
                            ? "bg-[var(--primary-color)]"
                            : "bg-[var(--secondary-color)]"
                        }`}
                      >
                        <span className="text-white whitespace-nowrap">
                          CASHOUT
                          {/* {teamProfitForGame?.profit?.toString()?.length >
                                                2 && <br className="lg:hidden" />} */}
                          {teamProfitForGame?.profit &&
                            `(${teamProfitForGame.profit.toFixed(0)})`}
                        </span>
                      </button>
                    )}

                  {Settings.cashout &&
                    game?.runners?.length !== 3 &&
                    game?.status === "OPEN" &&
                    game?.name !== "toss" &&
                    speedCashOut && (
                      <button
                        onClick={() =>
                          setSpeedCashOut({
                            ...speedCashOut,
                            market_name: game?.name,
                            event_name: game?.eventName,
                          })
                        }
                        disabled={isGameSuspended(game)}
                        className=" active:opacity-70 loss-cut-btn px-2 tracking-wide text-white font-bold leading-none relative overflow-hidden text-[11px] transition-all duration-150 ease-in-out rounded-md text-center flex items-center justify-center flex-row h-[26px] cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-white/20"
                        style={{ background: "#82371b" }}
                      >
                        <span className="text-white whitespace-nowrap">
                          Speed Cashout
                        </span>
                      </button>
                    )}
                  {/* <i data-v-4efaf06d className="fa-regular fa-bookmark" /> */}
                </div>
              </div>
              <div data-v-4efaf06d className="min-max-head">
                <div data-v-4efaf06d className="minmax-value-top">
                  Min : {game?.minLiabilityPerBet} | Max :{" "}
                  {game?.maxLiabilityPerBet}
                </div>
                {/* <div
                  data-v-4efaf06d
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-match-odd0"
                  aria-expanded="true"
                  aria-controls="collapse-match-odd"
                /> */}
              </div>
            </h2>
            <div
              style={{ visibility: "visible" }}
              data-v-4efaf06d
              id="collapse-match-odd0"
              className="accordion-collapse collapse show"
              aria-labelledby="heading-match-odd"
              data-bs-parent="#accordionExample"
            >
              <div data-v-4efaf06d className="match-odd-body">
                <div data-v-4efaf06d className="accordion-body">
                  <div data-v-4efaf06d className="app-market-details-sec">
                    <div data-v-4efaf06d className="row g-0">
                      <div data-v-4efaf06d className="col-8" />
                      <div data-v-4efaf06d className="col-4">
                        <div data-v-4efaf06d className="btn-group-box">
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="btn-grp-12"
                          />
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="btn-grp-12"
                          />
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="back-title"
                          >
                            Back
                          </button>
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="lay-title"
                          >
                            Lay
                          </button>
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="btn-grp-12"
                          />
                          <button
                            data-v-4efaf06d
                            type="button"
                            className="btn-grp-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {game?.runners?.map((runner) => {
                    const pnl = pnlBySelection?.find(
                      (pnl) => pnl?.RunnerId === runner?.id,
                    );
                    const predictOddValues = predictOdd?.find(
                      (val) => val?.id === runner?.id,
                    );
                    return (
                      <div
                        key={runner?.id}
                        data-v-4efaf06d
                        className="app-market-details-sec bet-slip-area"
                      >
                        <div data-v-4efaf06d className="row g-0">
                          <div data-v-4efaf06d className="col-8">
                            <div data-v-4efaf06d className="market-event-name">
                              <span data-v-4efaf06d> {runner?.name}</span>
                              <div data-v-4efaf06d className="back-lay-status">
                                {" "}
                                {pnl && (
                                  <div
                                    className={`text-[11px]  ${
                                      pnl?.pnl > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {pnl?.pnl}
                                  </div>
                                )}
                                {stake && runnerId && predictOddValues && (
                                  <div
                                    className={`text-[11px]  ${
                                      predictOddValues?.exposure > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    » {predictOddValues?.exposure}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div data-v-4efaf06d className="col-4">
                            <div
                              data-v-4efaf06d
                              className="bet-details-btn-group"
                            >
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[2]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="back-light back"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {runner?.back?.[2]?.price || "-"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.back?.[2]?.size || "-"}{" "}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[1]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="back-light back"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {" "}
                                    {runner?.back?.[1]?.price || "-"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.back?.[1]?.size || "-"}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[0]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="back"
                                id="back-open-btn"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {" "}
                                    {runner?.back?.[0]?.price || "-"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.back?.[0]?.size || "-"}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[0]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="lay"
                                id="lay-open-btn"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {" "}
                                    {runner?.lay?.[0]?.price || "_"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.lay?.[0]?.size || "_"}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[1]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="lay-light lay"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {" "}
                                    {runner?.lay?.[1]?.price || "_"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.lay?.[1]?.size || "_"}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[2]?.price,
                                  )
                                }
                                data-v-4efaf06d
                                type="button"
                                className="lay-light lay"
                              >
                                <span data-v-4efaf06d>
                                  <b data-v-4efaf06d>
                                    {" "}
                                    {runner?.lay?.[2]?.price || "_"}
                                  </b>
                                </span>
                                <span data-v-4efaf06d>
                                  {" "}
                                  {runner?.lay?.[2]?.size || "_"}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        {runner?.id === runnerId && windowWidth < 500 && (
                          <BetSlip currentPlaceBetEvent={game} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Bookmaker;
