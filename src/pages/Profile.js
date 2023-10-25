import "../styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";

function Profile({
  token,
  removeToken,
  setToken,
  tournamentsData,
  setTournamentsData,
  apiUrl,
  setTournamentToEditId,
}) {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    role: "",
  });

  const userId = jwt_decode(token.access_token).sub;
  const navigate = useNavigate();

  // send command to delete tournament to backend
  const delete_tournament = (id) => {
    console.log(id);

    axios
      .delete(`${apiUrl}/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
      .then((response) => {
        const new_access_token = response.headers.get("new_access_token");
        if (new_access_token !== "None") {
          console.log("new_access_token has been set");
          setToken({ access_token: new_access_token });
        }
        return response;
      })
      .then(() => window.location.reload(false))
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };

  // open edit tournament page and set id to local storage
  const edit_tournament = (id) => {
    console.log(id);
    setTournamentToEditId(id);
    localStorage.setItem("editId", id);
    navigate("/edit_tournament");
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
        <img
          src="./edit.png"
          style={{
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
          onClick={() => edit_tournament(row.id)}
        />
      ),
      width: "50px",
    },
    {
      name: "",
      cell: (row) => (
        <img
          src="./delete.png"
          style={{
            height: "30px",
            width: "30px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => {
            setDeleteId(row.id);
            setShowConfirmation(true);
          }}
        />
      ),
      width: "60px",
    },
  ];

  useEffect(() => {
    const user_id = jwt_decode(token.access_token).sub;
    console.log("user_id");
    console.log(user_id);
    fetch(`${apiUrl}/user_info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((response) => {
        if (response.status === 200) {
          const new_access_token = response.headers.get("new_access_token");
          if (new_access_token !== "None") {
            console.log("new_access_token has been set");
            setToken({ access_token: new_access_token });
          }

          return response.json();
        } else {
          throw new Error("Failed to send data or fetch response");
        }
      })
      .then((response) => {
        console.log(response);
        setUserData(response);
      }); // eslint-disable-next-line
  }, []);

  // filter user tournaments and show all, if user is admin
  const userTournaments =
    userData.role === "admin"
      ? tournamentsData
      : tournamentsData.filter((tournament) => tournament.user_id === userId);

  // creates tournament with random data - used for testing
  const create_random_tournament = () => {
    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const categories = ["Mixy", "Muži", "Ženy"];
    const data = {
      areal: "Testovací Areál",
      capacity: "24",
      category: categories[generateRandomNumber(0, 2)],
      city: "Praha",
      date: `2023-${generateRandomNumber(1, 12)}-${generateRandomNumber(
        1,
        28
      )}`,
      id: generateRandomNumber(50, 150),
      level: "Open",
      link: "https://michalek-beach.rezervuju.cz/training?event_group_id=36",
      name: `Random Torunament Name ${generateRandomNumber(1, 50)}`,
      organizer: "Random Name",
      price: 400,
      start: "10:00",
      user_id: jwt_decode(token.access_token).sub,
    };

    fetch(`${apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => window.location.reload(false))

      .catch((error) => console.log(error));
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState();

  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Profil"}
      />
      <div className="Profile--main">
        <h1>Osobní údaje</h1>
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
          <button onClick={create_random_tournament}>
            Přidat random turnaj
          </button>
        </div>
        <Modal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          classNames={{
            modal: "Profile--confirm-window",
          }}
        >
          {showConfirmation && (
            <div>
              <h1>Opravdu chcete turnaj smazat?</h1>
              <p>
                <button
                  onClick={() => {
                    delete_tournament(deleteId);
                    setShowConfirmation(false);
                  }}
                >
                  Ano smazat
                </button>
                <button onClick={() => setShowConfirmation(false)}>
                  Ne, zpět
                </button>
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}
export default Profile;
