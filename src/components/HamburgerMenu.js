import React, { useState } from "react";
import "../styles/HamburgerMenu.css";
import { useRecoilValue } from "recoil";

import { screenSize } from "../state/atoms/ScreenSize";

const HamburgerMenu = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screenType = useRecoilValue(screenSize);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div>
        <button onClick={toggleMenu} className="hamburger-button">
          <div
            className={
              screenType === "mobile"
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
          <div
            className={
              screenType === "mobile"
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
          <div
            className={
              screenType === "mobile"
                ? `line-mobile ${isOpen ? "open-mobile" : ""}`
                : `line ${isOpen ? "open" : ""}`
            }
          />
        </button>
      </div>
      <div
        className={
          screenType === "mobile"
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
