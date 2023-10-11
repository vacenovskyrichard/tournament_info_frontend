import "../styles/Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function register(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/register",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then(() => {})
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

  const goToMainPage = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <span className="Login--x-btn" onClick={goToMainPage}>
            x
          </span>
          <form className="login-form">
            <span className="login-form-title">Registrace</span>

            <div className="Login--main-form">
              <p className="Login--label">Email</p>
              <div className="wrap-input">
                <input
                  onChange={handleChange}
                  type="email"
                  text={loginForm.email}
                  name="email"
                  value={loginForm.email}
                />
              </div>
              <div className="Login--password-label-box">
                <p className="Login--label">Heslo</p>
              </div>
              <div className="wrap-input">
                <input
                  onChange={handleChange}
                  type="password"
                  text={loginForm.password}
                  name="password"
                  value={loginForm.password}
                />
              </div>
              <div className="Login--login-button" onClick={register}>
                Registrovat
              </div>
            </div>
            <div className="Login--register">
              <p onClick={goToLogin} className="Login--tiny-label clickable">
                Zpět na přihlášení
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
