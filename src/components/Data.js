import "../styles/Data.css";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ReactComponent as CustomIcon } from "../icons/info-circle.svg";

function Data({ tournamentsData, setShowData, showData }) {
  console.log("tournamentsData");
  console.log(tournamentsData);
  // Function to compare dates in "YYYY-MM-DD" format
  function compareDates(dateA, dateB) {
    return dateA.localeCompare(dateB);
  }
  // Sort data by date
  tournamentsData.sort((a, b) => compareDates(a.date, b.date));

  // Expanded component for every tournament in table
  const ExpandedComponent = ({ data }) => {
    const [timeRemainingString, setTimeRemainingString] = useState();
    const targetDateString = `${data.date} ${data.start}`;
    const targetDate = new Date(targetDateString);

    useEffect(() => {
      let secTimer = setInterval(() => {
        // Get the current date and time
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;

        // Calculate the remaining days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        let dayWord = days === 1 ? "den" : days < 5 ? "dny" : "dní";
        let hourWord = hours === 1 ? "hodina" : hours < 5 ? "hodiny" : "hodin";
        let minutesWord =
          hours === 1 ? "minuta" : hours < 5 ? "minuty" : "minut";
        let secondsWord =
          hours === 1 ? "vteřina" : hours < 5 ? "vteřiny" : "vteřin";
        let remainsWord = days > 1 && days < 5 ? "zbývají" : "zbývá";

        //set time remaining to start of tournament
        setTimeRemainingString(
          `Do turnaje ${remainsWord}:  ${days} ${dayWord}, ${hours} ${hourWord}, ${minutes} ${minutesWord}, ${seconds} ${secondsWord}.`
        );
      }, 1000);

      return () => clearInterval(secTimer); // eslint-disable-next-line
    }, []);

    return (
      <div className="Data--expanded-data-box">
        <div className="Data--expanded-data">
          <h3>Detail</h3>
          <p>{`Cena: ${data.price},- (na osobu)`}</p>
          <p>Začátek: {data.start}</p>
          <p>Organizátor: {data.organizer}</p>
          <div>
            <p>
              Odkaz: <a href={data.link}>{data.link}</a>
            </p>
          </div>
          <p style={{ fontStyle: "italic" }}>
            Naposledy aktualizováno: {data.last_update}
          </p>
        </div>
        <div className="Data--time-remaining">
          <p>{timeRemainingString}</p>
        </div>
      </div>
    );
  };

  // style react-data-table-component
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "20px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "20px",
      },
    },
  };

  // set comlumns
  const columns = [
    {
      name: "Datum",
      selector: (row) => {
        return `${row.date.split("-")[2]}.${row.date.split("-")[1]}.${
          row.date.split("-")[0]
        }`;
      },
      width: "150px",
    },
    {
      name: "Název",
      selector: (row) => row.name,
      width: "350px",
    },
    {
      name: "Kategorie",
      selector: (row) => row.category,
      // width: "150px",
    },
    {
      name: "Město",
      selector: (row) => row.city,
    },
    {
      name: "Areál",
      selector: (row) => row.areal,
      width: "350px",
    },
    {
      name: "Kapacita",
      selector: (row) => {
        if (row.signed == null && row.capacity == null) {
          return "";
        } else if (row.signed == null) {
          return `/${row.capacity}`;
        }
        return `${row.signed}/${row.capacity}`;
      },
      // width: "130px",
    },
    {
      name: "Úroveň",
      selector: (row) => row.level,
      width: "150px",
    },
  ];

  return (
    <div className="Data--main">
      <div className="Data--content-buttons">
        <button
          className="Data--table-button"
          onClick={() => setShowData(true)}
        >
          Tabulka
        </button>
        <button
          className="Data--calendar-button"
          onClick={() => setShowData(false)}
        >
          Kalendář
        </button>
      </div>
      <div className="Data--tournament-table">
        <DataTable
          columns={columns}
          data={tournamentsData}
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandableIcon={{
            collapsed: <CustomIcon />, // Use your custom collapsed icon
            expanded: <CustomIcon />, // Use your custom expanded icon
          }}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
export default Data;
