import Navbar from "../components/Navbar";
import Data from "../components/Data";
import MyCalendar from "../components/Calendar";
import Filters from "../components/Filters";
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
      <Filters
        setFilterResults={setFilterResults}
        filterOptions={filterOptions}
        isTabletOrMobile={isTabletOrMobile}
      />
      {showData ? (
        <Data
          setShowData={setShowData}
          showData={showData}
          isTabletOrMobile={isTabletOrMobile}
          loadingMainTable={loadingMainTable}
        />
      ) : (
        <MyCalendar
          filterResults={filterResults}
          setShowData={setShowData}
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
