import "../styles/Resources.css";

export default function Resources() {
  return (
    <div className="Resources--main">
      <div className="Resources--content">
        <h1>Na naší stránce najdete</h1>
        <div className="Resources--resources">
          <div className="Resources--resource">
            <img alt="logo" src="./resource_logos/logo-pankrac.png" />
          </div>
          <div className="Resources--resource">
            <img alt="logo" src="./resource_logos/logo-ladvi.png" />
          </div>
          <div className="Resources--resource">
            <img alt="logo" src="./resource_logos/logo-pbt.gif" />
          </div>
          <div className="Resources--resource">
            <img
              alt="logo"
              src="./resource_logos/logo-michalek.webp"
              style={{ width: "200px" }}
            />
          </div>
          <div className="Resources--resource">
            <img
              alt="logo"
              src="./resource_logos/logo-beachcup.png"
              style={{ borderRadius: "80px" }}
            />
          </div>
        </div>
        <h1>Dále můžete očekávat</h1>
        <div className="Resources--resources">
          <div className="Resources--resource">
            <img alt="logo" src="./resource_logos/logo-vitkov.png" />
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3 style={{ margin: "5px" }}>Turnaje s Ladou </h3>
            <h3 style={{ margin: "5px" }}>o MP oblečení </h3>
          </div>{" "}
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Fidorkové turnaje </h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>BVSP </h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3> Radotín </h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Ústi</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Kosmonosy</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Liberec</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Pardubice</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Hradec</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>ABC Branik</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Gutovka</h3>
          </div>
          <div
            className="Resources--resource"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
            }}
          >
            <h3>Poděbrady</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
