import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./OpenBets.css";
import { useCurrentBets } from "../../../hooks/currentBets";
import useSBCashOut from "../../../hooks/sb_cashout";

const OpenBets = ({ sportsBook }) => {
  const navigate = useNavigate();
  const { eventId, eventTypeId } = useParams();
  const { data: myBets, refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { mutate: cashOut } = useSBCashOut();

  const [openBets, setOpenBets] = useState(true);

  const orderedBets = [
    ...myBets.filter((bet) => bet.betType === "Back"),
    ...myBets.filter((bet) => bet.betType === "Lay"),
  ];

  const navigateGameList = (item) => {
    navigate(`/event-details/${item?.eventTypeId}/${item?.eventId}`);
  };

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials",
    );

  const handleCashOut = ({ betHistory, sportsBook, price, cashout_value }) => {
    let item;
    sports?.forEach((group) => {
      group?.Items?.forEach((data) => {
        if (betHistory?.marketId == data?.Id) {
          item = data;
        }
      });
    });

    const column = item?.Items?.find(
      (col) => col?.Id === betHistory?.selectionId,
    );

    const payload = {
      price,
      cashout_value,
      back: true,
      side: 0,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.EventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
      betId: betHistory?.betId,
    };

    cashOut(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchCurrentBets();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error);
        }
      },
    });
  };

  return (
    <div id="openBetsRightSide" title="Open Bets">
      <div className="open-bets-wrapper">
        {/* Toggle Header */}
        <div
          onClick={() => setOpenBets((prev) => !prev)}
          id="matched_1"
          className="open-bets-header"
        >
          <span className="open-bets-header-title">Matched Bets</span>
          <div className="open-bets-header-icon">
            {openBets ? (
              <MdOutlineKeyboardArrowUp size={20} />
            ) : (
              <MdOutlineKeyboardArrowDown size={20} />
            )}
          </div>
        </div>

        {/* Bets List */}
        {openBets && myBets?.length > 0 && orderedBets?.length > 0 && (
          <div className="bets-container">
            <div className="bets-list">
              {/* Column Headers */}
              <div className="bets-column-headers">
                <span className="col-header market">Market</span>
                <span className="col-header center">Odds</span>
                <span className="col-header center">Stake</span>
              </div>

              {/* Bet Rows */}
              <div className="bets-rows">
                {orderedBets?.map((bet, i) => {
                  let column;
                  sports?.forEach((group) => {
                    group?.Items?.forEach((data) => {
                      if (bet?.marketId == data?.Id) {
                        column = data?.Items?.find(
                          (col) => col?.Id === bet?.selectionId,
                        );
                      }
                    });
                  });

                  const price = (
                    0.92 * bet?.amount * (bet?.userRate / column?.Price) -
                    bet?.amount
                  )?.toFixed(2);

                  return (
                    <div
                      onClick={() => navigateGameList(bet)}
                      key={i}
                      className={`bet-row ${bet?.betType === "Back" ? "stake-light-blue-box" : "stake-light-pink-box"}`}
                    >
                      <span className="bet-cell-nation">
                        <span>{bet?.nation}</span>

                        {bet?.cashout && eventId && eventTypeId && column && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCashOut({
                                betHistory: bet,
                                sportsBook,
                                price: column?.Price,
                                cashout_value: price,
                              });
                            }}
                            type="button"
                            className="cashout-btn"
                          >
                            <span className="cashout-label">Cashout</span>
                            {price && (
                              <span className="cashout-separator">:</span>
                            )}
                            {price && (
                              <span
                                className={`cashout-price ${
                                  price > 0 ? "positive" : "negative"
                                }`}
                              >
                                {price}
                              </span>
                            )}
                          </button>
                        )}
                      </span>

                      <span className="bet-cell-center">{bet?.userRate}</span>
                      <span className="bet-cell-center">{bet?.amount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {openBets && myBets?.length === 0 && orderedBets?.length === 0 && (
          <div className="empty-bets">
            <div className="empty-bets-message">You have no Matched Bets.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenBets;
