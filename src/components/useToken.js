import { useState } from "react";

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    return userToken ? JSON.parse(userToken) : null; // Check if userToken exists before parsing
  }
  const [token, _setToken] = useState(getToken());

  function setToken(userToken) {
    localStorage.setItem("token", JSON.stringify(userToken));
    _setToken(JSON.stringify(userToken));
  }

  function removeToken() {
    localStorage.removeItem("token");
    _setToken(null);
  }

  return {
    setToken,
    getToken,
    removeToken,
  };
}

export default useToken;
