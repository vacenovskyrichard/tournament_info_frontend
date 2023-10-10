import "../styles/Data.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Data(props) {
  const delete_tournament = (id) => {
    console.log(id);
    fetch(`http://127.0.0.1:5000/delete/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token.access_token,
      },
    })
      .then((resp) => resp.json())
      .then(() => window.location.reload(false))
      .then(() => alert("Turnaj byl úspěšně smazán"));
  };

  return (
    <div className="tournament-data">
      <h1>Tabulka</h1>
      <div className="tournament-table">
        <div className="tournament-labels">
          <div> Datum </div>
          <div> Město </div>
          <div> Areál </div>
          <div> Jméno </div>
          <div> Kapacita </div>
          <div> Přihlášeno </div>
          <div> Cena </div>
          <div> Začátek </div>
          <div> Organizátor </div>
          <div> Kategorie </div>
          <div> Úroveň </div>
          <div> Odkaz </div>
        </div>
        {props.data.map((tournament, key) => {
          return (
            <div key={key} className="tournament">
              <div>
                {" "}
                {`${tournament["date"].split("-")[2]}.${
                  tournament["date"].split("-")[1]
                }.${tournament["date"].split("-")[0]}`}{" "}
              </div>
              <div> {tournament["city"]} </div>
              <div> {tournament["areal"]} </div>
              <div> {tournament["name"]} </div>
              <div> {tournament["capacity"]} </div>
              {tournament["signed"] ? (
                <div> {tournament["signed"]} </div>
              ) : (
                <div> ? </div>
              )}
              <div> {tournament["price"]} </div>
              <div> {tournament["start"]} </div>
              <div> {tournament["organizer"]} </div>
              <div> {tournament["category"]} </div>
              <div> {tournament["level"]} </div>
              <div>
                <a href={tournament["link"]}>link</a>
              </div>
              {props.token && tournament["user_id"] == props.token.user_id && (
                <button
                  className="delete-button"
                  onClick={() => delete_tournament(tournament["id"])}
                >
                  delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      {props.token && (
        <a className="add-button" href="/add_tournament">
          <button>Přidat turnaj</button>
        </a>
      )}
    </div>
  );
}
export default Data;
