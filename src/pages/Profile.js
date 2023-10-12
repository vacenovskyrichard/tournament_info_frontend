import "../styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DataTable from "react-data-table-component";

function Profile({
  token,
  removeToken,
  setToken,
  tournamentsData,
  setTournamentsData,
}) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    role: "",
  });

  const userId = jwt_decode(token.access_token).sub;

  const userTournaments = tournamentsData.filter(
    (tournament) => tournament.user_id === userId
  );

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
      name: "Areál",
      selector: (row) => row.areal,
    },
    {
      name: "",
      cell: (row) => (
        <div
          style={{
            color: "red",
            textAlign: "right",
            width: "100%",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={() => delete_tournament(row.id)}
        >
          Smazat
        </div>
      ),
    },
  ];

  useEffect(() => {
    const user_id = jwt_decode(token.access_token).sub;
    fetch("http://127.0.0.1:5000/user_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw new Error("Failed to send data or fetch response");
        }
      })
      .then((resp) => {
        console.log(resp);
        setUserData(resp);
      });
  }, []);

  const create_random_tournament = () => {
    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const data = {
      areal: "Prague Beach Team (Střešovice)",
      capacity: 24,
      category: "Mixy",
      city: "Praha",
      date: `2023-${generateRandomNumber(1, 12)}-${generateRandomNumber(
        1,
        28
      )}`,
      id: generateRandomNumber(50, 150),
      level: "Hobby/Open",
      link: "https://michalek-beach.rezervuju.cz/training?event_group_id=36",
      name: `Random Torunament Name ${generateRandomNumber(1, 50)}`,
      organizer: "Random Name",
      price: 400,
      signed: generateRandomNumber(0, 10),
      start: "10:00",
      user_id: jwt_decode(token.access_token).sub,
    };

    fetch("http://127.0.0.1:5000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => window.location.reload(false))

      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Profil</h1>
      {token && (
        <div className="Profile--user-data">
          <p>Jméno: {userData.name}</p>
          <p>Příjmení: {userData.surname}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
      <h1>Moje Turnaje</h1>
      <div className="Data--tournament-table">
        <DataTable
          columns={columns}
          data={userTournaments}
          pagination
          customStyles={customStyles}
        />
      </div>
      <div className="Profile--tmp-buttons">
        <a href="/">Zpět na hlavní stranu</a>
        <a href="/add_tournament">Přidat turnaj</a>
        <button onClick={create_random_tournament}>Přidat random turnaj</button>
      </div>
    </>
  );
}
export default Profile;
