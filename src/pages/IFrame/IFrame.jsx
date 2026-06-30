import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userToken } from "../../redux/features/auth/authSlice";
import { API, Settings } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { Loader } from "rsuite";

const IFrame = () => {
  const [loading, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState("");
  const { gameId } = useParams();
  const token = useSelector(userToken);

  /* get iframe url */
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCasinoVideo = async () => {
      setLoading(true);
      const payload = {
        gameId: gameId,
        isHome: false,
        mobileOnly: true,
        casinoCurrency: Settings.casino_currency,
      };

      try {
        const res = await AxiosSecure.post(API.liveCasinoIFrame, payload);

        const data = res?.data;

        setIFrame(data?.gameUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    };
    getCasinoVideo();
  }, [gameId, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="md" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex white bg-gray1 mt-28">
      <div className="h-full w-full overflow-auto hide-scrollbar">
        <div className="w-full router-ctn">
          <div className="flex flex-col transition-all  ease-in-out duration-100 pt-0 h-full min-h-screen">
            <div className="flex items-start justify-start w-full h-full min-h-screen">
              <div className="w-full md:mt-[0px] lg:overflow-auto lg:w-full h-full min-h-screen">
                <div className="' bg-transparent w-full h-full min-h-screen">
                  <div className="w-full flex h-full min-h-screen">
                    <iframe
                      src={iFrame}
                      title="AVIATOR"
                      className="w-full h-full flex-grow no-scrollbar h-full min-h-screen"
                      allowFullscreen={true}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrame;
