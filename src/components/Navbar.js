import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

function Navbar(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logout() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
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
          {!props.token && props.token !== "" ? (
            !showLogin &&
            !showRegister && (
              <div>
                <button
                  className="login-button"
                  onClick={() => navigate("/login")}
                >
                  Přihlásit
                </button>
              </div>
            )
          ) : (
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
