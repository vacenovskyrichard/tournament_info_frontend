import Navbar from "../components/Navbar";
import ElevatorText from "../components/ElevatorText";
import Filters from "../components/Filters";
import CalendarTableButtons from "../components/CalendarTableButtons";
import Data from "../components/Data";
import MyCalendar from "../components/Calendar";
import Resources from "../components/Resources";
import Footer from "../components/Footer";
import { useState } from "react";

function Homepage({ filterOptions, loadingMainTable }) {
  const [showData, setShowData] = useState(true);
  const [filterResults, setFilterResults] = useState();

  return (
    <>
      <Navbar
        // title={"Přehled"}
        title={""}
      />

      <ElevatorText />
      <Filters
        setFilterResults={setFilterResults}
        filterOptions={filterOptions}
      />
      <CalendarTableButtons setShowData={setShowData} showData={showData} />
      {showData ? (
        <Data showData={showData} loadingMainTable={loadingMainTable} />
      ) : (
        <MyCalendar filterResults={filterResults} showData={showData} />
      )}
      <Resources />
      <Footer />
    </>
  );
}
export default Homepage;
