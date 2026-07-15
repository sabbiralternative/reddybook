import { useParams } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetEventDetailsQuery,
  useVideoMutation,
} from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";
import RightSidebar from "../../components/modules/EventDetails/RightSidebar";
import Fancy from "../../components/modules/EventDetails/Fancy";
import Score from "../../components/modules/EventDetails/Score";
import HorseGreyhoundEventDetails from "../../components/modules/EventDetails/HorseGreyhoundEventDetails";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import { Settings } from "../../api";
import TennisScore from "../../components/modules/EventDetails/TennisScore";
import FootballScore from "../../components/modules/EventDetails/FootballScore";
import OpenBets from "../../components/modules/EventDetails/OpenBets";
import Premium from "../../components/modules/EventDetails/Premium";

const EventDetails = () => {
  const [showTv, setShowTv] = useState(true);
  const [tab, setTab] = useState("market");
  const [sportsVideo, { data: iframe }] = useVideoMutation();
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);
  const { windowWidth } = useSelector((state) => state.global);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    },
  );

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match",
  );

  useEffect(() => {
    const handleGetVideo = async () => {
      const payload = {
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",
        casinoCurrency: Settings.casino_currency,
      };
      await sportsVideo(payload).unwrap();
    };
    handleGetVideo();
  }, []);
  return (
    <SidebarLayout>
      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
        <div>
          <div data-v-4efaf06d className="right-side-bar-main-sec">
            <section data-v-4efaf06d className="events-details-sec">
              <div data-v-4efaf06d className="row g-3">
                <div data-v-4efaf06d className="col-sm-12 col-md-12 col-lg-8">
                  <div data-v-4efaf06d className="comentry-box-sec">
                    <div data-v-4efaf06d className="comenrty-head">
                      <div data-v-4efaf06d className="country-vs-country ">
                        <span data-v-4efaf06d>
                          {" "}
                          {data?.result?.[0]?.eventName}
                        </span>
                      </div>
                      <div data-v-4efaf06d className="open-bet-tv-sec">
                        <ul data-v-4efaf06d>
                          {/* <li data-v-4efaf06d>
                            <button
                              data-v-4efaf06d
                              className="hide-show-filter-btn"
                              data-bs-target="#filterModal"
                              data-bs-toggle="modal"
                            >
                              <img
                                data-v-4efaf06d
                                loading="lazy"
                                src="/icon/filter-outline.a4d53624.svg"
                                alt="filter-fill"
                              />
                            </button>
                          </li> */}

                          <li data-v-4efaf06d>
                            <button
                              onClick={() => setShowTv((prev) => !prev)}
                              data-v-4efaf06d
                              className="score-icon-btn"
                            >
                              <img
                                data-v-4efaf06d
                                loading="lazy"
                                className="outline-icon"
                                src="/icon/score-outline.cb282d9e.svg"
                                alt="score-outline"
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {windowWidth < 500 && (
                      <div className="flex items-center my-2 gap-x-2">
                        <button
                          className={`active:opacity-70 px-2 tracking-wide text-white font-bold leading-none relative overflow-hidden text-[11px] transition-all duration-150 ease-in-out rounded-md text-center flex items-center justify-center flex-row h-[26px]  shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-white/20 loss ${
                            tab === "market"
                              ? "bg-[var(--primary-color)]"
                              : "bg-gray-500"
                          }`}
                          onClick={() => setTab("market")}
                        >
                          Market
                        </button>
                        <button
                          className={`active:opacity-70 px-2 tracking-wide text-white font-bold leading-none relative overflow-hidden text-[11px] transition-all duration-150 ease-in-out rounded-md text-center flex items-center justify-center flex-row h-[26px]  shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-white/20 loss ${
                            tab === "open-bets"
                              ? "bg-[var(--primary-color)]"
                              : "bg-gray-500"
                          }`}
                          onClick={() => setTab("open-bets")}
                        >
                          Open Bets
                        </button>
                      </div>
                    )}
                    {tab === "market" && (
                      <Fragment>
                        {eventTypeId == 2 &&
                          data?.score &&
                          Object.keys(data?.score).length > 1 && (
                            <TennisScore
                              eventTypeId={eventTypeId}
                              score={data?.score}
                            />
                          )}
                        {eventTypeId == 1 && data?.score && (
                          <FootballScore score={data?.score} />
                        )}

                        {eventTypeId == 4 && data?.iscore && (
                          <Score iscore={data?.iscore} />
                        )}
                        {data?.score && data?.score?.tracker && (
                          <div className="w-full overflow-hidden h-[125px]">
                            <iframe
                              id="videoComponent"
                              className="w-full h-auto relative overflow-hidden   bg-transparent"
                              src={data?.score?.tracker}
                              width="100%"
                              allowfullscreen=""
                            ></iframe>
                          </div>
                        )}
                        {iframe?.result?.url &&
                          data?.score?.hasVideo &&
                          showTv &&
                          windowWidth < 500 && (
                            <iframe
                              id="videoComponent"
                              className="w-full max-h-[309px] sm:max-h-[144px] lg:max-h-[309px] relative overflow-hidden h-[55vw] md:h-[58vw] bg-transparent mt-2"
                              src={iframe?.result?.url}
                              width="100%"
                              allowfullscreen=""
                            ></iframe>
                          )}
                        <section
                          data-v-4efaf06d
                          className="match-odd-bookmaker-sec"
                        >
                          <div
                            data-v-4efaf06d
                            className="accordion"
                            id="accordionPanelsStayOpenExample"
                          >
                            {matchOdds?.length > 0 && (
                              <MatchOdds data={matchOdds} />
                            )}

                            {bookmaker?.length > 0 && (
                              <Bookmaker data={bookmaker} />
                            )}
                          </div>
                        </section>

                        {data?.result?.length > 0 && (
                          <Fancy data={data?.result} />
                        )}
                        {eventTypeId == 7 || eventTypeId == 4339 ? (
                          <HorseGreyhoundEventDetails data={data?.result} />
                        ) : null}
                        {tiedMatch?.length > 0 && (
                          <MatchOdds data={tiedMatch} />
                        )}
                        {data?.premium && data?.premium?.eventId && (
                          <Premium premium={data?.premium} />
                        )}
                      </Fragment>
                    )}

                    {tab === "open-bets" && <OpenBets />}
                  </div>
                </div>
                <RightSidebar score={data?.score} showTv={showTv} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default EventDetails;
