import { useLocation } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import CasinoThumbnail from "./CasinoThumbnail";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { useEffect, useState } from "react";
import { useMac88AllQuery } from "../../redux/features/events/events";

const Casino = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const { data } = useMac88AllQuery();
  /* all tables key data */
  const allTables = data?.data?.allTables;
  /* tables key data */
  const tables = data?.data?.tables?.[100000];
  /* Table category */
  const tablesCategory = tables && Object.keys(tables);

  const filterSubCategory = () => {
    if (selectedCategory !== "All") {
      const tableKeyData =
        tables &&
        Object.values(tables)
          .flatMap((obj) => Object.values(obj))
          .flat();
      /* Filter the category data which in clicked on first tab */
      const subCategoryData = tableKeyData?.filter(
        (item) => item?.product === selectedCategory
      );
      /* Make unique array of category from filtered result  */
      const subCategory =
        subCategoryData &&
        Array.from(new Set(subCategoryData.map((item) => item.category)));

      return subCategory;
    } else {
      const allTablesCategory = allTables && Object.keys(allTables);
      return allTablesCategory;
    }
  };

  useEffect(() => {
    const filterData = () => {
      if (selectedCategory !== "All") {
        if (selectedSubCategory !== "All") {
          const tableKeyData =
            tables &&
            Object.values(tables)
              .flatMap((obj) => Object.values(obj))
              .flat();
          const casinoData = tableKeyData?.filter(
            (item) => item?.category === selectedSubCategory
          );
          return casinoData;
        } else {
          const tableKeyData =
            tables &&
            Object.values(tables)
              .flatMap((obj) => Object.values(obj))
              .flat();
          const casinoData = tableKeyData?.filter(
            (item) => item?.product === selectedCategory
          );

          return casinoData;
        }
      } else {
        const casinoData =
          allTables && typeof allTables === "object"
            ? selectedSubCategory === "All"
              ? Object.values(allTables).flat()
              : Object.values(allTables)
                  .flat()
                  .filter((item) => item?.category === selectedSubCategory)
            : [];

        return casinoData;
      }
    };
    setFilteredData(filterData());
  }, [selectedCategory, selectedSubCategory, allTables, tables]);

  useEffect(() => {
    setSelectedSubCategory("All");
  }, [selectedCategory]);

  useEffect(() => {
    if (category) {
      if (category === "Fun Games") {
        setSelectedCategory(category);
      } else {
        setSelectedSubCategory(category);
      }
    }
  }, [category]);
  return (
    <SidebarLayout>
      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
        <div>
          <div className="right-side-bar-main-sec">
            <div className="section-listing-page">
              <section className="bet-details-sec">
                <div className="int-casino-main-body-sec">
                  <div className="int-casino-main-tabs">
                    <div className="casino-header-search">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Casino"
                      />
                      <span>
                        {/**/}
                        <button
                          style={{ minWidth: "24px" }}
                          className="btn search-casino-cta"
                        >
                          <i className="fa-solid fa-magnifying-glass" />
                        </button>
                      </span>
                    </div>
                    <FirstTab
                      categories={tablesCategory}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-all-int"
                        role="tabpanel"
                        aria-labelledby="pills-all-int-tab"
                      >
                        <div className="all-game-details-page">
                          <SecondTab
                            setSelectedSubCategory={setSelectedSubCategory}
                            selectedSubCategory={selectedSubCategory}
                            categories={filterSubCategory()}
                          />
                          <CasinoThumbnail casinoData={filteredData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Casino;
