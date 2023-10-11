import "../styles/Data.css";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DataTable from "react-data-table-component";

function Data({ token, tournamentData }) {
  const delete_tournament = (id) => {
    console.log(id);
    fetch(`http://127.0.0.1:5000/delete/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token.access_token,
      },
    })
      .then((resp) => resp.json())
      .then(() => window.location.reload(false))
      .then(() => alert("Turnaj byl úspěšně smazán"));
  };

  const ExpandedComponent = ({ data }) => {
    const [timeRemainingString, setTimeRemainingString] = useState();
    const targetDateString = `${data.date} ${data.start}`; // Your target date and time
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

        let dayWord = days == 1 ? "den" : days < 5 ? "dny" : "dní";
        let hourWord = hours == 1 ? "hodina" : hours < 5 ? "hodiny" : "hodin";
        let minutesWord =
          hours == 1 ? "minuta" : hours < 5 ? "minuty" : "minut";
        let secondsWord =
          hours == 1 ? "vteřina" : hours < 5 ? "vteřiny" : "vteřin";
        let remainsWord = days > 1 && days < 5 ? "zbývají" : "zbývá";

        setTimeRemainingString(
          `Do turnaje ${remainsWord}:  ${days} ${dayWord}, ${hours} ${hourWord}, ${minutes} ${minutesWord}, ${seconds} ${secondsWord}.`
        );
      }, 1000);

      return () => clearInterval(secTimer);
    }, []);

    return (
      <div className="Data--expanded-data-box">
        <div className="Data--expanded-data">
          <h3>Detail</h3>
          <p>{`Cena: ${data.price},-`}</p>
          <p>Začátek: {data.start}</p>
          <p>Organizátor: {data.organizer}</p>
          <div>
            <p>
              Odkaz: <a href={data.link}>{data.link}</a>
            </p>
          </div>
        </div>
        <div className="Data--time-remaining">
          <p>{timeRemainingString}</p>
        </div>
      </div>
    );
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "18px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "17px",
      },
    },
  };

  const columns = [
    {
      name: "Datum",
      selector: (row) => {
        return `${row.date.split("-")[2]}.${row.date.split("-")[1]}.${
          row.date.split("-")[0]
        }`;
      },
    },
    {
      name: "Název",
      selector: (row) => row.name,
    },
    {
      name: "Kategorie",
      selector: (row) => row.category,
    },
    {
      name: "Město",
      selector: (row) => row.city,
    },
    {
      name: "Areál",
      selector: (row) => row.areal,
    },
    {
      name: "Kapacita",
      selector: (row) => {
        if (row.signed == null || row.capacity == null) {
          return "";
        }
        return `${row.signed}/${row.capacity}`;
      },
    },
    {
      name: "Úroveň",
      selector: (row) => row.level,
    },
  ];

  return (
    <div className="Data--tournament-table">
      <DataTable
        columns={columns}
        data={tournamentData}
        pagination
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
      />
    </div>
  );

  // return (
  //   <div className="tournament-data">
  //     <h1>Tabulka</h1>
  //     <div className="tournament-table">
  //       <div className="tournament-labels">
  //         <div> Datum </div>const data = [
  //   {
  //     id: 1,
  //     title: "Beetlejuice",
  //     year: "1988",
  //   },
  //   {
  //     id: 2,
  //     title: "Ghostbusters",
  //     year: "1984",
  //   },
  // ];

  //         <div> Město </div>
  //         <div> Areál </div>
  //         <div> Jméno </div>
  //         <div> Kapacita </div>
  //         <div> Přihlášeno </div>
  //         <div> Cena </div>
  //         <div> Začátek </div>
  //         <div> Organizátor </div>
  //         <div> Kategorie </div>
  //         <div> Úroveň </div>
  //         <div> Odkaz </div>
  //       </div>
  //       {tournamentData.map((tournament, key) => {
  //         return (
  //           <div key={key} className="tournament">
  //             <div>
  //               {" "}
  //               {`${tournament["date"].split("-")[2]}.${
  //                 tournament["date"].split("-")[1]
  //               }.${tournament["date"].split("-")[0]}`}{" "}
  //             </div>
  //             <div> {tournament["city"]} </div>
  //             <div> {tournament["areal"]} </div>
  //             <div> {tournament["name"]} </div>
  //             <div> {tournament["capacity"]} </div>
  //             {tournament["signed"] ? (
  //               <div> {tournament["signed"]} </div>
  //             ) : (
  //               <div> ? </div>
  //             )}
  //             <div> {tournament["price"]} </div>
  //             <div> {tournament["start"]} </div>
  //             <div> {tournament["organizer"]} </div>
  //             <div> {tournament["category"]} </div>
  //             <div> {tournament["level"]} </div>
  //             <div>
  //               <a href={tournament["link"]}>link</a>
  //             </div>
  //             {token &&
  //               tournament["user_id"] ==
  //                 jwt_decode(token.access_token).sub && (
  //                 <button
  //                   className="delete-button"
  //                   onClick={() => delete_tournament(tournament["id"])}
  //                 >
  //                   delete
  //                 </button>
  //               )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //     {token && (
  //       <a className="add-button" href="/add_tournament">
  //         <button>Přidat turnaj</button>
  //       </a>
  //     )}
  //   </div>
  // );
}
export default Data;
