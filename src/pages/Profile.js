import "../styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import Footer from "../components/Footer";

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

  const [logged, setLogged] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

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
        fontSize: "23px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        fontSize: "23px",
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
      width: "350px",
    },
    {
      name: "Kategorie",
      selector: (row) => row.category,
    },
    {
      name: "Areál",
      selector: (row) => row.areal,
      width: "350px",
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
    console.log("token");
    console.log(token);
    const at = token ? token.access_token : "";
    fetch(`${apiUrl}/user_info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 422) {
          // Handle the 401 error here, for example:
          // Redirect the user to a login page or display an error message
          console.log("Unauthorized: Token expired or invalid");
          removeToken();
          setLogged(false);
        }
        if (response.status === 200) {
          const new_access_token = response.headers.get("new_access_token");
          if (new_access_token !== "None") {
            console.log("new_access_token has been set");
            setToken({ access_token: new_access_token });
          }
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        setUserData(response);
      })
      .catch((error) => {
        console.log("Other error ocured.");
      }); // eslint-disable-next-line
  }, []);

  // filter user tournaments and show all, if user is admin
  const userId = token ? jwt_decode(token.access_token).sub : "";
  var userTournaments = "";
  if (userData) {
    userTournaments =
      userData.role === "admin"
        ? tournamentsData
        : tournamentsData.filter((tournament) => tournament.user_id === userId);
  }

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

  const sendOrganizerRequest = () => {
    axios({
      method: "POST",
      url: `${apiUrl}/request_organizer`,
      data: {
        id: userData.id,
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          setRequestSent(true);
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

  return (
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Profil"}
      />
      {logged ? (
        <div className="Profile--main">
          {token && (
            <div className="Profile--user-data">
              <h1>Osobní údaje</h1>
              <div className="Profile--user-data-box">
                <p>Jméno:</p>
                <p>
                  {userData.name} {userData.surname}{" "}
                </p>
              </div>
              <div className="Profile--user-data-box">
                <p>Email:</p>
                <p>{userData.email}</p>
              </div>
              <div className="Profile--user-data-box">
                <p>Role:</p>
                <p>{userData.role}</p>
              </div>
            </div>
          )}
          <div className="Profile--tournament-table">
            <h1>Moje Turnaje</h1>
            {userTournaments && userData.role !== "basic" && (
              <DataTable
                columns={columns}
                data={userTournaments}
                pagination
                customStyles={customStyles}
              />
            )}
          </div>
          <div className="Profile--buttons">
            {(userData.role === "admin" || userData.role === "organizer") && (
              <button onClick={() => navigate("/add_tournament")}>
                Přidat turnaj
              </button>
            )}
            {userData.role === "admin" && (
              <button onClick={create_random_tournament}>
                Přidat random turnaj
              </button>
            )}
            {userData.role === "basic" &&
              (requestSent ? (
                <h3 className="Profile-request-sent">
                  Žádost byla úspěšně poslána!
                </h3>
              ) : (
                <div className="Profile--request-box">
                  <h3>
                    Jste organizátor/ka a přejete si mít možnost na této
                    platformě přidávat a spravovat své turnaje?
                  </h3>
                  <div className="Profile--request-btn-box">
                    <h3>Požádajte o roli organizátora: </h3>
                    <button
                      onClick={sendOrganizerRequest}
                      className="Profile--request-btn"
                    >
                      Poslat žádost
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <Modal
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            classNames={{
              modal: "Profile--confirm-window",
            }}
          >
            {showConfirmation && (
              <div className="Profile-delete-confirmation">
                <h1>Opravdu chcete turnaj smazat?</h1>
                <div>
                  <button
                    className="Profile-confirm-delete-btn"
                    onClick={() => {
                      delete_tournament(deleteId);
                      setShowConfirmation(false);
                    }}
                  >
                    Ano smazat
                  </button>
                  <button
                    className="Profile-refuse-delete-btn"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Ne, zpět
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      ) : (
        <h1 style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          Radši jsme vás odhlásili, přihlašte se prosím znovu
        </h1>
      )}
      <Footer />
    </>
  );
}
export default Profile;
