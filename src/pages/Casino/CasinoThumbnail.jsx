import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CasinoThumbnail = ({ casinoData }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
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
          {casinoData?.map((casino, i) => {
            return (
              <div
                onClick={() => handleNavigateToIFrame(casino)}
                key={`${casino?.id}-${casino?.category}-${casino?.product}-${i}`}
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
