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
import { useMediaQuery } from "react-responsive";

function App() {
  const { setToken, token, removeToken } = useToken();
  const [tournamentsData, setTournamentsData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [tournamentToEditId, setTournamentToEditId] = useState();
  const [loadingMainTable, setLoadingMainTable] = useState(true);
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
      .then((resp) => {
        // save tournament data to state and format last update time
        setTournamentsData(
          resp.map((tournament) => {
            const [last_update_date, last_update_time] =
              tournament.last_update.split("T");
            const [year, month, day] = last_update_date.split("-");
            const [hour, minute, second] = last_update_time.split(":");
            const targetDateString = `${year}-${month}-${day} ${hour}:${minute}`;
            return {
              ...tournament,
              last_update: targetDateString,
            };
          })
        );
        setFilterOptions(resp);
      })
      .then(() => setLoadingMainTable(false))
      .catch((err) => {
        console.log(err);
        setLoadingMainTable(false);
      }); // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  // eslint-disable-next-line
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
                isTabletOrMobile={isTabletOrMobile}
                loadingMainTable={loadingMainTable}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
                loadingMainTable={loadingMainTable}
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
                isTabletOrMobile={isTabletOrMobile}
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
                isTabletOrMobile={isTabletOrMobile}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
