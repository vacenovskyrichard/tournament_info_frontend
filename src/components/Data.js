import "../styles/Data.css";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ReactComponent as CustomIcon } from "../icons/info-circle.svg";
import { ReactComponent as CustomIconMobile } from "../icons/info-circle-mobile.svg";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Data({
  tournamentsData,
  setShowData,
  isTabletOrMobile,
  token,
  apiUrl,
}) {
  // initialize variables and states
  const { register, control, handleSubmit, formState } = useForm();
  const [loading, setLoading] = useState(true); // used for loading of teams
  const [statusChanged, setStatusChanged] = useState(false); // used to trigger rerender after sign in/out from tournament
  const { errors } = formState;

  const [signedTeams, setSignedTeams] = useState({});

  useEffect(() => {
    const userId = jwt_decode(token.access_token).sub;
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
        return resp.json();
      })
      .then((response) => {
        console.log("response");
        console.log(response);
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

  // Expanded component for every tournament in table
  const ExpandedComponent = ({ data }) => {
    const [timeOfLastUpdate, setTimeOfLastUpdate] = useState();
    const updateTargetDate = new Date(data.last_update);

    const isSigned = loading ? "" : signedTeams[data.id]["isSigned"];
    const teams = loading ? "" : signedTeams[data.id]["teams"];

    const [showTemmateForm, setShowTemmateForm] = useState(false);
    // const [signed, setSigned] = useState(false);

    // calculate time from last update
    useEffect(() => {
      // Get the current date and time
      const currentDate = new Date();

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
      const minutes_str = uminutes === 1 ? `1 minutou` : `${uminutes} minutami`;

      setTimeOfLastUpdate(
        `Naposledy aktualizováno před: ${days_str}${hours_str}${minutes_str}`
      );
    }, []);

    // sign to tournament function
    const signToTournament = (credentials) => {
      const user_id = jwt_decode(token.access_token).sub;
      axios({
        method: "POST",
        url: `${apiUrl}/create_team`,
        data: {
          player_id: user_id,
          tournament_id: credentials.tournamentId,
          teammate_name: credentials.name,
          teammate_surname: credentials.surname,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Dvojice byla uspěšně přihlášena");
            setStatusChanged(!statusChanged);
          }
        })
        .catch((error) => {
          if (error.response) {
            alert("Něco se nepovedlo");
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      if (data.signed == null) {
        data.signed = 0;
      }
      fetch(`${apiUrl}/update/${data.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signed: data.signed + 1 }),
      }).then((resp) => resp.json());
    };

    // sign out from tournament function
    const signOutTorunament = (tournament_id) => {
      const user_id = jwt_decode(token.access_token).sub;

      axios({
        method: "DELETE",
        url: `${apiUrl}/delete_team`,
        data: {
          player_id: user_id,
          tournament_id: tournament_id,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert("Dvojice byla uspěšně odhlášena");
            setStatusChanged(!statusChanged);
          }
        })
        .catch((error) => {
          if (error.response) {
            alert("Něco se nepovedlo");
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

      fetch(`${apiUrl}/update/${tournament_id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signed: data.signed - 1 }),
      }).then((resp) => resp.json());
    };

    // return component for expandable row
    return (
      <div className="Data--expanded-data-box">
        <div className="Data--expanded-left">
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
          {data.registration_enabled &&
            localStorage.getItem("isPlayer") === "true" && (
              <>
                {showTemmateForm && (
                  <form onSubmit={handleSubmit(signToTournament)}>
                    <div className="">
                      <label>Jméno spoluhráče</label>
                      <input
                        type="text"
                        name="name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Zadejte jméno spoluhráče",
                          },
                        })}
                      />
                      {errors.name && <p>{errors.name?.message}</p>}
                    </div>
                    <div className="">
                      <label>Příjmení spoluhráče</label>
                      <input
                        type="text"
                        name="name"
                        {...register("surname", {
                          required: {
                            value: true,
                            message: "Zadejte jméno spoluhráče",
                          },
                        })}
                      />
                      {errors.name && <p>{errors.name?.message}</p>}
                    </div>
                    <input
                      type="hidden"
                      value={data.id}
                      name="tournamentId"
                      {...register("tournamentId")}
                    />

                    <button
                      className="Data--login-to-tournament-btn"
                      type="submit"
                    >
                      Přihlásit
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        setShowTemmateForm(false);
                      }}
                    >
                      Skrýt
                    </button>
                  </form>
                )}

                {!showTemmateForm && !isSigned && !loading && (
                  <div
                    className="Data--login-to-tournament-btn"
                    onClick={() => {
                      setShowTemmateForm(true);
                    }}
                  >
                    Přihlásit
                  </div>
                )}
                {!showTemmateForm && isSigned && !loading && (
                  <div
                    className="Data--logout-from-tournament-btn"
                    onClick={() => {
                      signOutTorunament(data.id);
                    }}
                  >
                    Odhlásit
                  </div>
                )}
              </>
            )}
          <p style={{ fontStyle: "italic", color: "rgb(80, 80, 80)" }}>
            {timeOfLastUpdate}
          </p>
        </div>
        {data.registration_enabled && (
          <div className="Data--expanded-right">
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <div>
                <h3>Přihlášené týmy</h3>
                {teams &&
                  teams.map((team, index) => (
                    <p key={index}>
                      {index + 1}. {team.player1_name} {team.player1_surname} /{" "}
                      {team.player2_name} {team.player2_surname}
                    </p>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
          expandableRowsComponent={ExpandedComponent}
          expandableIcon={{
            collapsed: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
            expanded: isTabletOrMobile ? <CustomIconMobile /> : <CustomIcon />,
          }}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
export default Data;
