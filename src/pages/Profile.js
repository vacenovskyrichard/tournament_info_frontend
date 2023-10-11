import "../styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Profile(props) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const user_id = jwt_decode(props.token.access_token).sub;
    fetch("http://127.0.0.1:5000/user_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token.access_token}`,
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw new Error("Failed to send data or fetch response");
        }
      })
      .then((resp) => {
        console.log(resp);
        setUserData(resp);
      });
  }, []);

  const goToMainPage = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      {props.token && (
        <div>
          <h1>Profil</h1>
          <p>{userData.id}</p>
          <p>{userData.email}</p>
          <p>{userData.name}</p>
          <p>{userData.surname}</p>
          <p>{userData.role}</p>
        </div>
      )}
    </>
  );
}
export default Profile;
