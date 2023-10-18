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
  const [showData, setShowData] = useState(false);
  const [filterResults, setFilterResults] = useState();

  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
      />
      <Filters
        data={tournamentsData}
        setData={setTournamentsData}
        apiUrl={apiUrl}
        setFilterResults={setFilterResults}
      />
      <div className="Filters--content-selector">
        <button onClick={() => setShowData(true)}>Tabulka</button>
        <button onClick={() => setShowData(false)}>Kalendář</button>
      </div>
      {showData ? (
        <Data tournamentsData={tournamentsData} />
      ) : (
        <MyCalendar
          tournamentsData={tournamentsData}
          filterResults={filterResults}
        />
      )}
    </>
  );
}
export default Homepage;
