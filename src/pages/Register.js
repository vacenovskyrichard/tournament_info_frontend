import { useForm, Controller } from "react-hook-form";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import InputField from "../components/InputField";

function Register({ isTabletOrMobile }) {
  const apiUrl = useRecoilValue(apiUrlState);
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
        {passwordsNotMatch && (
          <div className="Login--registration_failed">
            <span>Zadaná hesla se neshodují</span>
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
              <InputField
                label={"Jméno"}
                type={"text"}
                name={"name"}
                requiredMessage={"Zadejte jméno"}
                errors={errors.name}
                register={register}
              />

              <InputField
                label={"Příjmení"}
                type={"text"}
                name={"surname"}
                requiredMessage={"Zadejte příjmení"}
                errors={errors.surname}
                register={register}
              />

              <InputField
                label={"Email"}
                type={"email"}
                name={"email"}
                requiredMessage={"Zadejte email"}
                errors={errors.email}
                register={register}
              />

              <InputField
                label={"Heslo"}
                type={"password"}
                name={"password"}
                requiredMessage={"Zadejte heslo"}
                errors={errors.password}
                register={register}
              />

              <InputField
                label={"Heslo znovu"}
                type={"password"}
                name={"passwordCheck"}
                requiredMessage={"Zadejte znovu heslo"}
                errors={errors.passwordCheck}
                register={register}
              />

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
