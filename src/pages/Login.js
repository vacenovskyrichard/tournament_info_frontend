import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";

function Login({ setToken, apiUrl }) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();

  const google_login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Login with google succesful.");
      console.log(response);
      const at = response.access_token;
      axios({
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`,
      })
        .then((response) => {
          console.log(response.data);
          loginWithGoogle({
            email: response.data.email,
            password: response.data.sub,
            name: response.data.given_name,
            surname: response.data.family_name,
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
  });

  function login(event) {
    axios({
      method: "POST",
      url: `${apiUrl}/login`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        setToken(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 401) {
          setRegistrationFailed(true);
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  function loginWithGoogle(googleLoginCred) {
    axios({
      method: "POST",
      url: `${apiUrl}/google_login`,
      data: {
        email: googleLoginCred.email,
        password: googleLoginCred.password,
        name: googleLoginCred.name,
        surname: googleLoginCred.surname,
      },
    })
      .then((response) => {
        console.log("STATUS CODE:" + response.status);
        setToken(response.data);
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
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
  const goToRegistration = () => {
    navigate("/register");
  };
  const goToForgotPassword = () => {
    navigate("/forgot_password");
  };

  return (
    <>
      <div className="login-page">
        {registrationFailed && (
          <div className="Login--registration_failed">
            <span>Neplatný email nebo heslo</span>
          </div>
        )}
        <div className="login-box">
          <span className="Login--x-btn" onClick={goToMainPage}>
            x
          </span>
          <form className="login-form">
            <span className="login-form-title">Přihlášení</span>
            <div className="socials-buttons">
              <div className="facebook-button">
                <img
                  className="facebook-logo"
                  alt="logo"
                  src="./facebook-logo.png"
                />
                Facebook
              </div>

              <div onClick={google_login} className="google-button">
                <img
                  className="google-logo"
                  alt="logo"
                  src="./google-logo.png"
                />
                Google
              </div>

              {/* <GoogleLogin
              onSuccess={(response) => {
                console.log("Login with google succesful.");
                // loginWithGoogle(jwt_decode(response.credential));
                console.log(response.credential);
                console.log(jwt_decode(response.credential));
              }}
              onError={(error) => console.log("Login failed")}
            /> */}
            </div>

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
                <p
                  onClick={goToForgotPassword}
                  className="Login--tiny-label clickable"
                >
                  Zapomněli jste?
                </p>
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
              <div className="Login--login-button" onClick={login}>
                Přihlásit
              </div>
            </div>
            <div className="Login--register">
              <p className="Login--tiny-label">Nemáte účet?</p>
              <p
                onClick={goToRegistration}
                className="Login--tiny-label clickable"
              >
                Registrovat
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
