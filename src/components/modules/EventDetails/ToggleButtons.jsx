import { useEffect } from "react";

const styles = `
.tb-wrap {
  display: flex;
  gap: 12px;
  align-items: center;
  padding:10px 0px;
}

.tb-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.15s ease;
  outline: none;
  width: 100%;
}

/* Filled / active style, e.g. FANCY */
.tb-btn--fancy {
  background-color: var(--primary-color);
  color: #1a1a1a;
  border-color: var(--primary-color);
}



.tb-btn--fancy.tb-inactive {
  background-color: #ffffff;
  color: #000;
  border-color: #e2e2e2;
}

/* Outlined style, e.g. PREMIUM */
.tb-btn--premium {
  background-color: #ffffff;
  color: #000;
  border-color: #e2e2e2;
}

.tb-btn--premium:hover {
  border-color: #cfcfcf;
}

.tb-btn--premium.tb-active {
  background-color: var(--primary-color);
  color: #1a1a1a;
  border-color: var(--primary-color);
}

.tb-badge {
  position: absolute;
  top: -4px;
  right: -40px;
  background-color: #939393;
  color: #ffffff;
  font-size: 9px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 4px;
  letter-spacing: 0.02em;
  line-height: 1.5;
}
`;

export default function ToggleButtons({
  data,
  fancy,
  setFancyPremiumTab,
  fancyPremiumTab,
}) {
  useEffect(() => {
    const fancy = data?.result?.filter(
      (normal) =>
        normal.btype === "FANCY" &&
        normal.tabGroupName === "Normal" &&
        normal?.visible == true,
    );

    if (fancy?.length > 0) {
      setFancyPremiumTab("fancy");
    }
    if (data?.premium && data?.premium?.eventId && fancy?.length === 0) {
      setFancyPremiumTab("premium");
    }
  }, []);

  return (
    <div className="tb-wrap">
      <style>{styles}</style>
      {fancy?.length > 0 && (
        <button
          className={`tb-btn tb-btn--fancy ${fancyPremiumTab === "fancy" ? "tb-active" : "tb-inactive"}`}
          onClick={() => setFancyPremiumTab("fancy")}
        >
          FANCY
        </button>
      )}

      {data?.premium && data?.premium?.eventId && (
        <button
          className={`tb-btn tb-btn--premium ${fancyPremiumTab === "premium" ? "tb-active" : "tb-inactive"}`}
          onClick={() => setFancyPremiumTab("premium")}
        >
          <div style={{ position: "relative" }}>
            {" "}
            <span> PREMIUM</span> <span className="tb-badge">NEW</span>
          </div>
        </button>
      )}
    </div>
  );
}
