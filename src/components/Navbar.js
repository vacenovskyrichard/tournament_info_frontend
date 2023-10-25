import "../styles/Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function Navbar({ token, removeToken, apiUrl, title }) {
  const navigate = useNavigate();

  function logout() {
    axios({
      method: "POST",
      url: `${apiUrl}/logout`,
    })
      .then((response) => {
        removeToken();
      })
      .then((response) => {
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

  return (
    <div className="navbar">
      <title>Jdem Hrát</title>
      <div className="navbar--left">
        <a href="/">
          <img className="navbar--logo" alt="logo" src="./logo.png" />
        </a>
      </div>
      <div className="navbar--center">
        <h1 className="navbar--title">{title}</h1>
      </div>

      <div className="navbar--right">
        <div>
          {token ? (
            <HamburgerMenu logout={logout} />
          ) : (
            <div>
              <button
                className="login-button"
                onClick={() => navigate("/login")}
              >
                Přihlásit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
