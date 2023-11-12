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
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tournamentsState } from "./state/atoms/TournamentsState";
import { apiUrlState } from "./state/atoms/ApiUrlState";
import { screenSize } from "./state/atoms/ScreenSize";
import useToken from "./components/useToken";
import "./variables.css";

function App() {
  const setTournaments = useSetRecoilState(tournamentsState);
  const setScreenSize = useSetRecoilState(screenSize);
  const [apiUrl, setApiUrl] = useRecoilState(apiUrlState);
  const [filterOptions, setFilterOptions] = useState([]);
  const [tournamentToEditId, setTournamentToEditId] = useState();
  const [loadingMainTable, setLoadingMainTable] = useState(true);
  const { token, removeToken } = useToken();

  // eslint-disable-next-line
  const localhost = "http://127.0.0.1:5000";
  // eslint-disable-next-line
  const production = "https://jdem-hrat-58da3e527841.herokuapp.com";

  setScreenSize(
    useMediaQuery({ query: "(max-width: 1224px)" }) ? "mobile" : "desktop"
  );
  useEffect(() => {
    setApiUrl(production);
    // eslint-disable-next-line

    // initialize empty token if token is null
    token || removeToken();
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
        console.log("RESPOSNE:");
        console.log(resp);
        setTournaments(
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
        console.log("ERROR:");
        console.log(err);
        setLoadingMainTable(false);
      }); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Homepage
                filterOptions={filterOptions}
                loadingMainTable={loadingMainTable}
              />
            }
          />
          <Route path="/add_tournament" element={<AddTournament />} />
          <Route
            path="/edit_tournament"
            element={<EditTournament tournamentToEditId={tournamentToEditId} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={
              <Profile
                setTournamentToEditId={setTournamentToEditId}
                loadingMainTable={loadingMainTable}
              />
            }
          />
          <Route
            path="/change_password"
            element={
              <ChangePassword setTournamentToEditId={setTournamentToEditId} />
            }
          />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
