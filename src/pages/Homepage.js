import Navbar from "../components/Navbar";
import Data from "../components/Data";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";

function Homepage({ token, setToken, removeToken }) {
  const [tournamentsData, setTournamentsData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get", {
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
    <>
      <Navbar token={token} setToken={setToken} removeToken={removeToken} />
      <Filters data={tournamentsData} setData={setTournamentsData} />
      <Data data={tournamentsData} setData={setTournamentsData} token={token} />
    </>
  );
}
export default Homepage;
