import "../styles/Login.css";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import InputField from "../components/InputField";

function ForgotPassword({ isTabletOrMobile }) {
  const apiUrl = useRecoilValue(apiUrlState);
  const [sendFailed, setSendFailed] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  // generate new password and send it to users email
  function create_new_password(credentials) {
    axios({
      method: "POST",
      url: `${apiUrl}/reset`,
      data: {
        email: credentials.email,
        isPlayer: isPlayer,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setSendSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 404) {
          setSendFailed(true);
        }
      });
  }

  return (
    <div className="login-page">
      {sendSuccess && (
        <div className="Login--registration_succesfull">
          <span>Nové heslo bylo zasláno na uvedený email.</span>
        </div>
      )}
      {sendFailed && (
        <div className="Login--registration_failed">
          <span>Uživatel s tímto emailem neexistuje</span>
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
        <form
          onSubmit={handleSubmit(create_new_password)}
          className="login-form"
        >
          <span className="login-form-title">Zapomenuté heslo</span>

          <div className="Login--main-form">
            <InputField
              label={"Email"}
              type={"email"}
              name={"email"}
              requiredMessage={"Zadejte email"}
              errors={errors.email}
              register={register}
            />

            <button className="Login--login-button" type="submit">
              <p>Vygenerovat nové heslo</p>
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
  );
}
export default ForgotPassword;
