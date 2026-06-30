import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SecondTab = ({ subCategories, product, selectedSubCategory }) => {
  const activeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedSubCategory, subCategories, product]);
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      {/**/}
      <li
        onClick={() => {
          navigate(`/casino?product=${product}&category=All`);
        }}
        ref={selectedSubCategory === "All" ? activeRef : null}
        className="nav-item"
        role="presentation"
      >
        <button
          className={`nav-link list-menu ${
            selectedSubCategory === "All" ? "active " : ""
          }`}
          id="pills-all12-tab"
          role="tab"
        >
          <span>
            <img loading="lazy" src="/icon/all.svg" alt="More Slots" />
          </span>
          <span>All</span>
        </button>
      </li>

      {subCategories?.map((category) => {
        return (
          <li
            ref={category === selectedSubCategory ? activeRef : null}
            onClick={() => {
              navigate(`/casino?product=${product}&category=${category}`);
            }}
            key={category}
            className="nav-item"
            role="presentation"
          >
            <button
              className={`nav-link list-menu ${
                selectedSubCategory === category ? "active" : ""
              }`}
              id="pills-all12-tab"
              role="tab"
            >
              <span>
                <img
                  loading="lazy"
                  src={`/icon/${category?.split(" ").join("").toLowerCase()}.svg`}
                  onError={(e) => {
                    if (e.target.src.endsWith(".svg")) {
                      // Try webp only once after svg fails
                      e.target.src = `/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.webp`;
                    } else if (e.target.src.endsWith(".webp")) {
                      // Try webp only once after svg fails
                      e.target.src = `/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.png`;
                    } else {
                      // If webp fails, do nothing (leave broken img)
                      // e.target.onerror = null;
                      e.target.src = `/icon/all.svg`;
                    }
                  }}
                  alt="More Slots"
                />
              </span>
              <span> {category}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SecondTab;
