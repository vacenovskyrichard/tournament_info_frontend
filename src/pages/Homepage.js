import Navbar from "../components/Navbar";
import ElevatorText from "../components/ElevatorText";
import Filters from "../components/Filters";
import CalendarTableButtons from "../components/CalendarTableButtons";
import Data from "../components/Data";
import MyCalendar from "../components/Calendar";
import Resources from "../components/Resources";
import Footer from "../components/Footer";
import { useState } from "react";

function Homepage({ filterOptions, isTabletOrMobile, loadingMainTable }) {
  const [showData, setShowData] = useState(true);
  const [filterResults, setFilterResults] = useState();

  return (
    <>
      <Navbar
        // title={"Přehled"}
        title={""}
        isTabletOrMobile={isTabletOrMobile}
      />

      <ElevatorText />
      <Filters
        setFilterResults={setFilterResults}
        filterOptions={filterOptions}
        isTabletOrMobile={isTabletOrMobile}
      />
      <CalendarTableButtons
        isTabletOrMobile={isTabletOrMobile}
        setShowData={setShowData}
        showData={showData}
      />
      {showData ? (
        <Data
          showData={showData}
          isTabletOrMobile={isTabletOrMobile}
          loadingMainTable={loadingMainTable}
        />
      ) : (
        <MyCalendar
          filterResults={filterResults}
          showData={showData}
          isTabletOrMobile={isTabletOrMobile}
        />
      )}
      <Resources isTabletOrMobile={isTabletOrMobile} />
      <Footer isTabletOrMobile={isTabletOrMobile} />
    </>
  );
}
export default Homepage;
