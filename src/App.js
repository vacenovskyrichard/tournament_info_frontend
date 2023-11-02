import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import EditTournament from "./pages/EditTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import useToken from "./components/useToken";
import { useEffect, useState } from "react";

function App() {
  const { setToken, token, removeToken } = useToken();
  const [tournamentsData, setTournamentsData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [tournamentToEditId, setTournamentToEditId] = useState();
  const localhost = "http://127.0.0.1:5000";
  // eslint-disable-next-line
  const production = "https://jdem-hrat-58da3e527841.herokuapp.com";

  const apiUrl = production;
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
      .then((resp) => {
        // save tournament data to state and format last update time
        setTournamentsData(
          resp.map((tournament) => {
            const [last_update_date, last_update_time] =
              tournament.last_update.split("T");
            const [year, month, day] = last_update_date.split("-");
            const [hour, minute, second] = last_update_time.split(":");
            return {
              ...tournament,
              last_update: `${day}.${month}.${year} ${hour}:${minute}`,
            };
          })
        );
        setFilterOptions(resp);
      })
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
                filterOptions={filterOptions}
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
            path="/change_password"
            element={
              <ChangePassword
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
