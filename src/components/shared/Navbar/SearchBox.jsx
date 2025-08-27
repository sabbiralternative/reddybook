import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  /* filter the search value */
  useEffect(() => {
    const categories = Array.from(new Set(data.map((item) => item.eventType)));

    setCategories(categories);
  }, [data]);

  /* hide the search modal */
  const handleHideDropdown = () => {
    setSearchText("");
    setData([]);
  };

  return (
    <li className="input-form search-box" style={{ position: "relative" }}>
      <div className="search-bar">
        <form autoComplete="off">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search Events"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass" />
          {/**/}
        </span>
      </div>
      {data?.length > 0 && searchText?.length > 2 && (
        <div
          className="search-list bg-bg_color_primary text-text_color_primary1"
          style={{ zIndex: "9999999" }}
        >
          {categories.map((category) => (
            <>
              <div className="search-game-name">
                <b>{category}</b>
              </div>
              {data
                .filter((item) => item.eventType === category)
                .map((item, i) => (
                  <Link
                    className="group"
                    onClick={handleHideDropdown}
                    key={i}
                    to={`/event-details/${item?.eventTypeId}/${item?.eventId}`}
                  >
                    <div className="search-list-item">
                      <div className="search-tournament-name">
                        <b className="group-hover:underline">{item?.name}</b>
                      </div>
                      <div className="search-game-date group-hover:underline">
                        {item?.openDate}
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          ))}
        </div>
      )}
    </li>
  );
};

export default SearchBox;
