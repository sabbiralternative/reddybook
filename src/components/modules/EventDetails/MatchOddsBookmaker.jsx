import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const MatchOddsBookmaker = ({ data }) => {
  const filterMatchOddsBookmaker = data?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true
  );
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
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
      dispatch(setShowLoginModal(true));
    }
  };

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
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
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      filterMatchOddsBookmaker?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      filterMatchOddsBookmaker.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
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
      {filterMatchOddsBookmaker?.length > 0 &&
        filterMatchOddsBookmaker?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
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
                    <i data-v-4efaf06d className="fa-regular fa-bookmark" />
                  </div>
                </div>
                <div data-v-4efaf06d className="min-max-head">
                  <div data-v-4efaf06d className="minmax-value-top">
                    Min : 100 | Max : {game?.maxLiabilityPerBet}
                  </div>
                  <div
                    data-v-4efaf06d
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-match-odd0"
                    aria-expanded="true"
                    aria-controls="collapse-match-odd"
                  />
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
                        (pnl) => pnl?.RunnerId === runner?.id
                      );
                      const predictOddValues = predictOdd?.find(
                        (val) => val?.id === runner?.id
                      );
                      return (
                        <div
                          key={runner?.id}
                          data-v-4efaf06d
                          className="app-market-details-sec bet-slip-area"
                        >
                          <div data-v-4efaf06d className="row g-0">
                            <div data-v-4efaf06d className="col-8">
                              <div
                                data-v-4efaf06d
                                className="market-event-name"
                              >
                                <span data-v-4efaf06d> {runner?.name}</span>
                                <div
                                  data-v-4efaf06d
                                  className="back-lay-status"
                                />
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
                                      runner?.back?.[2]?.price
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
                                      runner?.back?.[1]?.price
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
                                      runner?.back?.[0]?.price
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
                                      runner?.lay?.[0]?.price
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
                                      runner?.lay?.[1]?.price
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
                                      runner?.lay?.[2]?.price
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

export default MatchOddsBookmaker;
