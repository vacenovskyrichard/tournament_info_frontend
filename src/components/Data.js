import "../styles/Data.css";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ReactComponent as CustomIcon } from "../icons/info-circle.svg";
import { ReactComponent as CustomIconMobile } from "../icons/info-circle-mobile.svg";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ExpandedComponent from "./ExpandedRow";

function Data({
  tournamentsData,
  setShowData,
  isTabletOrMobile,
  token,
  apiUrl,
  loadingMainTable,
}) {
  // initialize variables and states
  const { register, control, handleSubmit, formState } = useForm();
  const [loading, setLoading] = useState(true); // used for loading of teams
  const [statusChanged, setStatusChanged] = useState(false); // used to trigger rerender after sign in/out from tournament
  const { errors } = formState;

  const [signedTeams, setSignedTeams] = useState({});

  useEffect(() => {
    const userId = token ? jwt_decode(token.access_token).sub : "";
    const at = token ? token.access_token : "";
    fetch(`${apiUrl}/get_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          return "Unauthorized";
        }
      })
      .then((response) => {
        setSignedTeams(response);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          alert("Něco se nepovedlo");
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [statusChanged]);

  // creates whitespaces in jsx
  function whitespaces(count) {
    return "\u00A0".repeat(count); // '\u00A0' represents the non-breaking space character
  }

  // Function to compare dates in "YYYY-MM-DD" format
  function compareDates(dateA, dateB) {
    return dateA.localeCompare(dateB);
  }

  // Sort data by date
  tournamentsData.sort((a, b) => compareDates(a.date, b.date));

  // custom styles of data table
  const tableFontSize = isTabletOrMobile ? "30px" : "23px";
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "rgb(37, 31, 31);",
        color: "white",
        fontSize: tableFontSize,
        fontFamily: "Bebas Neue",
      },
    },
    cells: {
      style: {
        fontSize: tableFontSize,
        fontFamily: "Bebas Neue",
      },
    },
    background: "rgb(216, 216, 216);",
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
      width: "140px",
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

      // conditional style of capacity based on number of teams
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
          expandableRowsComponent={(row) => (
            <ExpandedComponent
              data={row}
              loading={loading}
              signedTeams={signedTeams}
              token={token}
              setStatusChanged={setStatusChanged}
              statusChanged={statusChanged}
              apiUrl={apiUrl}
              whitespaces={whitespaces}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          )}
          expandableIcon={{
            collapsed: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
            expanded: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
          }}
          customStyles={customStyles}
          noDataComponent={
            loadingMainTable ? (
              <h3>Data se načítají...</h3>
            ) : (
              <h3>Žádná data nejsou k dispozici</h3>
            )
          }
          className={
            tournamentsData.length === 0 ? "custom-no-data-background" : ""
          }
        />
      </div>
    </div>
  );
}
export default Data;
