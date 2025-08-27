const RightSidebar = () => {
  return (
    <div data-v-4efaf06d className="col-sm-0 col-md-0 col-lg-4">
      <div data-v-4efaf06d className="placed-bet-sec">
        <div data-v-4efaf06d className="placed-bet-head">
          <span data-v-4efaf06d>Place Bet</span>
        </div>
        <div data-v-4efaf06d className="stake-bet-desk-sec">
          <div
            data-v-4efaf06d
            className="stake-placed-bet stake-light-pink-box"
            style={{ display: "none" }}
          >
            <div data-v-4efaf06d className="bets-odd-sec">
              <div data-v-4efaf06d className="inpt-grp-lft">
                <div data-v-4efaf06d className="increment-decrement-sec">
                  <div
                    data-v-4efaf06d
                    className="value-button d-none"
                    id="decrease"
                  >
                    {" "}
                    -
                  </div>
                  <div data-v-4efaf06d className="select-digit">
                    <input
                      data-v-4efaf06d
                      type="number"
                      className="form-control input-disabled"
                      id="number"
                      disabled
                    />
                  </div>
                  <div
                    data-v-4efaf06d
                    className="value-button d-none"
                    id="increase"
                  >
                    +{" "}
                  </div>
                </div>
              </div>
              <div data-v-4efaf06d className="inpt-grp-rgt">
                <input data-v-4efaf06d type="number" className="form-control" />
              </div>
            </div>

            <div data-v-4efaf06d className="stake-min-max">
              <p data-v-4efaf06d>Min Bet: Max Bet: </p>
            </div>
            <div data-v-4efaf06d className="cancel-placed-btn">
              <div data-v-4efaf06d className="cancel-btn">
                <button data-v-4efaf06d type="button" className="close-btn-1">
                  Cancel
                </button>
              </div>
              <div data-v-4efaf06d className="placed-btn">
                <button
                  data-v-4efaf06d
                  className="place-btn-outline"
                  type="button"
                >
                  <span data-v-4efaf06d>Place Bet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
