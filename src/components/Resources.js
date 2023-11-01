import "../styles/Resources.css";
import Resource from "./Resource";

export default function Resources() {
  return (
    <div className="Resources--main">
      <div className="Resources--content">
        <h1>Na naší stránce najdete</h1>
        <div className="Resources--resources">
          <Resource
            isImage={true}
            imgPath="./resource_logos/logo-pankrac.png"
          />

          <Resource isImage={true} imgPath="./resource_logos/logo-ladvi.png" />

          <Resource
            isImage={true}
            imgPath="./resource_logos/logo-beachcup.png"
            style={{ borderRadius: "80px" }}
          />

          <Resource isImage={true} imgPath="./resource_logos/logo-pbt.gif" />

          <Resource
            isImage={true}
            imgPath="./resource_logos/logo-michalek.webp"
            style={{ width: "200px" }}
          />

          <Resource isImage={true} imgPath="./resource_logos/logo-vitkov.png" />

          <Resource
            isImage={true}
            style={{ background: "#bf3235", borderRadius: "20px" }}
            imgPath="./resource_logos/logo-bvsp.png"
          />

          <Resource
            isImage={false}
            text1="Turnaje s Ladou"
            text2="o MP oblečení"
          />
        </div>

        <h1>Dále můžete očekávat</h1>

        <div className="Resources--resources">
          <Resource isImage={false} text1="Svazové turnaje" />
          <Resource isImage={false} text1="Fidorka turnaje" />
          <Resource isImage={false} text1="Radotín" />
          <Resource isImage={false} text1="Ústi" />
          <Resource isImage={false} text1="ABC Branik" />
          <Resource isImage={false} text1="Hradec" />
          <Resource isImage={false} text1="Pardubice" />
          <Resource isImage={false} text1="Liberec" />
          <Resource isImage={false} text1="Kosmonosy" />
          <Resource isImage={false} text1="Gutovka" />
          <Resource isImage={false} text1="Poděbrady" />
        </div>
      </div>
    </div>
  );
}
