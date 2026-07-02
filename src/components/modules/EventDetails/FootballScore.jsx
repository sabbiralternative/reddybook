import "./FootballScore.css";

function FootballScore({ score }) {
  return (
    <div className="score-card">
      <div className="score-card__inner">
        <div className="score-card__status-row">
          <span className="score-card__time-status">{score?.timeStatus}</span>
        </div>

        <div className="score-card__teams-row">
          <div
            className="score-card__team-name score-card__team-name--left"
            title={score?.player1}
          >
            {score?.player1}
          </div>

          <div className="score-card__scores">
            {score?.team1Score && (
              <div className="score-card__score-box">{score?.team1Score}</div>
            )}
            {score?.team1Score && (
              <div className="score-card__separator">:</div>
            )}
            {score?.team2Score && (
              <div className="score-card__score-box">{score?.team2Score}</div>
            )}
          </div>

          <div
            className="score-card__team-name score-card__team-name--right"
            title={score?.player2}
          >
            {score?.player2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FootballScore;
