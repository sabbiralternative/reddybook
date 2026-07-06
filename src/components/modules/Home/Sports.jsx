import { useSelector } from "react-redux";
import { useGroupQuery } from "../../../redux/features/events/events";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Sports = () => {
  const { id } = useParams();
  const { group } = useSelector((state) => state.global);
  const eventId = id || id == 0 ? Number(id) : group;
  const { data } = useGroupQuery(
    { sportsType: eventId },
    {
      pollingInterval: 1000,
    },
  );

  const [categories, setCategories] = useState([]);
  const eventName = { 4: "Cricket", 2: "Tennis", 1: "Football" };
  const navigate = useNavigate();
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  useEffect(() => {
    if (data) {
      const categories = Array.from(
        new Set(
          Object.values(data)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId),
        ),
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [data]);

  return (
    <>
      <div style={{ width: "100%" }} className="list-sport-title">
        <span> Inplay</span>
      </div>
      {categories?.map((category) => {
        const filteredData = Object.entries(data)
          .filter(
            ([, value]) =>
              value.eventTypeId === category && value.visible === true,
          )
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return (
          <section key={category} className="bet-details-sec">
            <div className="bet-details-header">
              <div className="row">
                <div className="col-12 col-md-6 d-flex justify-content-between align-items-center">
                  <div className="list-sport-title">
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="tennis icon"
                    />
                    <span> {eventName[category]}</span>
                  </div>
                  <ul className="live_virtual">
                    <li>
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        defaultValue="Order one"
                      />
                      <label>LIVE</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        defaultValue="Order Two"
                      />
                      <label>VIRTUAL</label>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <div className="add-even-sec">
                    <div className="stack-1">
                      <span>1</span>
                    </div>
                    <div className="stack-1">
                      <span>X</span>
                    </div>
                    <div className="stack-1">
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {data &&
                Object.values(data).length > 0 &&
                Object.keys(filteredData)
                  .sort((keyA, keyB) => data[keyA].sort - data[keyB].sort)
                  .map((keys, index) => {
                    if (!data?.[keys]?.visible) {
                      return null;
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => navigateGameList(keys)}
                        className="bets-details-page"
                      >
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="game-left-box">
                              <div className="game-left-col">
                                {/**/}
                                <div className="game-box">
                                  <a href="javascript:void(0);">
                                    <p>
                                      {data[keys]?.player1} v
                                      {data[keys]?.player2}
                                    </p>
                                    {/* <p className="team-event-name">
                                      (The Hundred - Womens)
                                    </p> */}
                                  </a>
                                </div>
                                {data?.[keys]?.inPlay === 1 && (
                                  <div className="game-date-inplay-box">
                                    <span>Live</span>
                                  </div>
                                )}

                                <div className="game-date">
                                  {/* <p>27 Aug</p> */}
                                  {data?.[keys]?.date}
                                  {/* <p>8:00 PM</p> */}
                                </div>
                              </div>
                              <div className="game-icons">
                                {data?.[keys]?.isFancy === 1 && (
                                  <a>
                                    <img
                                      loading="lazy"
                                      src="data:image/webp;base64,UklGRngEAABXRUJQVlA4WAoAAAAwAAAAUwAAUwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIrgEAAA0kAUmKyoiIRhIk2aZt9bNt27bfzP/PbNu2bdu2bdu2bdvee521vxERMQEAQfy3G4iICVATSQrj6JXjAAPUmMqpjIgJwK9jQ/dAHzdbPRnH+hunzJoWkPxuIKhz0/S3kH5xLw+HWiVA+HIkWBZoC9ItR1g0SgdtHzDUq+YN2uPnGRg0tgftuz5g2NwExAdOMojJB/VYaN+0A6jvLGVQ4R1ZX2jfrB6odx5jUBnU73pC+xa1yQ7fYFAQwm+PTd/16N3XOINhIaGrVS+CvbWXyPVqUKCTjkhHqNAFgudXKcFNZC6UaCOyTw0GIo/UoCvyVg1qnjZIwEYNVy8IKDLpgOEZe7oH6Yc1ZjF3Ym26+brQtkHzbkNzPale9oTWE6M6rihPNQvabzhodAlDmiezGfhntFlfkWaQPgPUntS1lDXFzQXgGBHaZl1tHYLx4Flp3PCCrvJeTWGSaD12TTl588C1VZ8ulaxlPR7MJslt9OyqspbqsTFo1b9vYUtJg8A3IKbzgSJyJoNz035dHOWcYOWX1bCbHOa17fHp1JNKCSj5meknlPL/pCoG9MBk+H9WUDgg1AAAALAHAJ0BKlQAVAA+bSyTRaQioZgONDhABsSzgGmEwZBHiz7MZy1kS8JBu++DIR5NIHA8Cc0z5KWipHJCJPpEP8425kxHywAA/vuc1Z6Izz2rq+2UeFJsIf39Ek2GLIc88tGAQ8AIP0L3Vto/BH/gfUlLplAL+SYD6pTxwwEvxg60xzObdxjLJpyyfsIgxRjJ8OBbjMBuWjABXPfzyO1D3v0fFrZRkSM1UOSBx+PgWrLTawoiADXcMo4BkBejRDT3fo16lyukrazhxoo+tbNogAAAAAAA"
                                      alt="Fancy icon"
                                    />
                                  </a>
                                )}
                                {data?.[keys]?.isTv === 1 && (
                                  <a>
                                    <img
                                      loading="lazy"
                                      src="data:image/webp;base64,UklGRrICAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIXgAAAAFHIBBI4SYXEREGMK2tvclHtx0sIzACMhKFDhsk7h8g5d87dBggov8TgCdlf0ZRVK4HpR82OoAmVwSz50NqDZ8UHONwIsZJ/icfHY1k+KRY/IkUkhCWPgdUvgOd435WUDggXgAAABAEAJ0BKhgAGAA+bSqRRaQioZv6rABABsSygFiPZTt+TsDptcvnPhmAAP772WJ79pOFwuhd4F59ntZMqtnZHrEhW98RWozqa5ZzsJlXFQV5ArFbIOssgB6OGuAAAAA="
                                      alt="TV icon"
                                    />
                                  </a>
                                )}
                                {data?.[keys]?.isBookmaker === 1 && (
                                  <a>
                                    <span className="game-bm">BM</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="game-box-rgt">
                              <div className="open-bet-box">
                                <button type="button" className="sky-color-box">
                                  <span>
                                    {data?.[keys]?.[0]?.ex?.availableToBack[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                                <button type="button">
                                  <span>
                                    {data?.[keys]?.[0]?.ex?.availableToLay?.[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                              </div>
                              <div className="open-bet-box">
                                <button type="button" className="sky-color-box">
                                  <span>
                                    {data?.[keys]?.[2]?.ex?.availableToBack?.[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                                <button type="button">
                                  <span>
                                    {data?.[keys]?.[2]?.ex?.availableToLay?.[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                              </div>
                              <div className="open-bet-box">
                                <button type="button" className="sky-color-box">
                                  <span>
                                    {data?.[keys]?.[1]?.ex?.availableToBack?.[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                                <button type="button">
                                  <span>
                                    {data?.[keys]?.[1]?.ex?.availableToLay?.[0]
                                      ?.price || "-"}
                                  </span>
                                  <br />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Sports;
