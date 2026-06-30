import { useLocation } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import CasinoThumbnail from "./CasinoThumbnail";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { useEffect, useMemo, useState } from "react";
import { useIndexQuery } from "../../hooks";

const Casino = () => {
  const { data } = useIndexQuery({
    type: "99_all_casino",
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const category = params.get("category");

  const [search, setSearch] = useState("");

  const allTables = data?.data?.allTables;
  // const tables = data?.data?.tables?.[100000];

  // const allGames =
  //   allTables &&
  //   Object.values(allTables).flatMap((provider) =>
  //     Object.values(provider).flat(),
  //   );
  const allGames = useMemo(() => {
    if (!allTables) return [];
    return Object.values(allTables).flatMap((provider) =>
      Object.values(provider).flat(),
    );
  }, [allTables]);
  // const tablesGames =
  //   tables &&
  //   Object.values(tables).flatMap((provider) => Object.values(provider).flat());

  const categories =
    allGames && Array.from(new Set(allGames?.map((game) => game?.product)));

  // const a =
  //   allGames && allGames?.find((game) => game.product === "BIKINI GAMES");

  const subCategories = useMemo(() => {
    if (allGames && categories && product === "All") {
      return Array.from(new Set(allGames?.map((game) => game?.category)));
    }
    if (allGames && categories && product !== "All") {
      const allCategory = allGames?.filter((game) => game?.product === product);
      return Array.from(new Set(allCategory?.map((game) => game?.category)));
    }
  }, [categories, allGames, product]);

  const filteredData = useMemo(() => {
    if (allGames && categories && subCategories) {
      if (search) {
        return allGames?.filter((game) => game?.category?.includes(search));
      }
      if (!search) {
        if (product === "All" && category === "All") {
          return allGames;
        }
        if (product === "All" && category !== "All") {
          return allGames?.filter((game) => game?.category === category);
        }
        if (product !== "All" && category === "All") {
          return allGames?.filter((game) => game?.product === product);
        }
        if (product !== "All" && category !== "All") {
          return allGames?.filter(
            (game) => game?.product === product && game?.category === category,
          );
        }
      }
    }
  }, [allGames, categories, category, subCategories, product, search]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setSearch("");
  }, [location.search]);
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
                      categories={categories}
                      selectedCategory={product}
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
                            product={product}
                            selectedSubCategory={category}
                            subCategories={subCategories}
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
