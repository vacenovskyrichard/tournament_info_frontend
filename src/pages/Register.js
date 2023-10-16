import "../styles/Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ apiUrl }) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const navigate = useNavigate();

  function register(event) {
    axios({
      method: "POST",
      url: `${apiUrl}/register`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
        name: loginForm.name,
        surname: loginForm.surname,
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          setRegistrationSuccesful(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 409) {
          setRegistrationFailed(true);
        }
      });

    setloginForm({
      email: "",
      password: "",
      name: "",
      surname: "",
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
        {registrationSuccesful && (
          <div className="Login--registration_succesfull">
            <span>Registrace proběhla úspěšně</span>
          </div>
        )}
        {registrationFailed && (
          <div className="Login--registration_failed">
            <span>Uživatel s tímto emailem již existuje</span>
          </div>
        )}

        <div className="login-box">
          <span className="Login--x-btn" onClick={goToMainPage}>
            x
          </span>
          <form className="login-form">
            <span className="login-form-title">Registrace</span>

            <div className="Login--main-form">
              <p className="Login--label">Jméno</p>
              <div className="wrap-input">
                <input
                  onChange={handleChange}
                  type="name"
                  text={loginForm.name}
                  name="name"
                  value={loginForm.name}
                />
              </div>
              <p className="Login--label">Příjmení</p>
              <div className="wrap-input">
                <input
                  onChange={handleChange}
                  type="surname"
                  text={loginForm.surname}
                  name="surname"
                  value={loginForm.surname}
                />
              </div>
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
              <p className="Login--label">Heslo</p>
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
