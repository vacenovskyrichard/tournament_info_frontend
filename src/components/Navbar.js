import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function Navbar(props) {
  const navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logout() {
    axios({
      method: "POST",
      // url: "http://127.0.0.1:5000/logout",
      url: "https://jdem-hrat-58da3e527841.herokuapp.com/logout",
    })
      .then((response) => {
        props.removeToken();
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
          {props.token ? (
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
