import "./TennisScore.css";

const TennisScore = ({ score, eventTypeId }) => {
  return (
    <div className="tennis-score-wrapper">
      <div className="tennis-score-inner">
        {/* Player 1 Row */}
        <div className="tennis-player-row">
          <span className="tennis-player-name">{score?.player1}</span>

          {eventTypeId == 2 && (
            <span className="tennis-score-side">
              <div className="tennis-sets-group">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="tennis-service-dot"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="4"
                    fill={score?.service == 1 ? "#7ed321" : ""}
                  />
                </svg>
                {score?.set1?.map((set, i) => (
                  <span key={i} className="tennis-set-badge">
                    {set}
                  </span>
                ))}
              </div>
              <span className="tennis-game-score">{score?.team1Score}</span>
            </span>
          )}
        </div>

        {/* Player 2 Row */}
        <div className="tennis-player-row">
          <span className="tennis-player-name">{score?.player2}</span>

          {eventTypeId == 2 && (
            <span className="tennis-score-side">
              <div className="tennis-sets-group">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="tennis-service-dot"
                >
                  <circle
                    cx="4"
                    cy="4"
                    r="4"
                    fill={score?.service == 2 ? "#7ed321" : ""}
                  />
                </svg>
                {score?.set2?.map((set, i) => (
                  <span key={i} className="tennis-set-badge">
                    {set}
                  </span>
                ))}
              </div>
              <span className="tennis-game-score">{score?.team2Score}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TennisScore;
