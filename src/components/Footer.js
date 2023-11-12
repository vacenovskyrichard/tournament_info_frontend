import "../styles/Footer.css";
import { useRecoilValue } from "recoil";
import { screenSize } from "../state/atoms/ScreenSize";

export default function Footer({ isTabletOrMobile }) {
  const screenType = useRecoilValue(screenSize);
  return (
    <div
      className={
        screenType === "mobile" ? "Footer--main-mobile" : "Footer--main"
      }
    >
      {screenType !== "mobile" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            className="Footer--logo"
            alt="logo"
            src="./logo/basic/png/logo-no-background.png"
          />
        </div>
      )}
      <div>
        <h3>Kontakt</h3>
        <p>Email: jdem.hrat@email.cz</p>
        <p>Telefon: +420 775 270 398</p>
      </div>
      <div>
        <h3>O nás</h3>
        <p>Diplomová práce na Fakultně informačních technologíí ČVUT.</p>
        <p>Autor: Richard Vacenovský</p>
      </div>
    </div>
  );
}
