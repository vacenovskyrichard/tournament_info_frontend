import { useForm, Controller } from "react-hook-form";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";

function Login({ isTabletOrMobile }) {
  const apiUrl = useRecoilValue(apiUrlState);
  const { setToken, token } = useToken();
  console.log("token");
  console.log(token);

  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Normal login function
  function login(credentials) {
    axios({
      method: "POST",
      url: `${apiUrl}/login`,
      data: {
        email: credentials.email,
        password: credentials.password,
        isPlayer: isPlayer,
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
  }

  // Google login function to get user data from Google API and call login function
  const google_login = useGoogleLogin({
    onSuccess: async (response) => {
      const at = response.access_token;
      axios({
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${at}`,
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

  // Google login function
  function loginWithGoogle(googleLoginCred) {
    axios({
      method: "POST",
      url: `${apiUrl}/google_login`,
      data: {
        email: googleLoginCred.email,
        password: googleLoginCred.password,
        name: googleLoginCred.name,
        surname: googleLoginCred.surname,
        isPlayer: isPlayer,
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

  return (
    <>
      <div className="login-page">
        {registrationFailed && (
          <div className="Login--registration_failed">
            <span>Neplatný email nebo heslo</span>
          </div>
        )}
        <div
          className={
            isTabletOrMobile
              ? "Login--organizer-player-switch-mobile"
              : "Login--organizer-player-switch"
          }
        >
          <button
            className={`Login--player-btn ${isPlayer ? "chosen" : ""}`}
            onClick={() => setIsPlayer(true)}
          >
            Hráč
          </button>
          <button
            className={`Login--organizer-btn ${isPlayer ? "" : "chosen"}`}
            onClick={() => setIsPlayer(false)}
          >
            Organizátor
          </button>
        </div>
        <div className="login-box">
          <span className="Login--x-btn" onClick={() => navigate("/")}>
            x
          </span>
          <form onSubmit={handleSubmit(login)} className="login-form">
            {/* <form className="login-form"> */}
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
            </div>

            <div className="Login--main-form">
              <p className="Login--label">Email</p>
              <div className="wrap-input">
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Zadejte email",
                    },
                  })}
                />
                {errors.email && (
                  <p style={{ fontSize: "20px", color: "red" }}>
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="Login--password-label-box">
                <p className="Login--label">Heslo</p>
                <p
                  onClick={() => navigate("/forgot_password")}
                  className="Login--tiny-label clickable"
                >
                  Zapomněli jste?
                </p>
              </div>
              <div className="wrap-input">
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Zadejte heslo",
                    },
                  })}
                />
                {errors.password && (
                  <p style={{ fontSize: "20px", color: "red" }}>
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <button className="Login--login-button" type="submit">
                <p>Přihlásit</p>
              </button>
            </div>
            <div className="Login--register">
              <p className="Login--tiny-label">Nemáte účet?</p>
              <p
                onClick={() => navigate("/register")}
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
