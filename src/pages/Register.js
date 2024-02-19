import { useForm, Controller } from "react-hook-form";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import InputField from "../components/InputField";
import { screenSize } from "../state/atoms/ScreenSize";

function Register() {
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);

  const navigate = useNavigate();

  // function to register user (player or organizer based on flag isPlayer) in database
  function register_user(credentials) {
    credentials.password === credentials.passwordCheck
      ? axios({
          method: "POST",
          url: `${apiUrl}/register`,
          data: {
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
            surname: credentials.surname,
            isPlayer: isPlayer,
          },
        })
          .then((resp) => {
            if (resp.status === 200) {
              setPasswordsNotMatch(false);
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
          })
      : setPasswordsNotMatch(true);
  }

  return (
    <>
      <div className="Login">
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
        {passwordsNotMatch && (
          <div className="Login--registration_failed">
            <span>Zadaná hesla se neshodují</span>
          </div>
        )}
        <div
          className={
            screenType === "mobile"
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
        <div
          className={screenType === "mobile" ? "login-box-mobile" : "login-box"}
        >
          <span
            className={
              screenType === "mobile" ? "Login--x-btn-mobile" : "Login--x-btn"
            }
            onClick={() => navigate("/")}
          >
            x
          </span>
          <form
            onSubmit={handleSubmit(register_user)}
            className={
              screenType === "mobile" ? "login-form-mobile" : "login-form"
            }
          >
            <span
              className={
                screenType === "mobile"
                  ? "login-form-title-mobile"
                  : "login-form-title"
              }
            >
              Registrace
            </span>

            <div
              className={
                screenType === "mobile"
                  ? "Login--main-form-mobile"
                  : "Login--main-form"
              }
            >
              <div className="InputField">
                <label className="InputField--label">Jméno</label>
                <input
                  className="InputField--input"
                  type="text"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Zadejte jméno",
                    },
                  })}
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>

              <div className="InputField">
                <label className="InputField--label">Příjmení</label>
                <input
                  className="InputField--input"
                  type="text"
                  name="surname"
                  {...register("surname", {
                    required: {
                      value: true,
                      message: "Zadejte příjmení",
                    },
                  })}
                />
                {errors.surname && (
                  <p className="error-message">{errors.surname.message}</p>
                )}
              </div>

              <div className="InputField">
                <label className="InputField--label">Email</label>
                <input
                  className="InputField--input"
                  type="email"
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Zadejte email",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Zadejte platný email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="InputField">
                <label className="InputField--label">Heslo</label>
                <input
                  className="InputField--input"
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
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>

              <div className="InputField">
                <label className="InputField--label">Heslo</label>
                <input
                  className="InputField--input"
                  type="password"
                  name="passwordCheck"
                  {...register("passwordCheck", {
                    required: {
                      value: true,
                      message: "Zadejte heslo znovu",
                    },
                  })}
                />
                {errors.passwordCheck && (
                  <p className="error-message">
                    {errors.passwordCheck.message}
                  </p>
                )}
              </div>

              <button className="Login--login-button" type="submit">
                {isPlayer ? (
                  <p>Registrovat jako hráč</p>
                ) : (
                  <p>Registrovat jako organizátor</p>
                )}
              </button>
            </div>
            <div
              className={
                screenType === "mobile"
                  ? "Login--register-mobile"
                  : "Login--register"
              }
            >
              <p
                onClick={() => navigate("/login")}
                className="Login--tiny-label clickable"
              >
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
