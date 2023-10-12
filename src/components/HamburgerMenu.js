import React, { useState } from "react";
import "../styles/HamburgerMenu.css";

const HamburgerMenu = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div>
        <button onClick={toggleMenu} className="hamburger-button">
          <div className={`line ${isOpen ? "open" : ""}`} />
          <div className={`line ${isOpen ? "open" : ""}`} />
          <div className={`line ${isOpen ? "open" : ""}`} />
        </button>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <a href="/profile">Profil</a>
        <a href="/about">O nás</a>
        <a className="Hamburger-menu--logout" onClick={logout}>
          Odhlásit
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
