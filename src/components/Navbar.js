import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function Navbar({ token, removeToken, apiUrl }) {
  const navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logout() {
    axios({
      method: "POST",
      url: `${apiUrl}/logout`,
    })
      .then((response) => {
        removeToken();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

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
          {token ? (
            // <button onClick={logout} className="Navbar--hamburger-menu">
            //   Logout
            // </button>
            <HamburgerMenu logout={logout} />
          ) : (
            <div>
              <button
                className="login-button"
                onClick={() => navigate("/login")}
              >
                Přihlásit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
