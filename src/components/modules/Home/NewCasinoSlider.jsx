import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewCasinoSlider = ({ data }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
  };

  return (
    <div className="new-launch-game-wrapper">
      <div className="list-sport-title">
        <span>new launch</span>
      </div>
      <div className="new-launch-game-sec">
        {data?.map((casino) => {
          return (
            <div key={casino?.id} className="new-launch-game-img">
              <a onClick={() => handleNavigateToIFrame(casino)}>
                <img src={casino?.url_thumb} alt={casino?.name} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewCasinoSlider;
