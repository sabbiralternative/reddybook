import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useBalance from "../../../hooks/balance";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useExposure } from "../../../hooks/exposure";
import { useOrderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setPredictOdd,
  setPrice,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";

const BetSlip = () => {
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  //   const { token } = useSelector((state) => state.auth);
  const { price, stake, placeBetValues } = useSelector((state) => state.event);
  const { eventId } = useParams();
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchExposure } = useExposure(eventId);
  const [betDelay, setBetDelay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  useEffect(() => {
    if (betDelay <= 0) {
      setBetDelay(null);
    }

    dispatch(setPrice(placeBetValues?.price));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize.toFixed(2)
          : null
      )
    );
  }, [placeBetValues, betDelay, dispatch]);

  useEffect(() => {
    dispatch(setPredictOdd([]));
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */
  const handleOrderBets = async () => {
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ];
    setLoading(true);
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      delay = 9000;
    } else {
      setBetDelay(placeBetValues?.betDelay);
      delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    }

    setTimeout(async () => {
      const res = await createOrder(payloadData).unwrap();

      if (res?.success) {
        setLoading(false);
        refetchExposure();
        refetchBalance();
        refetchCurrentBets();
        dispatch(setShowLoginModal(false));
        setBetDelay("");
        toast.success(res?.result?.result?.placed?.[0]?.message);
        dispatch(setPlaceBetValues(null));
      } else {
        setLoading(false);
        toast.error(
          res?.error?.status?.[0]?.description || res?.error?.errorMessage
        );
        setBetDelay(null);
      }
    }, delay);
  };

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
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };
  return (
    <div data-v-4efaf06d className="stake-bet-desk-sec">
      {placeBetValues && (
        <div
          data-v-4efaf06d
          className="stake-placed-bet stake-light-blue-box"
          style={{ display: "block" }}
        >
          <div data-v-4efaf06d className="bets-odd-sec">
            <div data-v-4efaf06d className="inpt-grp-lft">
              <div data-v-4efaf06d className="increment-decrement-sec">
                {!placeBetValues?.isWeak && (
                  <div
                    onClick={() =>
                      handleDecreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice
                      )
                    }
                    data-v-4efaf06d
                    className="value-button"
                    id="decrease"
                  >
                    {" "}
                    -
                  </div>
                )}

                <div data-v-4efaf06d className="select-digit">
                  <input
                    onChange={(e) => dispatch(setPrice(e.target.value))}
                    data-v-4efaf06d
                    type="number"
                    className="form-control"
                    id="number"
                    value={price}
                  />
                </div>
                {!placeBetValues?.isWeak && (
                  <div
                    onClick={() =>
                      handleIncreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice
                      )
                    }
                    data-v-4efaf06d
                    className="value-button"
                    id="increase"
                  >
                    +{" "}
                  </div>
                )}
              </div>
            </div>
            <div data-v-4efaf06d className="inpt-grp-rgt">
              <input
                onChange={(e) => dispatch(setStake(e.target.value))}
                data-v-4efaf06d
                type="number"
                className="form-control"
                placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                value={stake !== null && stake}
              />
            </div>
          </div>
          <div data-v-4efaf06d className="value-btn-grid-box">
            {parseButtonValues?.slice?.(0, 6)?.map((button, i) => (
              <div
                key={i}
                onClick={() => dispatch(setStake(button?.value))}
                data-v-4efaf06d
                className="value-small-box"
              >
                <button data-v-4efaf06d type="button">
                  <span data-v-4efaf06d>+ </span> {button?.value}
                </button>
              </div>
            ))}
          </div>
          <div data-v-4efaf06d className="stake-limit-grid">
            <div data-v-4efaf06d className="stake-small-box">
              <button
                onClick={() => dispatch(setStake(50))}
                data-v-4efaf06d
                type="button"
                className="stake-1"
              >
                min stake
              </button>
            </div>
            <div
              onClick={() => dispatch(setStake(10000))}
              data-v-4efaf06d
              className="stake-small-box"
            >
              <button data-v-4efaf06d type="button" className="stake-2">
                max stake
              </button>
            </div>
            {/* <div data-v-4efaf06d className="stake-small-box">
              <button data-v-4efaf06d type="button" className="stake-3">
                Edit Stake
              </button>
            </div> */}
            <div data-v-4efaf06d className="stake-small-box">
              <button data-v-4efaf06d type="button" className="stake-4">
                clear
              </button>
            </div>
          </div>
          <div data-v-4efaf06d className="stake-min-max">
            <p data-v-4efaf06d>Min Bet: 100 Max Bet: 5000</p>
          </div>
          <div data-v-4efaf06d className="cancel-placed-btn">
            <div data-v-4efaf06d className="cancel-btn">
              <button
                onClick={() => {
                  dispatch(setPredictOdd([]));
                  dispatch(setPlaceBetValues(null));
                }}
                data-v-4efaf06d
                type="button"
                className="close-btn-1"
              >
                Cancel
              </button>
            </div>
            <div data-v-4efaf06d className="placed-btn">
              <button
                onClick={handleOrderBets}
                data-v-4efaf06d
                className="place-btn-outline"
                type="button"
              >
                {loading ? (
                  <div
                    data-v-4efaf06d=""
                    className="text-center"
                    id="Otp_loader"
                  >
                    <div
                      data-v-4efaf06d=""
                      className="spinner-border"
                      role="status"
                    >
                      <span data-v-4efaf06d="" className="visually-hidden">
                        Loading...
                      </span>
                    </div>
                  </div>
                ) : (
                  <span data-v-4efaf06d>Place Bet</span>
                )}

                {/**/}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
