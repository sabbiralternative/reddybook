import { useEffect } from "react";
import { useVideoMutation } from "../../../redux/features/events/events";
import { useParams } from "react-router-dom";
import { Settings } from "../../../api";
import BetSlip from "./BetSlip";
import OpenBets from "./OpenBets";

const RightSidebar = ({ score, showTv }) => {
  const { eventId, eventTypeId } = useParams();
  const [sportsVideo, { data: iframe }] = useVideoMutation();
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
    <div data-v-4efaf06d className="col-sm-0 col-md-0 col-lg-4">
      <div data-v-4efaf06d className="placed-bet-sec">
        {score && iframe?.result?.url && score?.hasVideo && showTv && (
          <div data-v-4efaf06d="" className="placed-bet-head open-bet">
            <span data-v-4efaf06d="">Live Stream</span>
          </div>
        )}
        {score && iframe?.result?.url && score?.hasVideo && showTv && (
          <div data-v-4efaf06d="" className="live-match-sec">
            <iframe
              data-v-4efaf06d=""
              src={iframe?.result?.url}
              scrolling="no"
              frameBorder="0"
              className="tv-iframe"
              style={{ height: "235px !important", width: "100%" }}
            ></iframe>
          </div>
        )}

        <div data-v-4efaf06d className="placed-bet-head">
          <span data-v-4efaf06d>Place Bet</span>
        </div>

        <BetSlip />

        <OpenBets />
      </div>
    </div>
  );
};

export default RightSidebar;
