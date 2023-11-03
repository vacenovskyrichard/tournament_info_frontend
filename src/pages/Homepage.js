import Navbar from "../components/Navbar";
import Data from "../components/Data";
import MyCalendar from "../components/Calendar";
import Filters from "../components/Filters";
import Resources from "../components/Resources";
import Footer from "../components/Footer";
import { useState } from "react";

function Homepage({
  token,
  removeToken,
  setToken,
  tournamentsData,
  setTournamentsData,
  apiUrl,
  filterOptions,
  isTabletOrMobile,
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
        // title={"Přehled"}
        title={""}
        isTabletOrMobile={isTabletOrMobile}
      />
      <Filters
        data={tournamentsData}
        setData={setTournamentsData}
        apiUrl={apiUrl}
        setFilterResults={setFilterResults}
        filterOptions={filterOptions}
        isTabletOrMobile={isTabletOrMobile}
      />
      {showData ? (
        <Data
          tournamentsData={tournamentsData}
          setShowData={setShowData}
          showData={showData}
          isTabletOrMobile={isTabletOrMobile}
        />
      ) : (
        <MyCalendar
          tournamentsData={tournamentsData}
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
