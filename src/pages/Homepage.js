import Navbar from "../components/Navbar";
import Data from "../components/Data";
import Filters from "../components/Filters";
import { useEffect, useState } from "react";

function Homepage(props) {
  return (
    <>
      <Navbar
        token={props.token}
        removeToken={props.removeToken}
        setToken={props.setToken}
      />
      <Filters
        data={props.tournamentsData}
        setData={props.setTournamentsData}
      />
      <Data tournamentData={props.tournamentsData} token={props.token} />
    </>
  );
}
export default Homepage;
