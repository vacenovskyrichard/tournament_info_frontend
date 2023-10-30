import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ apiUrl }) {
  const [sendFailed, setSendFailed] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function forgot_password(event) {
    axios({
      method: "POST",
      url: `${apiUrl}/reset`,
      data: {
        email: loginForm.email,
        password: "",
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

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  const goToMainPage = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/login");
  };

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
      <div className="login-box">
        <span className="Login--x-btn" onClick={goToMainPage}>
          x
        </span>
        <form className="login-form">
          <span className="login-form-title">Zapomenuté heslo</span>

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
            <div className="Login--login-button" onClick={forgot_password}>
              Odeslat heslo
            </div>
          </div>
          <p onClick={goToLogin} className="Login--tiny-label clickable">
            Zpět na přihlášení
          </p>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
