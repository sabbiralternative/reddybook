import { Settings } from "../../../api";
import { useLiveCasinoIFrame } from "../../../hooks/liveCasinoIframe";

const Premium = ({ premium }) => {
  const payload = {
    gameId: premium?.gameId,
    provider: premium?.provider,
    eventId: premium?.eventId,
    isHome: false,
    mobileOnly: true,
    casinoCurrency: Settings.casino_currency,
  };

  const { data } = useLiveCasinoIFrame(payload);

  return (
    <>
      <button
        className="btn mb-2"
        style={{
          background: "var(--primary-color)",
          padding: "6px 0px",
          fontSize: "14px",
          fontWeight: "600",
          width: "100%",
          color: "white",
          margin: "3px 0px",
        }}
      >
        Premium
      </button>
      {premium && (
        <div
          className="w-full h-full min-h-screen"
          style={{ height: "100%", minHeight: "100vh" }}
        >
          <iframe
            id="videoComponent"
            style={{ height: "100%", minHeight: "100vh" }}
            className="w-full h-full min-h-screen relative    bg-transparent"
            src={data?.gameUrl}
            width="100%"
            allowfullscreen=""
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Premium;
