import "../styles/Data.css";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import ExpandedComponent from "./ExpandedRow";
import { sortedTorunamentsState } from "../state/selectors/SortedTournaments";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import { screenSize } from "../state/atoms/ScreenSize";
import { ReactComponent as ExpandedIconMobile } from "../icons/expanded-mobile.svg";
import { ReactComponent as CollapsedIconMobile } from "../icons/collapsed-mobile.svg";
import { ReactComponent as ExpandedIcon } from "../icons/expanded.svg";
import { ReactComponent as CollapsedIcon } from "../icons/collapsed.svg";

function Data({ loadingMainTable }) {
  // initialize variables and states
  const { token } = useToken();
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const tournaments = useRecoilValue(sortedTorunamentsState);
  const [loading, setLoading] = useState(true); // used for loading of teams
  const [statusChanged, setStatusChanged] = useState(false); // used to trigger rerender after sign in/out from tournament

  const [signedTeams, setSignedTeams] = useState({});

  // load all signed teams from all tournaments from database
  useEffect(() => {
    const userId = token && token.id;
    fetch(`${apiUrl}/get_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  // set czech labels to table
  const paginationOptions = {
    rowsPerPageText: "Řádků na stranu ",
    rangeSeparatorText: "z",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Zobrazit vše",
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
      width: screenType === "mobile" ? "220px" : "12%",
    },
    {
      name: "Název",
      selector: (row) => row.name,
      width: screenType === "mobile" ? "650px" : "55%",
    },
    {
      name: "Kategorie",
      selector: (row) => row.category,
      width: "15%",
    },
    {
      name: "Kapacita",
      selector: (row) => {
        if (row.signed == null && row.capacity == null) {
          return "";
        } else if (row.signed == null) {
          return `/${row.capacity}`;
        } else if (row.capacity < 0) {
          return `${row.signed}/?`;
        }
        return `${row.signed}/${row.capacity}`;
      },

      // conditional style of capacity based on number of teams
      conditionalCellStyles: [
        {
          when: (row) => row.capacity > 0 && row.signed >= row.capacity,
          style: {
            color: "rgb(200, 31, 31)",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) =>
            row.capacity > 0 &&
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
          when: (row) =>
            row.capacity > 0 && row.signed < row.capacity - row.capacity / 8,
          style: {
            // color: "green",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
      ],

      width: "13%",
    },
  ];

  const [expandedRows, setExpandedRows] = useState({});

  const handleRowClick = (row) => {
    const newRowState = { ...expandedRows };
    newRowState[row.id] = !newRowState[row.id];
    setExpandedRows(newRowState);
  };

  const mobileColumns = columns.slice(0, 2);

  const conditionalRowStyles = [
    {
      when: (row) => expandedRows[row.id],
      style: {
        backgroundColor: "rgb(175, 175, 175)",
        color: "rgb(245, 245, 245)",
      },
    },
  ];

  // =====================================================================
  console.log("loadingMainTable");
  console.log(loadingMainTable);
  console.log("DATA:");
  console.log(tournaments);

  // =====================================================================

  return (
    <div className="Data">
      <div
        className={
          screenType === "mobile"
            ? "Data--tournament-table-mobile"
            : "Data--tournament-table"
        }
      >
        <DataTable
          columns={screenType === "mobile" ? mobileColumns : columns}
          data={tournaments}
          pagination
          paginationPerPage={screenType === "mobile" ? 8 : 10}
          paginationRowsPerPageOptions={[8, 10, 20]}
          paginationComponentOptions={paginationOptions}
          expandableRows
          expandableRowsComponent={(row) => (
            <ExpandedComponent
              data={row}
              loading={loading}
              signedTeams={signedTeams}
              setStatusChanged={setStatusChanged}
              statusChanged={statusChanged}
            />
          )}
          noDataComponent={
            loadingMainTable ? (
              <h3>Data se načítají...</h3>
            ) : (
              <h3>Žádná data nejsou k dispozici</h3>
            )
          }
          expandableIcon={{
            collapsed:
              screenType === "mobile" ? (
                <CollapsedIconMobile />
              ) : (
                <CollapsedIcon />
              ),
            expanded:
              screenType === "mobile" ? (
                <ExpandedIconMobile />
              ) : (
                <ExpandedIcon />
              ),
          }}
          className={
            tournaments.length === 0 ? "custom-no-data-background" : ""
          }
          expandableRowExpanded={(row) => expandedRows[row.id]}
          onRowClicked={handleRowClick}
          conditionalRowStyles={screenType === "mobile" && conditionalRowStyles}
        />
      </div>
    </div>
  );
}
export default Data;
