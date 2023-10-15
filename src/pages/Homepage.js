import Navbar from "../components/Navbar";
import Data from "../components/Data";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";

function Homepage({
  token,
  removeToken,
  setToken,
  tournamentsData,
  setTournamentsData,
  apiUrl,
}) {
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
      />
      <Data tournamentData={tournamentsData} token={token} apiUrl={apiUrl} />
    </>
  );
}
export default Homepage;
