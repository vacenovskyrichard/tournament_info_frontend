import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import EditTournament from "./pages/EditTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import useToken from "./components/useToken";
import { useEffect, useState } from "react";

function App() {
  const { setToken, token, removeToken } = useToken();
  const [tournamentsData, setTournamentsData] = useState([]);
  const [tournamentToEditId, setTournamentToEditId] = useState();
  const localhost = "http://127.0.0.1:5000";
  // eslint-disable-next-line
  const production = "https://jdem-hrat-58da3e527841.herokuapp.com";

  const apiUrl = localhost;
  useEffect(() => {
    fetch(`${apiUrl}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => setTournamentsData(resp))
      .catch((err) => console.log(err)); // eslint-disable-next-line
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
                apiUrl={apiUrl}
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
                apiUrl={apiUrl}
              />
            }
          />
          <Route
            path="/edit_tournament"
            element={
              <EditTournament
                token={token}
                removeToken={removeToken}
                setToken={setToken}
                apiUrl={apiUrl}
                tournamentToEditId={tournamentToEditId}
                tournamentsData={tournamentsData}
                setTournamentsData={setTournamentsData}
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
                apiUrl={apiUrl}
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
                apiUrl={apiUrl}
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
                apiUrl={apiUrl}
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
                apiUrl={apiUrl}
                setTournamentToEditId={setTournamentToEditId}
              />
            }
          />
          <Route
            path="*"
            element={
              <Nopage
                token={token}
                removeToken={removeToken}
                setToken={setToken}
                apiUrl={apiUrl}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
