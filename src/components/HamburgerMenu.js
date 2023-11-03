import React, { useState } from "react";
import "../styles/HamburgerMenu.css";

const HamburgerMenu = ({ logout, isTabletOrMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div>
        <button onClick={toggleMenu} className="hamburger-button">
          <div
            className={
              isTabletOrMobile
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
          <div
            className={
              isTabletOrMobile
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
          <div
            className={
              isTabletOrMobile
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
        </button>
      </div>
      <div
        className={
          isTabletOrMobile
            ? `menu-mobile ${isOpen ? "open-mobile" : ""}`
            : `menu ${isOpen ? "open" : ""}`
        }
      >
        <a href="/profile">Profil</a>
        <a href="/about">O nás</a>
        <p className="Hamburger-menu--logout" onClick={logout}>
          Odhlásit
        </p>
      </div>
    </div>
  );
};

export default HamburgerMenu;
