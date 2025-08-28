import { useNavigate } from "react-router-dom";

const CasinoThumbnail = ({ casinoData }) => {
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    navigate(
      `/casino/${casino?.name?.replace(/ /g, "")}/${casino?.event_type_id}`
    );
  };
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-all11"
        role="tabpanel"
        aria-labelledby="pills-all11-tab"
      >
        <div className="all-in-casino-img">
          {casinoData?.map((casino) => {
            return (
              <div
                onClick={() => handleNavigateToIFrame(casino)}
                key={casino?.id}
                className="all-star-model-img"
              >
                <a>
                  <div className="casinoicons">
                    <img
                      loading="lazy"
                      src={casino?.url_thumb}
                      alt={casino?.name}
                    />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CasinoThumbnail;
