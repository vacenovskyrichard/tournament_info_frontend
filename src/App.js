import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import useToken from "./components/useToken";

function App() {
  const { setToken, token, removeToken } = useToken();

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
