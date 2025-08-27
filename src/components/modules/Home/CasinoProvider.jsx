const CasinoProvider = () => {
  return (
    <section className="exchange-game-conetent-sec-in-mobile">
      <div className="bet-details-header">
        <div className="row">
          <div className="col-6">
            <div className="list-sport-title">
              <img
                loading="lazy"
                src="data:image/png;base64,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"
                alt="casino-menu"
              />
              <span>Casino Provider</span>
            </div>
          </div>
          <div className="col-6">
            <div className="add-even-sec" />
          </div>
        </div>
      </div>
      <div className="home-casino-img">
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/more_slots_lobby.webp"
              alt="Nkc Lobby"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/ezugi.webp"
              alt="Ezugi"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/betgames_tv.webp"
              alt="Betgames"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/betgames.webp"
              alt="Betgames"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/vivo_gaming.webp"
              alt="Vivo Gaming"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/sexybcrt.webp"
              alt="Sexybcrt"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/kalamba_games.webp"
              alt="Kalamba Games"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/smartsoft_gaming.webp"
              alt="Smartsoft"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/royal_virtual.webp"
              alt="Royal Virtual"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/gamzix.webp"
              alt="Gamzix"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/royal_gaming.webp"
              alt="Royal Gaming"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/playtech.webp"
              alt="Playtech"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/evoplay_entertainment.webp"
              alt="Evoplay"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/tvbet.webp"
              alt="TvBet"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/creedroomz.webp"
              alt="Creedroomz"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/betsoft.webp"
              alt="Betsoft"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/pascal.webp"
              alt="Pascal"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/spribe.webp"
              alt="Spribe"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/wazdan.webp"
              alt="Wazdan"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/jili_gaming.webp"
              alt="Jili Gaming"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/asia_gaming.webp"
              alt="Asia Gaming"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/playn_go.webp"
              alt="Play'n Go"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/tangente.webp"
              alt="Tangente"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/playtech_live.webp"
              alt="Playtech Live"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/turbogames.webp"
              alt="Turbogames"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/hacksaw_gaming.webp"
              alt="Hacksaw"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/kingmidas_gaming.webp"
              alt="Kingmidas"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/bombay_live.webp"
              alt="Bombay Live"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/beter_live.webp"
              alt="Beter Live"
            />
          </div>
        </div>
        <div className="home-star-model-img">
          <div className="casinoicons">
            <img
              loading="lazy"
              src="https://d3lqxvczzwhhy7.cloudfront.net/laser/relax_gaming.webp"
              alt="Relax Gaming"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoProvider;
