import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const goToRegistration = () => {
    navigate("/register");
  };
  const goToForgotPassword = () => {
    navigate("/forgot_password");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <form class="login-form">
          <span class="login-form-title">Sign In With</span>
          <div className="socials-buttons">
            <div className="facebook-button">
              <img
                className="facebook-logo"
                alt="logo"
                src="./facebook-logo.png"
              />
              Facebook
            </div>
            <div className="google-button">
              <img className="google-logo" alt="logo" src="./google-logo.png" />
              Google
            </div>
          </div>

          <div class="p-t-31 p-b-9">
            <span class="txt1">Username</span>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="Username is required"
          >
            <input
              class="input100"
              onChange={handleChange}
              type="email"
              text={loginForm.email}
              name="email"
              placeholder="Email"
              value={loginForm.email}
            />
            <span class="focus-input100"></span>
          </div>
          <div class="p-t-13 p-b-9">
            <span class="txt1">Password</span>
            <a href="#" class="txt2 bo1 m-l-5">
              Forgot?
            </a>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              class="input100"
              onChange={handleChange}
              type="password"
              text={loginForm.password}
              name="password"
              placeholder="Password"
              value={loginForm.password}
            />

            <span class="focus-input100"></span>
          </div>
          <div class="container-login100-form-btn m-t-17">
            <button class="login100-form-btn">Sign In</button>
          </div>
          <div class="w-full text-center p-t-55">
            <span class="txt2">Not a member?</span>
            <a href="#" class="txt2 bo1">
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;

// <div className="login--page">
//   <title>Jdem Hrát - Přihlášení</title>
//   <div className="login">
//     <h1>Přihlášení</h1>
//     <form className="login-form">
//       <input
//         onChange={handleChange}
//         type="email"
//         text={loginForm.email}
//         name="email"
//         placeholder="Email"
//         value={loginForm.email}
//       />
// <input
//   onChange={handleChange}
//   type="password"
//   text={loginForm.password}
//   name="password"
//   placeholder="Password"
//   value={loginForm.password}
// />
//       <button className="" onClick={login}>
//         Přihlásit
//       </button>
//     </form>
//     <div />
//     <div />

//     <div className="facebook-login">
//       <LoginSocialFacebook
//         appId="1071320220907752"
//         onResolve={(response) => console.log(response)}
//         onReject={(error) => console.error()}
//       >
//         <h1>Login with facebook</h1>
//         <FacebookLoginButton />
//       </LoginSocialFacebook>
//     </div>
//     <div className="google-login">
//       <h1>Login with Google</h1>
//       <GoogleLogin
//         onSuccess={(response) => {
//           console.log("Login with google succesful.");
//           loginWithGoogle(jwt_decode(response.credential));
//         }}
//         onError={(error) => console.log("Login failed")}
//       />
//     </div>
//     <div>
//       <h1>Ostatní</h1>
//       <button onClick={goToMainPage}>Hlavní strana</button>
//       <button onClick={goToRegistration}>Registrovat</button>
//       <button onClick={goToForgotPassword}>Zapomenuté heslo</button>
//     </div>
//   </div>
// </div>
