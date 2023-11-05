import "../styles/Data.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Expanded component for every tournament in table
export default function ExpandedComponent({
  loading,
  signedTeams,
  token,
  setStatusChanged,
  statusChanged,
  apiUrl,
  whitespaces,
  register,
  errors,
  data,
  handleSubmit,
}) {
  data = data.data;

  const [timeOfLastUpdate, setTimeOfLastUpdate] = useState();
  const updateTargetDate = new Date(data.last_update);

  const isSigned =
    loading || signedTeams === "Unauthorized"
      ? ""
      : signedTeams[data.id]["isSigned"];

  const teams =
    loading || signedTeams === "Unauthorized"
      ? []
      : signedTeams[data.id]["teams"];
  console.log("teams");
  console.log(loading);
  console.log(signedTeams);
  console.log(teams);
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
      uhours === 0 ? "" : uhours === 1 ? `1 hodinou, ` : `${uhours} hodinami, `;
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
          localStorage.getItem("isPlayer") === "true" &&
          token && (
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
}
