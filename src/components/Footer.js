import "../styles/Footer.css";

export default function Footer({ isTabletOrMobile }) {
  return (
    <div className={isTabletOrMobile ? "Footer--main-mobile" : "Footer--main"}>
      {!isTabletOrMobile && (
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
