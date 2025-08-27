import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const Fancy = ({ data }) => {
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
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
            (p) => p?.RunnerId === runner?.selectionId
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
      dispatch(setShowLoginModal(true));
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
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="premium_fancy-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Premium Fancy
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="line_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Line Markets
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="session_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Session Markets
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="over_by_over_session_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Over Session Market
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="ball_by_ball-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Ball By Ball
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="fall_of_wicket-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Fall Of Wicket
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="other_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Other Markets
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="total_advance-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Total Advance
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="meter_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Meter Markets
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="khado_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Khado Markets
                </button>
              </li>
              <li data-v-4efaf06d className="nav-item" role="presentation">
                <button
                  data-v-4efaf06d
                  className="nav-link"
                  id="odd_even_markets-tab"
                  data-bs-toggle="tab"
                  type="button"
                  role="tab"
                >
                  Odd Event Markets
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
                <div data-v-4efaf06d className="fancyMarket-details-list"></div>
                <div data-v-4efaf06d className="fancyMarket-details-list"></div>
                <div data-v-4efaf06d className="fancyMarket-details-list"></div>
                <div data-v-4efaf06d className="fancyMarket-details-list">
                  <div
                    data-v-4efaf06d
                    className="fancy-market-tabs-details-sec"
                  >
                    <div data-v-4efaf06d className="row g-0">
                      <div data-v-4efaf06d className="col-8">
                        <span data-v-4efaf06d className="mrkname">
                          Session Markets
                        </span>
                      </div>
                      <div data-v-4efaf06d className="col-4">
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
                    const pnl =
                      pnlBySelection?.find(
                        (pnl) => pnl?.MarketId === game?.id
                      ) || {};

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
                              <span
                                data-v-4efaf06d
                                className="fav-pin-bookmark"
                              >
                                <i data-v-4efaf06d className="bi bi-bookmark" />
                              </span>
                              <div
                                data-v-4efaf06d
                                className="fancy-left-title-info"
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
                                />
                              </div>
                              <img
                                data-v-4efaf06d
                                loading="lazy"
                                className="has-com-icon"
                                src="data:image/webp;base64,UklGRp4DAABXRUJQVlA4WAoAAAAwAAAAEgAAEQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIqQAAAA2AYmvb4uYJRzLIWUY4sTlRDC6RVG4dM/MCppJbyahqR1aOjCyzG9pCREwAhusrJUPpyvO/kfQQUtdAegJq6BdEvhfRL2zA076BU3gfAxCEe7VHeL4GSO88hyMycPgMrpziEKvzbOCeiWf4zqDtEqWHMCA9q4zMOMFVzQLUUN31xV0QAr4X0RwZcrpQPm9pyc0zlN8NdMoDogvYQ/e91LFCQx9TltFuDZ0AVlA4IP4AAAAwBwCdASoTABIAPm0ukkakIqGhKA1QgA2JbACdM0ckmmA4AG2AsADpQ/IAKYB4rSF5d71bMK0C9dKVKyw3XKJaPYAA/uMtbXB9C3tKaUrXb3XuZUU+pzzqxYnOqsbJVZrICjys5Fpk60N18L8i6cb1Jt4Pbiat9XivPvCG8z2plCurmN4bz3kEAe7dkl4qzlENI7oWLx697ZMlwVQz3JsqFuFmd3KSGtJ+U+8kJZ5gZ/n3xqv/85kZqUKlIVCsd91nC/6TKMh7H33+5yZP9gFPZTN8xLAOpPWbxZY1Y7G/Es9/4Fn+5tJXsX3/yFv/gWf7m0lexff/Ji9ZtHAAAA=="
                              />
                            </div>
                          </div>
                          <div data-v-4efaf06d className="col-4 col-md-6">
                            <div data-v-4efaf06d className="fancy-group-box">
                              <div data-v-4efaf06d className="fancy-box-1">
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      game?.runners?.[0],
                                      game?.runners?.[0]?.lay?.[0]?.line,
                                      game?.runners?.[0]?.lay?.[0]?.price
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
                                      game?.runners?.[0]?.back?.[0]?.price
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
                                    Max Bet: {game?.maxLiabilityPerBet}
                                  </span>
                                  <span data-v-4efaf06d>
                                    Max Market: 100000
                                  </span>
                                </div>
                              </div>
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
        </section>
      )}
    </>
  );
};

export default Fancy;
