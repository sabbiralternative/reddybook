/* eslint-disable react/no-unknown-property */
import { useNavigate, useParams } from "react-router-dom";
import { useGroupQuery } from "../../../redux/features/events/events";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import "../../../assets/css/horseGreyhound.css";

const HorseGreyhound = () => {
  const { id } = useParams();
  const { data } = useGroupQuery(
    { sportsType: id },
    {
      pollingInterval: 1000,
    },
  );
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    data?.[0]?.childs?.[0]?.countryCode,
  );

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.[0]?.childs?.[0]?.countryCode);
    }
  }, [data]);

  const findChildByCountryCode =
    selectedCategory &&
    data &&
    data?.[0]?.childs?.find((child) => child?.countryCode === selectedCategory);

  const convertToIST = (utc) => {
    return moment(utc).tz("Asia/Kolkata").format("HH:mm");
  };

  const eventName = { 7: "Horse Racing", 4339: "Greyhound Racing" };

  return (
    <div _ngcontent-wne-c149="" className="horse-greyhound">
      <div
        _ngcontent-wne-c149=""
        className="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <div
          _ngcontent-wne-c149=""
          className="card m-1"
          style={{ borderRadius: "2px", boxSizing: "border-box" }}
        >
          <div _ngcontent-wne-c149="" className="card-header">
            <div
              _ngcontent-wne-c149=""
              className="d-flex justify-content-between align-items-center"
              style={{ padding: "0 8px" }}
            >
              <div _ngcontent-wne-c149="" className="p-1">
                <span
                  _ngcontent-wne-c149=""
                  className="match_card_heading heading"
                >
                  {eventName[id]}
                </span>
              </div>
              <div _ngcontent-wne-c149="" className="text-right">
                <span
                  _ngcontent-wne-c149=""
                  style={{ padding: "2px" }}
                  className="ng-star-inserted"
                >
                  <button _ngcontent-wne-c149="" className="btn today">
                    Today
                  </button>
                </span>
              </div>
            </div>
          </div>
          <ul
            _ngcontent-wne-c149=""
            ngbnav=""
            className="nav-tabs nav"
            role="tablist"
          >
            {data?.[0]?.childs?.map((horseRacing) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCategory(horseRacing?.countryCode)}
                  key={horseRacing?.countryCode}
                  _ngcontent-wne-c149=""
                  className="navItems nav-item ng-star-inserted"
                >
                  <a
                    _ngcontent-wne-c149=""
                    ngbnavlink=""
                    className={`race-region nav-link ${
                      selectedCategory === horseRacing?.countryCode
                        ? "active"
                        : ""
                    }`}
                    aria-labelledby="NZ"
                    id="ngb-nav-9"
                    role="tab"
                    aria-controls="ngb-nav-9-panel"
                    aria-selected="true"
                    aria-disabled="false"
                  >
                    <span
                      _ngcontent-wne-c149=""
                      className={`flag_logo ${horseRacing?.countryCode}`}
                    ></span>
                    <span
                      _ngcontent-wne-c149=""
                      className={`city ${
                        selectedCategory === horseRacing?.countryCode
                          ? "text-black"
                          : "!text-black"
                      }`}
                    >
                      {" "}
                      {horseRacing?.countryCode}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div _ngcontent-wne-c149="" className="mt-0 tab-content">
            <div
              ngbnavpane=""
              className="tab-pane fade show active ng-star-inserted"
              id="ngb-nav-9-panel"
              role="tabpanel"
              aria-labelledby="ngb-nav-9"
            >
              {findChildByCountryCode?.childs?.map((child) => {
                return (
                  <div
                    key={child?.trackName}
                    _ngcontent-wne-c149=""
                    className="row mx-0 item-box px-0 py-1 ng-star-inserted"
                  >
                    <div _ngcontent-wne-c149="" className="col-md-2">
                      <span _ngcontent-wne-c149="" className="trackName">
                        {child?.trackName}
                      </span>
                    </div>
                    <div _ngcontent-wne-c149="" className="col-md-10">
                      {child?.childs?.map((item) => {
                        return (
                          <span
                            onClick={() =>
                              navigate(`/event-details/${id}/${item?.eventId}`)
                            }
                            key={item?.eventId}
                            _ngcontent-wne-c149=""
                            className="ng-star-inserted"
                          >
                            <span
                              _ngcontent-wne-c149=""
                              className="startTime p-2"
                              tabindex="0"
                            >
                              {convertToIST(item?.startTime)}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseGreyhound;
