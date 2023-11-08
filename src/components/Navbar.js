import "../styles/Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";

function Navbar({ title, isTabletOrMobile }) {
  const apiUrl = useRecoilValue(apiUrlState);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  console.log("token");
  console.log(token);
  // logout user
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
            className={
              isTabletOrMobile ? "navbar--logo-mobile" : "navbar--logo"
            }
            alt="logo"
            src="./logo/basic/png/logo-no-background.png"
          />
        </a>
      </div>
      <div className="navbar--center">
        <h1 className="navbar--title">{isTabletOrMobile ? "" : title}</h1>
      </div>

      <div className="navbar--right">
        <div>
          {token.id != "" ? (
            <HamburgerMenu
              logout={logout}
              isTabletOrMobile={isTabletOrMobile}
            />
          ) : (
            <div>
              <p
                className={
                  isTabletOrMobile
                    ? "navbar--login-btn-mobile"
                    : "navbar--login-btn"
                }
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
