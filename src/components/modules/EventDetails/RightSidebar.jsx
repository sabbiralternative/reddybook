import { useEffect, useState } from "react";
import { useVideoMutation } from "../../../redux/features/events/events";
import { useParams } from "react-router-dom";
import { Settings } from "../../../api";
import BetSlip from "./BetSlip";

const RightSidebar = ({ score }) => {
  const { eventId, eventTypeId } = useParams();
  const [sportsVideo] = useVideoMutation();
  const [iFrame, setIFrame] = useState("");
  const handleGetVideo = async () => {
    const payload = {
      eventTypeId: eventTypeId,
      eventId: eventId,
      type: "video",
      casinoCurrency: Settings.casinoCurrency,
    };
    const res = await sportsVideo(payload).unwrap();
    if (res?.success) {
      setIFrame(res?.result?.url);
    }
  };

  useEffect(() => {
    if (score?.hasVideo) {
      handleGetVideo();
    }
  }, []);
  return (
    <div data-v-4efaf06d className="col-sm-0 col-md-0 col-lg-4">
      <div data-v-4efaf06d className="placed-bet-sec">
        {score && iFrame && score?.hasVideo && (
          <div data-v-4efaf06d="" className="placed-bet-head open-bet">
            <span data-v-4efaf06d="">Live Stream</span>
          </div>
        )}
        {score && iFrame && score?.hasVideo && (
          <div data-v-4efaf06d="" className="live-match-sec">
            <iframe
              data-v-4efaf06d=""
              src={iFrame}
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
      </div>
    </div>
  );
};

export default RightSidebar;
