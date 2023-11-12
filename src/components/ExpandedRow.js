import "../styles/Data.css";
import "../styles/ExpandedRow.css";
import "../styles/Common.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useForm } from "react-hook-form";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import { screenSize } from "../state/atoms/ScreenSize";

// Expanded component for every tournament in table
export default function ExpandedComponent({
  loading,
  signedTeams,
  setStatusChanged,
  statusChanged,
  whitespaces,
  data,
  showEditerButtons,
  editTorunament,
  deleteTorunament,
}) {
  data = data.data;
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const { token } = useToken();
  const [timeOfLastUpdate, setTimeOfLastUpdate] = useState(); //stores string containing time from last update
  const lastUpdateDate = new Date(data.last_update);
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const splitArray = (arr, index) => {
    const firstPart = arr.slice(0, index);
    const secondPart = arr.slice(index);

    return [firstPart, secondPart];
  };

  const isSigned =
    loading || signedTeams === "Unauthorized"
      ? ""
      : signedTeams[data.id]["isSigned"];

  const teams =
    loading || signedTeams === "Unauthorized"
      ? []
      : signedTeams[data.id]["teams"];

  // sort teams by time they signed
  teams.sort((a, b) => new Date(a.date_signed) - new Date(b.date_signed));

  const [mainTeams, subTeams] =
    teams.length > data.capacity
      ? splitArray(teams, data.capacity)
      : [teams, []];

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
    const signDate = new Date();
    axios({
      method: "POST",
      url: `${apiUrl}/create_team`,
      data: {
        player_id: jwt_decode(token.accessToken).sub,
        tournament_id: data.id,
        teammate_name: credentials.name,
        teammate_surname: credentials.surname,
        date_signed: signDate,
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
        player_id: jwt_decode(token.accessToken).sub,
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
    <div
      className={
        screenType === "mobile" ? "ExpandedRow--mobile" : "ExpandedRow"
      }
    >
      <div
        className={
          screenType === "mobile"
            ? "ExpandedRow-main--mobile"
            : "ExpandedRow-main"
        }
      >
        <div
          className={
            screenType === "mobile"
              ? "ExpandedRow--left-mobile"
              : "ExpandedRow--left"
          }
        >
          <h3
            className={
              screenType === "mobile"
                ? "ExpandedRow--title-mobile"
                : "ExpandedRow--title"
            }
          >
            {data.name}
          </h3>
          <div className="ExpandedRow--details">
            <div className="ExpandedRow--details-labels">
              <p>Kategorie:</p>
              <p>Úroveň:</p>
              <p>Kapacita:</p>
              <p>Areál:</p>
              <p>Cena:</p>
              <p>Start:</p>
              <p>Pořádá:</p>
              <p>Odkaz:</p>
            </div>
            <div className="ExpandedRow--details-data">
              <p>{data.category}</p>
              <p>{data.level}</p>

              <p>
                {data.signed}/{data.capacity}
              </p>
              <p>
                {data.areal} ({data.city})
              </p>
              <p>{data.price},- (na osobu)</p>
              <p>{data.start}</p>
              <p>{data.organizer}</p>
              <a href={data.link}>link</a>
            </div>
          </div>
          {data.registration_enabled && token.role === "player" && token && (
            <>
              <h3
                className={
                  screenType === "mobile"
                    ? "ExpandedRow--title-mobile"
                    : "ExpandedRow--title"
                }
              >
                Přihlášení
              </h3>
              {!isSigned && (
                <form
                  className={
                    screenType === "mobile"
                      ? "ExpandedRow--sign-form-mobile"
                      : "ExpandedRow--sign-form"
                  }
                  onSubmit={handleSubmit(signToTournament)}
                >
                  <div className="ExpandedRow--sign-form-main">
                    <div className="ExpandedRow--details-labels">
                      <p>Jméno spoluhráče:</p>
                      <p>Příjmení spoluhráče:</p>
                    </div>

                    <div className="ExpandedRow--details-data">
                      <p
                        className={
                          screenType === "mobile"
                            ? "ExpandedRow-form-box-mobile"
                            : "ExpandedRow-form-box"
                        }
                      >
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
                      </p>
                      <p
                        className={
                          screenType === "mobile"
                            ? "ExpandedRow-form-box-mobile"
                            : "ExpandedRow-form-box"
                        }
                      >
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
                      </p>
                    </div>
                  </div>

                  <button
                    className={
                      screenType === "mobile"
                        ? "ExpandedRow--login-to-tournament-btn-mobile"
                        : "ExpandedRow--login-to-tournament-btn"
                    }
                    type="submit"
                  >
                    Přihlásit
                  </button>
                </form>
              )}

              {isSigned && !loading && (
                <div
                  className={
                    screenType === "mobile"
                      ? "ExpandedRow--logout-from-tournament-btn-mobile"
                      : "ExpandedRow--logout-from-tournament-btn"
                  }
                  onClick={signOutTorunament}
                >
                  Odhlásit
                </div>
              )}
            </>
          )}

          {!data.registration_enabled && (
            <p style={{ fontStyle: "italic", color: "rgb(80, 80, 80)" }}>
              {timeOfLastUpdate}
            </p>
          )}
        </div>

        {data.registration_enabled && (
          <div
            className={
              screenType === "mobile"
                ? "ExpandedRow--right-mobile"
                : "ExpandedRow--right"
            }
          >
            <h3
              className={
                screenType === "mobile"
                  ? "ExpandedRow--title-mobile"
                  : "ExpandedRow--title"
              }
            >
              Přihlášené týmy
            </h3>
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <div>
                {mainTeams &&
                  mainTeams.map((team, index) => (
                    <p key={index}>
                      {index + 1}. {team.player1_name} {team.player1_surname} /{" "}
                      {team.player2_name} {team.player2_surname}
                    </p>
                  ))}

                <h3
                  className={
                    screenType === "mobile"
                      ? "ExpandedRow--title-mobile"
                      : "ExpandedRow--title"
                  }
                >
                  Náhradníci
                </h3>
                {subTeams.length > 0 &&
                  subTeams.map((team, index) => (
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

      {showEditerButtons && (
        <div
          className={
            screenType === "mobile"
              ? "ExpandedRow--editer-buttons-mobile"
              : "ExpandedRow--editer-buttons"
          }
        >
          <button className="ExpandedRow--edit-button" onClick={editTorunament}>
            Upravit turnaj
          </button>
          <button
            className="ExpandedRow--delete-button"
            onClick={deleteTorunament}
          >
            Smazat turnaj
          </button>
        </div>
      )}
    </div>
  );
}
