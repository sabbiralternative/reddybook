import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const CasinoSlider = ({ highlight_casino }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) {
      dispatch(setShowLoginModal(true));
    } else {
      navigate(
        `/casino?product=${casino?.product}&category=${casino?.category}`,
      );
    }
  };
  return (
    <div className="listing-mobile-page">
      <div className="mobile-home-page">
        <div className="mobile-exch-main-box">
          {highlight_casino?.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => handleNavigateToIFrame(item)}
                className="exch-coupon-card static-cls"
              >
                <img loading="lazy" src={item?.url_thumb} alt="Aviator" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CasinoSlider;
