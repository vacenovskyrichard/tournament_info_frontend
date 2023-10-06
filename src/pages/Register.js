import "../styles/Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function register(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/register",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then(() => {})
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 409) {
          alert("Uživatel s tímto emailem už je registrován.");
        }
      });

    setloginForm({
      email: "",
      password: "",
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

  return (
    <div className="register--page">
      <title>Jdem Hrát - Registrace</title>
      <h1>Registrace</h1>

      <form className="">
        <input
          onChange={handleChange}
          type="email"
          text={loginForm.email}
          name="email"
          placeholder="Email"
          value={loginForm.email}
        />
        <input
          onChange={handleChange}
          type="password"
          text={loginForm.password}
          name="password"
          placeholder="Password"
          value={loginForm.password}
        />
        <button onClick={register}>Registrovat</button>
      </form>

      <div>
        <button onClick={goToMainPage}>Zpět na hlavní stranu</button>
      </div>
    </div>
  );
}
export default Register;
