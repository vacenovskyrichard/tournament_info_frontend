import "../styles/Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  return (
    <div className="navbar">
      <title>Jdem Hrát</title>
      <div className="navbar--left">
        <a href="/">
          <img className="navbar--logo" alt="logo" src="./logo.png" />
        </a>
      </div>
      <div className="navbar--center">
        <h1 className="navbar--title">Informace o nadcházejících turnajích</h1>
      </div>
      <div className="navbar--right">
        <div>
          <div>
            <a href="/login">
              <button className="login-button">Login</button>
            </a>
          </div>
          <div>
            <a href="/register">
              <button className="register-button">Register</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
