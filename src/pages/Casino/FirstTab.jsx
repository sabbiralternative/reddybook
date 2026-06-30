import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FirstTab = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedCategory, categories]);
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      <li
        ref={selectedCategory === "All" ? activeRef : null}
        onClick={() => {
          navigate(`/casino?product=All&category=All`);
        }}
        className="nav-item"
        role="presentation"
      >
        <button
          className={`nav-link  ${selectedCategory === "All" ? "active" : ""}`}
          id="pills-all11-tab"
        >
          <span>All</span>
        </button>
      </li>
      {categories?.map((category) => {
        return (
          <li
            onClick={() => {
              navigate(`/casino?product=${category}&category=All`);
            }}
            ref={category === selectedCategory ? activeRef : null}
            key={category}
            className="nav-item"
            role="presentation"
          >
            <button
              className={`nav-link ${
                category === selectedCategory ? "active" : ""
              }`}
              id="pills-all11-tab"
            >
              <span> {category}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FirstTab;
