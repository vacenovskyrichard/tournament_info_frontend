import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword(props) {
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
      url: "http://127.0.0.1:5000/reset",
      data: {
        email: loginForm.email,
        password: "",
      },
    })
      .then(() => {})
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 404) {
          alert("Uživatel s tímto emailem neexistuje.");
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

  return (
    <div className="forgot-password--page">
      <title>Jdem Hrát - Zapomenuté heslo</title>
      <h1>Zapomenuté heslo</h1>
      <form className="">
        <input
          onChange={handleChange}
          type="email"
          text={loginForm.email}
          name="email"
          placeholder="Email"
          value={loginForm.email}
        />
        <button onClick={forgot_password}>Send me new password</button>
      </form>
      <div>
        <button onClick={goToMainPage}>Back to main page</button>
      </div>
    </div>
  );
}
export default ForgotPassword;
