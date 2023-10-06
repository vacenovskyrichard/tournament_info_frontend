import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import AddTournament from "./pages/AddTournament";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import useToken from "./components/useToken";

function App() {
  const { setToken, getToken, removeToken } = useToken();

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
          <Route
            path="/register"
            element={
              <Register
                getToken={getToken}
                removeToken={removeToken}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/forgot_password"
            element={
              <ForgotPassword
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
