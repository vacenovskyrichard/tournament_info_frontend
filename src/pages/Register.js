import { useForm, Controller } from "react-hook-form";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ apiUrl, isTabletOrMobile }) {
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);

  const navigate = useNavigate();

  // function to register user (player or organizer based on flag isPlayer) in database
  function register_user(credentials) {
    axios({
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
  }

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
          <form onSubmit={handleSubmit(register_user)} className="login-form">
            <span className="login-form-title">Registrace</span>

            <div className="Login--main-form">
              <p className="Login--label">Jméno</p>
              <div className="wrap-input">
                <input
                  type="name"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Zadejte jméno",
                    },
                  })}
                />
                {errors.name && (
                  <p style={{ fontSize: "20px", color: "red" }}>
                    {errors.name?.message}
                  </p>
                )}{" "}
              </div>
              <p className="Login--label">Příjmení</p>
              <div className="wrap-input">
                <input
                  type="surname"
                  name="surname"
                  {...register("surname", {
                    required: {
                      value: true,
                      message: "Zadejte příjmení",
                    },
                  })}
                />
                {errors.surname && (
                  <p style={{ fontSize: "20px", color: "red" }}>
                    {errors.surname?.message}
                  </p>
                )}
              </div>
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
              <p className="Login--label">Heslo</p>
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
                <p>Registrovat</p>
              </button>
            </div>
            <div className="Login--register">
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
