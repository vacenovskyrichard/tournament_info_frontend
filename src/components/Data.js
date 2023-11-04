import "../styles/Data.css";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ReactComponent as CustomIcon } from "../icons/info-circle.svg";
import { ReactComponent as CustomIconMobile } from "../icons/info-circle-mobile.svg";

function Data({ tournamentsData, setShowData, showData, isTabletOrMobile }) {
  // Function to compare dates in "YYYY-MM-DD" format
  function compareDates(dateA, dateB) {
    return dateA.localeCompare(dateB);
  }
  // Sort data by date
  tournamentsData.sort((a, b) => compareDates(a.date, b.date));

  // Expanded component for every tournament in table
  const ExpandedComponent = ({ data }) => {
    const [timeRemainingString, setTimeRemainingString] = useState();
    const [timeOfLastUpdate, setTimeOfLastUpdate] = useState();
    const targetDateString = `${data.date} ${data.start}`;
    const targetDate = new Date(targetDateString);
    const updateTargetDate = new Date(data.last_update);
    console.log("data.registration_enabled");
    console.log(data.registration_enabled);

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
          `Do turnaje ${remainsWord}:  ${days} ${dayWord}, ${hours} ${hourWord}, ${minutes} ${minutesWord}, ${seconds} ${secondsWord}`
        );
        console.log("DATA");
        console.log(updateTargetDate);
        console.log(currentDate);

        // Calculate the time difference in milliseconds
        const updateTimeDifference = currentDate - updateTargetDate;

        // Calculate the remaining days, hours, minutes, and seconds
        const udays = Math.floor(updateTimeDifference / (1000 * 60 * 60 * 24));
        const uhours = Math.floor(
          (updateTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const uminutes = Math.floor(
          (updateTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const days_str =
          udays === 0 ? "" : udays === 1 ? "1 dnem, " : `${udays} dny, `;
        const hours_str =
          uhours === 0
            ? ""
            : uhours === 1
            ? `1 hodinou, `
            : `${uhours} hodinami, `;
        const minutes_str =
          uminutes === 1 ? `1 minutou` : `${uminutes} minutami`;

        setTimeOfLastUpdate(
          `Naposledy aktualizováno před: ${days_str}${hours_str}${minutes_str}`
        );
      }, 1000);

      return () => clearInterval(secTimer); // eslint-disable-next-line
    }, []);

    function whitespaces(count) {
      return "\u00A0".repeat(count); // '\u00A0' represents the non-breaking space character
    }

    return (
      <div className="Data--expanded-data-box">
        <div className="Data--expanded-data">
          <h3>Detail</h3>
          <p>
            {whitespaces(5)}Název:{whitespaces(10)}
            {data.name}
          </p>
          <p>
            {whitespaces(5)}
            Cena:{whitespaces(12)}
            {data.price},- (na osobu)
          </p>
          <p>
            {whitespaces(5)}Start:{whitespaces(9)} {data.start}
          </p>
          <p>
            {whitespaces(5)}Pořádá: {whitespaces(6)}
            {data.organizer}
          </p>
          <div>
            <p>
              {whitespaces(5)}
              Odkaz:{whitespaces(10)}
              <a href={data.link}>{data.link}</a>
            </p>
          </div>
          <p style={{ fontStyle: "italic", color: "rgb(80, 80, 80)" }}>
            {timeOfLastUpdate}
          </p>
        </div>
        <div className="Data--time-remaining">
          <p>{timeRemainingString}</p>
        </div>
      </div>
    );
  };

  // style react-data-table-component
  const customStyles = isTabletOrMobile
    ? {
        headRow: {
          style: {
            backgroundColor: "rgb(37, 31, 31);",
            color: "white",
            fontSize: "30px",
            fontFamily: "Bebas Neue",
          },
        },
        cells: {
          style: {
            fontSize: "30px",
            fontFamily: "Bebas Neue",
          },
        },
        background: "rgb(216, 216, 216);",
      }
    : {
        headRow: {
          style: {
            backgroundColor: "rgb(37, 31, 31);",
            color: "white",
            fontSize: "23px",
            fontFamily: "Bebas Neue",
          },
        },
        cells: {
          style: {
            fontSize: "23px",
            fontFamily: "Bebas Neue",
          },
        },
        background: "rgb(216, 216, 216);",
      };

  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.signed >= row.capacity,
  //     style: {
  //       backgroundColor: "rgb(216, 216, 216)",
  //       color: "#AAAAAA",
  //       "&:hover": {
  //         cursor: "pointer",
  //       },
  //     },
  //   },
  // {
  //   when: (row) =>
  //     row.signed < row.capacity &&
  //     row.signed >= row.capacity - row.capacity / 8,
  //   style: {
  //     backgroundColor: "orange",
  //     color: "white",
  //     "&:hover": {
  //       cursor: "pointer",
  //     },
  //   },
  // },
  // {
  //   when: (row) => row.signed < row.capacity - row.capacity / 8,
  //   style: {
  //     backgroundColor: "#00FF00",
  //     color: "white",
  //     "&:hover": {
  //       cursor: "pointer",
  //     },
  //   },
  // },
  // ];

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

      conditionalCellStyles: [
        {
          when: (row) => row.signed >= row.capacity,
          style: {
            color: "rgb(200, 31, 31)",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) =>
            row.signed < row.capacity &&
            row.signed >= row.capacity - row.capacity / 8,
          style: {
            color: "rgb(235, 120, 31)",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.signed < row.capacity - row.capacity / 8,
          style: {
            // color: "green",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],

      width: "130px",
    },
    {
      name: "Úroveň",
      selector: (row) => row.level,
      width: "150px",
    },
  ];

  return (
    <div className="Data--main">
      <div
        className={
          isTabletOrMobile
            ? "Data--content-buttons-mobile"
            : "Data--content-buttons"
        }
      >
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
      <div
        className={
          isTabletOrMobile
            ? "Data--tournament-table-mobile"
            : "Data--tournament-table"
        }
      >
        <DataTable
          columns={columns}
          data={tournamentsData}
          pagination
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandableIcon={{
            collapsed: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
            expanded: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
          }}
          customStyles={customStyles}
          // conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </div>
  );
}
export default Data;
