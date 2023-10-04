import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import Login from "./pages/Login";
import useToken from "./components/useToken";

function App() {
  const { setToken, getToken, removeToken } = useToken();
  // Saving the token
  // setToken({
  //   access_token: "your-access-token-value",
  //   role: "basic",
  //   user_id: "your-user-id-value",
  // });

  // // Reading the access_token
  // const tokenObject = getToken();
  // if (tokenObject) {
  //   const access_token = tokenObject.access_token;
  //   console.log("Access Token:", access_token);
  // } else {
  //   console.log("Token not found.");
  // }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Homepage
                getToken={getToken}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/add_tournament"
            element={
              <AddTournament
                getToken={getToken}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                getToken={getToken}
                removeToken={removeToken}
                setToken={setToken}
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
