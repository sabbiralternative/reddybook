import { useParams } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import MatchOddsBookmaker from "../../components/modules/EventDetails/MatchOddsBookmaker";
import RightSidebar from "../../components/modules/EventDetails/RightSidebar";
import Fancy from "../../components/modules/EventDetails/Fancy";
import Score from "../../components/modules/EventDetails/Score";

const EventDetails = () => {
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
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
                      <div data-v-4efaf06d className="country-vs-country">
                        <span data-v-4efaf06d>
                          {" "}
                          {data?.result?.[0]?.eventName}
                        </span>
                      </div>
                      <div data-v-4efaf06d className="open-bet-tv-sec">
                        <ul data-v-4efaf06d>
                          <li data-v-4efaf06d>
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
                          </li>

                          <li data-v-4efaf06d>
                            <button data-v-4efaf06d className="score-icon-btn">
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
                    {eventTypeId == 4 && data?.iscore && (
                      <Score iscore={data?.iscore} />
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
                        {data?.result?.length > 0 && (
                          <MatchOddsBookmaker data={data?.result} />
                        )}
                      </div>
                    </section>
                    {data?.result?.length > 0 && <Fancy data={data?.result} />}
                  </div>
                </div>
                <RightSidebar score={data?.score} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default EventDetails;
