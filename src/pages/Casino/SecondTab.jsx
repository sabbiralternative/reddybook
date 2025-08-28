const SecondTab = ({
  categories,
  setSelectedSubCategory,
  selectedSubCategory,
}) => {
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      {/**/}
      <li
        onClick={() => setSelectedSubCategory("All")}
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

      {categories?.map((category) => {
        return (
          <li
            onClick={() => setSelectedSubCategory(category)}
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
                  src={`/icon/${category
                    ?.split(" ")
                    .join("")
                    .toLowerCase()}.svg`}
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
