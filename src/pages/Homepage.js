import Navbar from "../components/Navbar";
import Data from "../components/Data";
import MyCalendar from "../components/Calendar";
import Filters from "../components/Filters";
import { useState } from "react";

function Homepage({
  token,
  removeToken,
  setToken,
  tournamentsData,
  setTournamentsData,
  apiUrl,
}) {
  const [showData, setShowData] = useState(true);
  const [filterResults, setFilterResults] = useState();

  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Hlavní strana"}
      />
      <Filters
        data={tournamentsData}
        setData={setTournamentsData}
        apiUrl={apiUrl}
        setFilterResults={setFilterResults}
      />
      {showData ? (
        <Data
          tournamentsData={tournamentsData}
          setShowData={setShowData}
          showData={showData}
        />
      ) : (
        <MyCalendar
          tournamentsData={tournamentsData}
          filterResults={filterResults}
          setShowData={setShowData}
          showData={showData}
        />
      )}
    </>
  );
}
export default Homepage;
