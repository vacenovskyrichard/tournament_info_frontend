import { useForm, Controller } from "react-hook-form";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import InputField from "../components/InputField";
import { screenSize } from "../state/atoms/ScreenSize";
import useToken from "../components/useToken";

function ChangePassword() {
  const { setToken, token, removeToken } = useToken();
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [changePasswordSuccesful, setChangePasswordSuccesful] = useState(false);
  const [changePasswordFailed, setChangePasswordFailed] = useState(false);
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);

  const navigate = useNavigate();

  function change_password(credentials) {
    const accessToken = token && token.accessToken;

    console.log("token");
    console.log(token);

    credentials.password === credentials.passwordCheck
      ? fetch(`${apiUrl}/change_password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: JSON.stringify({
            email: token.email,
            oldPassword: credentials.oldPassword,
            newPassword: credentials.password,
            isPlayer: token.role === "player",
          }),
        })
          .then((resp) => {
            if (resp.status === 200) {
              setPasswordsNotMatch(false);
              setChangePasswordFailed(false);
              setChangePasswordSuccesful(true);
            }
            if (resp.status === 401) {
              setPasswordsNotMatch(false);
              setChangePasswordSuccesful(false);
              setChangePasswordFailed(true);
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
            if (error.response.status === 409) {
              setChangePasswordFailed(true);
            }
          })
      : setPasswordsNotMatch(true);
  }

  return (
    <>
      <div className="Login">
        {changePasswordSuccesful && (
          <div className="Login--registration_succesfull">
            <span>Heslo bylo úspěšně změněno</span>
          </div>
        )}
        {changePasswordFailed && (
          <div className="Login--registration_failed">
            <span>Zadané původní heslo není správné</span>
          </div>
        )}
        {passwordsNotMatch && (
          <div className="Login--registration_failed">
            <span>Zadaná hesla se neshodují</span>
          </div>
        )}

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
            onSubmit={handleSubmit(change_password)}
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
              Změna hesla
            </span>

            <div
              className={
                screenType === "mobile"
                  ? "Login--main-form-mobile"
                  : "Login--main-form"
              }
            >
              <InputField
                label={"Původní heslo"}
                type={"password"}
                name={"oldPassword"}
                requiredMessage={"Zadejte heslo"}
                errors={errors.oldPassword}
                register={register}
              />

              <InputField
                label={"Nové heslo"}
                type={"password"}
                name={"password"}
                requiredMessage={"Zadejte heslo"}
                errors={errors.password}
                register={register}
              />

              <InputField
                label={"Nové heslo znovu"}
                type={"password"}
                name={"passwordCheck"}
                requiredMessage={"Zadejte znovu heslo"}
                errors={errors.passwordCheck}
                register={register}
              />

              <button className="Login--login-button" type="submit">
                <p>Změnit heslo</p>
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
export default ChangePassword;
