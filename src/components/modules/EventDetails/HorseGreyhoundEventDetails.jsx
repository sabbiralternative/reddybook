import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const HorseGreyhoundEventDetails = ({ data }) => {
  const { eventId } = useParams();
  const { data: exposure } = useExposure(eventId);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [timeDiff, setTimeDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    if (!data?.[0]?.openDate) return;

    const targetDateStr = data[0].openDate;
    const [date, time] = targetDateStr.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const diffInMs = targetDate - currentDate;

        if (diffInMs <= 0) {
          clearInterval(interval);
          setTimeDiff({ day: 0, hour: 0, minute: 0, second: 0 });
          return;
        }

        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((diffInMs % (1000 * 60)) / 1000);

        setTimeDiff({ day, hour, minute, second });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

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
        selectedBetName: runner?.horse_name,
        name: games.runners.map((runner) => runner.horse_name),
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
        dispatch(setRunnerId(runner?.id));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <>
      {" "}
      <div className="horse-banner">
        <img
          style={{ width: "100%" }}
          src="https://g1ver.sprintstaticdata.com/v42/static/front/img/10.png"
          className="img-fluid"
        />
        <div className="horse-banner-detail">
          <div className="text-success">OPEN</div>
          {timeDiff?.day ||
          timeDiff?.hour ||
          timeDiff?.minute ||
          timeDiff?.second ? (
            <div className="horse-timer">
              <span style={{ display: "flex", gap: "5px" }}>
                {timeDiff?.day > 0 && (
                  <span>
                    {timeDiff?.day} <small>Day</small>
                  </span>
                )}
                {timeDiff?.hour > 0 && (
                  <span>
                    {timeDiff?.hour} <small>Hour</small>
                  </span>
                )}
                {timeDiff?.minute > 0 && (
                  <span>
                    {timeDiff?.minute} <small>Minutes</small>
                  </span>
                )}
                {timeDiff?.hour === 0 && timeDiff?.minute < 60 && (
                  <span>
                    {timeDiff?.second} <small>Seconds</small>
                  </span>
                )}
              </span>
              <span>Remaining</span>
            </div>
          ) : null}

          <div className="time-detail">
            <p>{data?.[0]?.eventName}</p>
            <h5>
              <span>{data?.[0]?.openDate}</span>
              <span>| {data?.[0]?.raceType}</span>
            </h5>
          </div>
        </div>
      </div>
      {data?.map((game) => {
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
                    return (
                      <div
                        key={runner?.id}
                        data-v-4efaf06d
                        className="app-market-details-sec bet-slip-area"
                      >
                        <div data-v-4efaf06d className="row g-0">
                          <div data-v-4efaf06d className="col-8">
                            <div data-v-4efaf06d className="market-event-name">
                              <span data-v-4efaf06d> {runner?.horse_name}</span>
                              <div data-v-4efaf06d className="back-lay-status">
                                {" "}
                                <div
                                  className="jockey-detail sm-d-none d-md-flex"
                                  style={{ display: "flex" }}
                                >
                                  {runner?.jocky && (
                                    <span className="jockey-detail-box">
                                      <b>Jockey:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.jocky}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.trainer && (
                                    <span className="jockey-detail-box">
                                      <b>Trainer:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.trainer}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.age && (
                                    <span className="jockey-detail-box">
                                      <b>Age:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.age}
                                      </span>
                                    </span>
                                  )}
                                </div>
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

export default HorseGreyhoundEventDetails;
