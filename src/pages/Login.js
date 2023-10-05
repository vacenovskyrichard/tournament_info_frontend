import "../styles/Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function login(event) {
    console.log("Logging in.");
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data);
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        if (error.response.status === 401) {
          alert("Neplatný email nebo heslo.");
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

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

  function loginWithGoogle(googleLoginCred) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/google_login",
      data: {
        email: googleLoginCred.email,
        password: googleLoginCred.sub,
      },
    })
      .then((response) => {
        props.setToken(response.data);
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
    <div className="">
      <title>Jdem Hrát - Login</title>
      <div className="login">
        <h1>Login</h1>
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
          <button className="" onClick={login}>
            Login
          </button>
        </form>
        <div />
        <div className="register">
          <h1>Register</h1>
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
            <button onClick={register}>Register</button>
          </form>
        </div>
        <div />
        <div className="forgot-password">
          <h1>Forgot password?</h1>
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
        </div>
        <div className="facebook-login">
          <LoginSocialFacebook
            appId="1071320220907752"
            onResolve={(response) => console.log(response)}
            onReject={(error) => console.error()}
          >
            <h1>Login with facebook</h1>
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
        <div className="google-login">
          <h1>Login with Google</h1>
          <GoogleLogin
            onSuccess={(response) => {
              console.log("Login with google succesful.");
              console.log(jwt_decode(response.credential));
              loginWithGoogle(jwt_decode(response.credential));
            }}
            onError={(error) => console.log("Login failed")}
          />
        </div>

        <div>
          <button onClick={goToMainPage}>Back to main page</button>
        </div>
      </div>
    </div>
  );
}
export default Login;
