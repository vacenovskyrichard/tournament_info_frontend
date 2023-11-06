import "../styles/Data.css";
import "../styles/ExpandedRow.css";
import "../styles/Common.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useForm } from "react-hook-form";

// Expanded component for every tournament in table
export default function ExpandedComponent({
  loading,
  signedTeams,
  token,
  setStatusChanged,
  statusChanged,
  apiUrl,
  whitespaces,
  data,
}) {
  data = data.data;

  const [timeOfLastUpdate, setTimeOfLastUpdate] = useState(); //stores string containing time from last update
  const lastUpdateDate = new Date(data.last_update);
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const isSigned =
    loading || signedTeams === "Unauthorized"
      ? ""
      : signedTeams[data.id]["isSigned"];

  const teams =
    loading || signedTeams === "Unauthorized"
      ? []
      : signedTeams[data.id]["teams"];

  // calculate time from last update every
  useEffect(() => {
    const currentDate = new Date(); // Get the current date and time
    const updateTimeDifference = currentDate - lastUpdateDate; // Calculate the time difference in milliseconds

    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(updateTimeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (updateTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (updateTimeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const daysStr = days === 0 ? "" : days === 1 ? "1 dnem, " : `${days} dny, `;
    const hoursStr =
      hours === 0 ? "" : hours === 1 ? `1 hodinou, ` : `${hours} hodinami, `;
    const minutesStr = minutes === 1 ? `1 minutou` : `${minutes} minutami`;

    setTimeOfLastUpdate(
      `Naposledy aktualizováno před: ${daysStr}${hoursStr}${minutesStr}`
    );
  }, []);

  // sign to tournament function
  const signToTournament = (credentials) => {
    axios({
      method: "POST",
      url: `${apiUrl}/create_team`,
      data: {
        player_id: jwt_decode(token.access_token).sub,
        tournament_id: data.id,
        teammate_name: credentials.name,
        teammate_surname: credentials.surname,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Dvojice byla uspěšně přihlášena");
          setStatusChanged(!statusChanged);
          fetch(`${apiUrl}/update/${data.id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ signed: data.signed + 1 }),
          })
            .then((resp) => {
              if (resp.status === 200) {
                console.log("Signed increased succesfully");
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  // sign out from tournament function
  const signOutTorunament = () => {
    axios({
      method: "DELETE",
      url: `${apiUrl}/delete_team`,
      data: {
        player_id: jwt_decode(token.access_token).sub,
        tournament_id: data.id,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Dvojice byla uspěšně odhlášena");
          setStatusChanged(!statusChanged);
          fetch(`${apiUrl}/update/${data.id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ signed: data.signed - 1 }),
          })
            .then((resp) => {
              if (resp.status === 200) {
                console.log("Signed decreased succesfully");
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
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
          localStorage.getItem("isPlayer") === "true" &&
          token && (
            <>
              {!isSigned && (
                <form
                  className="ExpandedRow--sign-form"
                  onSubmit={handleSubmit(signToTournament)}
                >
                  <h3>Přihlášení</h3>
                  <div className="ExpandedRow-form-box">
                    <label>
                      {whitespaces(5)}Jméno spoluhráče:{whitespaces(7)}
                    </label>
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
                    {errors.name && (
                      <p className="error-message">
                        {whitespaces(10)}
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="ExpandedRow-form-box">
                    <label>
                      {whitespaces(5)}Příjmení spoluhráče:{whitespaces(2)}
                    </label>
                    <input
                      type="text"
                      name="surname"
                      {...register("surname", {
                        required: {
                          value: true,
                          message: "Zadejte příjmení spoluhráče",
                        },
                      })}
                    />
                    {errors.surname && (
                      <p className="error-message">
                        {" "}
                        {whitespaces(10)}
                        {errors.surname?.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="Data--login-to-tournament-btn"
                    type="submit"
                  >
                    Přihlásit
                  </button>
                </form>
              )}

              {/* {!showTemmateForm && !isSigned && !loading && (
                <div
                  className="Data--login-to-tournament-btn"
                  onClick={() => {
                    setShowTemmateForm(true);
                  }}
                >
                  Přihlásit
                </div>
              )} */}
              {isSigned && !loading && (
                <div
                  className="Data--logout-from-tournament-btn"
                  onClick={signOutTorunament}
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
}
