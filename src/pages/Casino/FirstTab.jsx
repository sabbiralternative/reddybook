const FirstTab = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`nav-link  ${selectedCategory === "All" ? "active" : ""}`}
          id="pills-all11-tab"
        >
          <span>All</span>
        </button>
      </li>
      {categories?.map((category) => {
        return (
          <li
            onClick={() => setSelectedCategory(category)}
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
