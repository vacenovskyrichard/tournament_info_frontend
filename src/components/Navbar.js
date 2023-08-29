import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar(props) {
  const [show, setShow] = useState(false);

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logMeOut() {
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
    setShow(false);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/token",
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
            !show && <button onClick={() => setShow(true)}>Login</button>
          ) : (
            <button onClick={logMeOut} className="logout-button">
              Logout
            </button>
          )}
          {show && (
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
              <button onClick={login}>Login</button>
            </form>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
