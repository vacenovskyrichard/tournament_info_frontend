import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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

  function login(event) {
    setShowLogin(false);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 401) {
          alert("Neplatný email nebo heslo.");
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  function register(event) {
    setShowLogin(false);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/register",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then(() => {
        setShowLogin(false);
        setShowRegister(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 409) {
          alert("Uživatel s tímto emailem už je registrován.");
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function forgot_password(event) {
    setShowLogin(false);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/reset",
      data: {
        email: loginForm.email,
        password: "",
      },
    })
      .then(() => {
        setShowLogin(false);
        setShowRegister(false);
        setShowNewPassword(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 404) {
          alert("Uživatel s tímto emailem neexistuje.");
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
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
          {!props.token && props.token !== "" && props.token !== undefined ? (
            !showLogin &&
            !showRegister && (
              <div>
                <button
                  className="login-button"
                  onClick={() => setShowLogin(true)}
                >
                  Přihlásit
                </button>
                <button
                  className="register-button"
                  onClick={() => setShowRegister(true)}
                >
                  Registrovat
                </button>
              </div>
            )
          ) : (
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          )}
          {showLogin && (
            <form className="login">
              <input
                onChange={handleChange}
                type="email"
                text={loginForm.email}
                name="email"
                placeholder="Email"
                value={loginForm.email}
              />
              <input
                onChange={handleChange}
                type="password"
                text={loginForm.password}
                name="password"
                placeholder="Password"
                value={loginForm.password}
              />
              <div className="login-and-forgot">
                <button className="login--button" onClick={login}>
                  Login
                </button>
                <p
                  className="forgot_password--button"
                  onClick={() => {
                    setShowNewPassword(true);
                    setShowLogin(false);
                  }}
                >
                  Forgot password
                </p>
              </div>
            </form>
          )}
          {showRegister && (
            <form className="register">
              <input
                onChange={handleChange}
                type="email"
                text={loginForm.email}
                name="email"
                placeholder="Email"
                value={loginForm.email}
              />
              <input
                onChange={handleChange}
                type="password"
                text={loginForm.password}
                name="password"
                placeholder="Password"
                value={loginForm.password}
              />
              <button onClick={register}>Register</button>
            </form>
          )}
          {showNewPassword && (
            <form className="new-password">
              <input
                onChange={handleChange}
                type="email"
                text={loginForm.email}
                name="email"
                placeholder="Email"
                value={loginForm.email}
              />
              <button onClick={forgot_password}>Send me new password</button>
            </form>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
