import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import jwt_decode from "jwt-decode";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const google_login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Login with google succesful.");
      console.log(response);
      const at = response.access_token;
      axios({
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`,
      })
        .then((response) => {
          console.log(response.data);
          loginWithGoogle({
            email: response.data.email,
            password: response.data.sub,
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
  });

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
        const decodedToken = jwt_decode(response.data.access_token);
        const email = decodedToken.identity; // This will contain the user ID
        // console.log(response.data.access_token);
        console.log(decodedToken);
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
    console.log(googleLoginCred.email, googleLoginCred.sub);
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/google_login",
      data: {
        email: googleLoginCred.email,
        password: googleLoginCred.password,
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
        <form className="login-form">
          <span className="login-form-title">Přihlášení</span>
          <div className="socials-buttons">
            <div className="facebook-button">
              <img
                className="facebook-logo"
                alt="logo"
                src="./facebook-logo.png"
              />
              Facebook
            </div>

            <div onClick={google_login} className="google-button">
              <img className="google-logo" alt="logo" src="./google-logo.png" />
              Google
            </div>

            {/* <GoogleLogin
              onSuccess={(response) => {
                console.log("Login with google succesful.");
                // loginWithGoogle(jwt_decode(response.credential));
                console.log(response.credential);
                console.log(jwt_decode(response.credential));
              }}
              onError={(error) => console.log("Login failed")}
            /> */}
          </div>

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
            <div className="Login--password-label-box">
              <p className="Login--label">Heslo</p>
              <p
                onClick={goToForgotPassword}
                className="Login--tiny-label clickable"
              >
                Zapomněli jste?
              </p>
            </div>
            <div className="wrap-input">
              <input
                onChange={handleChange}
                type="password"
                text={loginForm.password}
                name="password"
                value={loginForm.password}
              />
            </div>
            <div className="Login--login-button" onClick={login}>
              Přihlásit
            </div>
          </div>
          <div className="Login--register">
            <p className="Login--tiny-label">Nemáte účet?</p>
            <p
              onClick={goToRegistration}
              className="Login--tiny-label clickable"
            >
              Registrovat
            </p>
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
//       <input
//         onChange={handleChange}
//         type="password"
//         text={loginForm.password}
//         name="password"
//         placeholder="Password"
//         value={loginForm.password}
//       />
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
{
  /* <GoogleLogin
  onSuccess={(response) => {
    console.log("Login with google succesful.");
    loginWithGoogle(jwt_decode(response.credential));
  }}
  onError={(error) => console.log("Login failed")}
/> */
}
//     </div>
//     <div>
//       <h1>Ostatní</h1>
//       <button onClick={goToMainPage}>Hlavní strana</button>
//       <button onClick={goToRegistration}>Registrovat</button>
//       <button onClick={goToForgotPassword}>Zapomenuté heslo</button>
//     </div>
//   </div>
// </div>
