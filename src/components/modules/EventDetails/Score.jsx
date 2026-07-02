const Score = ({ iscore }) => {
  return (
    <div
      style={{
        marginTop: "2px",
        display: "block",
      }}
      id="score-board"
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.25rem 0.875rem", // py-1 px-3.5
          }}
        >
          {/* Left section */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "max-content",
              flexDirection: "column",
              maxWidth: "70%",
            }}
          >
            <div
              style={{
                background: "var(--theme-primary-color)",
                WebkitBackgroundClip: "text",
                color: "var(--primary-color)",
                textAlign: "start",
                fontWeight: "bold",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <span style={{ textAlign: "start" }}>{iscore?.teamName}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0.25rem",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "var(--primary-color)",
                }}
              >
                {iscore?.teamRun}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  padding: "0.125rem 0.375rem",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    lineHeight: "1rem",
                  }}
                >
                  Over {iscore?.teamOver}
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",

                  width: "max-content",
                }}
              />
            </div>
            {iscore?.status2 && (
              <span
                style={{
                  fontSize: "0.75rem",

                  width: "100%",
                }}
              >
                {iscore?.status2}
              </span>
            )}
          </div>

          {/* Right section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textAlign: "end",
              maxWidth: "60%",
            }}
          >
            <span
              style={{
                fontSize: "1.125rem",

                WebkitBackgroundClip: "text",
                color: "var(--primary-color)",
                fontWeight: "bold",
                lineHeight: "1.5rem",
              }}
            >
              {iscore?.status}
            </span>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                textAlign: "end",
                lineHeight: "0.75rem",
              }}
            >
              {iscore?.crr && <span>CRR : {iscore?.crr}</span>}
              {iscore?.rrr && (
                <span
                  style={{
                    marginLeft: "0.5rem",
                  }}
                >
                  RR : {iscore?.rrr}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Over details */}
        {(iscore?.currentOver?.length > 0 ||
          iscore?.previousOver?.length > 0) && (
          <div
            style={{
              paddingLeft: "11px",
              paddingRight: "11px",
              position: "relative",

              width: "100%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                justifyContent: "flex-start",
                overflowX: "auto",
                gap: "0.5rem",
              }}
            >
              {/* Current Over */}
              {iscore?.currentOver?.length > 0 && (
                <div
                  title="Current Over"
                  style={{
                    display: "flex",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "7px",
                  }}
                >
                  <span
                    style={{
                      width: "max-content",
                      minWidth: "2.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    Current Over
                  </span>
                  <div style={{ display: "flex", gap: "11px" }}>
                    {iscore?.currentOver?.map((cv, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          minWidth: "1.25rem",
                          minHeight: "1.25rem",
                          aspectRatio: cv?.length === 1 ? "1 / 1" : "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          borderRadius: "50%",
                          // padding: "1px",
                          color: "white",
                          backgroundColor:
                            cv == "0"
                              ? "#999"
                              : cv == "1" || cv == "2"
                                ? "#48a23c"
                                : cv.split().includes("W")
                                  ? "#c9362b"
                                  : cv == "4"
                                    ? "#2d90d4"
                                    : cv == "6"
                                      ? "#601c78"
                                      : cv.split().includes("b") ||
                                          cv.split().includes("lb") ||
                                          cv.split().includes("wd") ||
                                          cv.split().includes("nb")
                                        ? "#c2ad7b"
                                        : "#999",
                        }}
                      >
                        <span>{cv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Total this over */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  gap: "0.125rem",
                  fontWeight: 500,
                  lineHeight: "1rem",
                  borderRight: "1px solid gray",
                  paddingRight: "0.75rem",
                }}
              >
                <span>=</span>
                <span>{iscore?.totalThisOver}</span>
              </div>

              {/* Previous Over */}
              {iscore?.previousOver?.length > 0 && (
                <div
                  title="Last Over"
                  style={{
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "7px",
                  }}
                >
                  <span
                    style={{
                      width: "max-content",
                      minWidth: "2.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    Previous Over
                  </span>
                  <div style={{ display: "flex", gap: "11px" }}>
                    {iscore?.previousOver?.map((pv, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "0.75rem",

                          fontWeight: 500,
                          minWidth: "1.25rem",
                          minHeight: "1.25rem",
                          aspectRatio: pv?.length === 1 ? "1 / 1" : "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          borderRadius: "50%",
                          // padding: "1px",
                          color: "white",
                          backgroundColor:
                            pv == "0"
                              ? "#999"
                              : pv == "1" || pv == "2"
                                ? "#48a23c"
                                : pv.split().includes("W")
                                  ? "#c9362b"
                                  : pv == "4"
                                    ? "#2d90d4"
                                    : pv == "6"
                                      ? "#601c78"
                                      : pv.split().includes("b") ||
                                          pv.split().includes("lb") ||
                                          pv.split().includes("wd") ||
                                          pv.split().includes("nb")
                                        ? "#c2ad7b"
                                        : "#999",
                        }}
                      >
                        <span>{pv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Total last over */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  gap: "0.125rem",
                  fontWeight: 500,
                  lineHeight: "1rem",
                  borderRight: "1px solid gray",
                  paddingRight: "1.25rem",
                }}
              >
                <span>=</span>
                <span>{iscore?.totalLastOver}</span>
              </div>
            </div>

            {/* Arrow button */}
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: "50%",
                transform: "translateY(-50%)",
                right: "0.5rem",
              }}
            >
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "1.25rem",
                  minHeight: "1.25rem",
                  borderRadius: "4px",

                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "all 150ms ease-in-out",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.4998 10L6.6665 6.16667L7.83317 5L12.8332 10L7.83317 15L6.6665 13.8333L10.4998 10Z"
                    fill="var(--bg-active-primary)"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          gridColumn: "span 1 / span 1",
          width: "100%",
          height: "max-content",
        }}
      >
        <div
          style={{
            backgroundColor: "white",

            paddingTop: "0.25rem", // py-1
            paddingBottom: "0.25rem",
          }}
        >
          <div
            style={{
              minWidth: "100%",
              scrollSnapAlign: "center",

              fontSize: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            {/* First Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
                textAlign: "center",
                gap: "0.5rem",
                borderBottom: "1px solid gray",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridColumn: "span 2 / span 2",

                  borderRight: "1px solid gray",
                }}
              >
                <span>CRR</span>
                <span>{iscore?.crr}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridColumn: "span 2 / span 2",

                  borderRight: "1px solid gray",
                }}
              >
                <span>{"P'SHIP"} R</span>
                <span>{iscore?.partnership_runs}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridColumn: "span 2 / span 2",
                  borderRight: "1px solid gray",
                }}
              >
                <span>{"P'SHIP"} B</span>
                <span>{iscore?.partnership_balls}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gridColumn: "span 4 / span 4",
                }}
              >
                <span>LAST WICKET</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.125rem",
                  }}
                >
                  <span>{iscore?.last_wicket}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.125rem",
                    }}
                  >
                    {/* Optional data here */}
                  </div>
                </div>
              </div>
            </div>

            {/* Batsmen Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
                paddingTop: "0.75rem",

                borderBottom: "1px solid gray",
              }}
            >
              <span
                style={{ gridColumn: "span 3 / span 3", marginLeft: "0.75rem" }}
              >
                Batsmen
              </span>
              <span style={{ gridColumn: "span 1 / span 1" }}>R</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>B</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>4s</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>6s</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>SR</span>

              {/* Player 1 */}
              <div
                style={{
                  gridColumn: "span 3 / span 3",
                  marginLeft: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "row",

                  gap: "0.25rem",
                }}
              >
                <span>{iscore?.player_1_name}</span>
              </div>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_1_run}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_1_ball}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_1_four}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_1_six}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_1_sr}
              </span>

              {/* Player 2 */}
              <div
                style={{
                  gridColumn: "span 3 / span 3",
                  marginLeft: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "row",

                  gap: "0.25rem",
                }}
              >
                <span>{iscore?.player_2_name}</span>
              </div>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_2_run}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_2_ball}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_2_four}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_2_six}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.player_2_sr}
              </span>
            </div>

            {/* Bowler Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
                paddingTop: "0.75rem",
              }}
            >
              <span
                style={{ gridColumn: "span 3 / span 3", marginLeft: "0.75rem" }}
              >
                Bowler
              </span>
              <span style={{ gridColumn: "span 1 / span 1" }}>O</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>M</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>R</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>W</span>
              <span style={{ gridColumn: "span 1 / span 1" }}>Eco</span>

              <span
                style={{
                  gridColumn: "span 3 / span 3",
                  marginLeft: "0.75rem",
                }}
              >
                {iscore?.bowler}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.bowlerOvers}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                -
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.bowlerRuns}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.bowlerWickets}
              </span>
              <span
                style={{
                  gridColumn: "span 1 / span 1",
                }}
              >
                {iscore?.bowlerEco}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
