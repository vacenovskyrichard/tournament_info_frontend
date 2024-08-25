import "../styles/Resources.css";
import Resource from "./Resource";

import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function Resources() {
  const screenType = useRecoilValue(screenSize);
  return (
    <div className="Resources--main">
      <div
        className={
          screenType === "mobile"
            ? "Resources--content-mobile"
            : "Resources--content"
        }
      >
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
          <Resource isImage={false} text1="Svazové turnaje" />

          <Resource isImage={false} text1="Poděbrady" />
        </div>

        <h1 style={{ marginTop: "70px" }}>Dále můžete očekávat</h1>

        <div className="Resources--resources">
          <Resource isImage={false} text1="Fidorka turnaje" />
          <Resource isImage={false} text1="Radotín" />
          <Resource isImage={false} text1="Ústi" />
          <Resource isImage={false} text1="ABC Branik" />
          <Resource isImage={false} text1="Hradec" />
          <Resource isImage={false} text1="Pardubice" />
          <Resource isImage={false} text1="Liberec" />
          <Resource isImage={false} text1="Kosmonosy" />
          <Resource isImage={false} text1="Gutovka" />
        </div>
      </div>
    </div>
  );
}
