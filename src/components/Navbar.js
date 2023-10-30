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
      <div className="navbar--left">
        <a href="/">
          <img
            className="navbar--logo"
            alt="logo"
            src="./logo/basic/png/logo-no-background.png"
          />
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
              <p
                className="navbar--login-btn"
                onClick={() => navigate("/login")}
              >
                Přihlásit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
