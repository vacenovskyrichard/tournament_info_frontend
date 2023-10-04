import Navbar from "../components/Navbar";
import Data from "../components/Data";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";

function Homepage(props) {
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
      <Navbar
        getToken={props.getToken}
        removeToken={props.removeToken}
        setToken={props.setToken}
      />
      <Filters data={tournamentsData} setData={setTournamentsData} />
      <Data
        data={tournamentsData}
        setData={setTournamentsData}
        getToken={props.getToken}
      />
    </>
  );
}
export default Homepage;
