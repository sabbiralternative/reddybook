import "./error.css";
const Error = () => {
  return (
    <div className="error-section">
      {" "}
      <div className="error-container">
        <div className="icon icon-generic"></div>
        <h1>This site can&apos;t be reached</h1>

        <p>Check if there is a typo in {window.location.hostname}.</p>

        <p>
          If spelling is correct,{" "}
          <a href="#">try running Windows Network Diagnostics</a>.
        </p>

        <div className="error-code">DNS_PROBE_FINISHED_NXDOMAIN</div>

        <button className="reload-btn">Reload</button>
      </div>
    </div>
  );
};

export default Error;
