import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import useToken from "./components/useToken";
import { useEffect, useState } from "react";

function App() {
  const { setToken, token, removeToken } = useToken();
  const [tournamentsData, setTournamentsData] = useState([]);
  useEffect(() => {
    // fetch("http://127.0.0.1:5000/get", {
    fetch("https://jdem-hrat-58da3e527841.herokuapp.com/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setTournamentsData(resp))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Homepage
                token={token}
                removeToken={removeToken}
                setToken={setToken}
                tournamentsData={tournamentsData}
                setTournamentsData={setTournamentsData}
              />
            }
          />
          <Route
            path="/add_tournament"
            element={
              <AddTournament
                token={token}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                token={token}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                token={token}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/forgot_password"
            element={
              <ForgotPassword
                token={token}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                token={token}
                removeToken={removeToken}
                setToken={setToken}
                tournamentsData={tournamentsData}
                setTournamentsData={setTournamentsData}
              />
            }
          />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
