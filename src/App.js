import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddTournament from "./pages/AddTournament";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_tournament" element={<AddTournament />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
