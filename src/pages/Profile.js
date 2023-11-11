import "../styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import DataTable from "react-data-table-component";
import ExpandedComponent from "../components/ExpandedRow";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import Footer from "../components/Footer";
import { sortedTorunamentsState } from "../state/selectors/SortedTournaments";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import { screenSize } from "../state/atoms/ScreenSize";
import { ReactComponent as ExpandedIconMobile } from "../icons/expanded-mobile.svg";
import { ReactComponent as CollapsedIconMobile } from "../icons/collapsed-mobile.svg";
import { ReactComponent as ExpandedIcon } from "../icons/expanded.svg";
import { ReactComponent as CollapsedIcon } from "../icons/collapsed.svg";

function Profile({ setTournamentToEditId, loadingMainTable }) {
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const { setToken, token, removeToken } = useToken();
  const tournaments = useRecoilValue(sortedTorunamentsState);

  const [logged, setLogged] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // send command to delete tournament to backend
  const delete_tournament = (id) => {
    console.log(id);

    axios
      .delete(`${apiUrl}/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then(() => window.location.reload(false))
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Turnaj se nepodařilo smazat (na turnaj nesmí být přihlášeny žádné dvojice)."
        );

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

  // filter user tournaments and show all, if user is admin
  const [userTournaments, setUserTournaments] = useState([]);

  useEffect(() => {
    if (token.role === "player") {
      if (token.id != "") {
        fetch(`${apiUrl}/get_players_tournaments/${token.id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            console.log("resp");
            console.log(resp);
            setUserTournaments(resp);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      setUserTournaments(
        token.role === "admin"
          ? tournaments
          : tournaments.filter((tournament) => tournament.user_id === token.id)
      );
      setLoading(false);
    }
  }, [tournaments]);

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
      user_id: jwt_decode(token.accessToken).sub,
      registration_enabled: false,
    };

    fetch(`${apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
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
        id: token.id,
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

  // ============================================================================
  const [statusChanged, setStatusChanged] = useState(false); // used to trigger rerender after sign in/out from tournament

  const [signedTeams, setSignedTeams] = useState({});

  // load all signed teams from all tournaments from database
  useEffect(() => {
    fetch(`${apiUrl}/get_teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: token.id }),
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
      width: screenType === "mobile" ? "220px" : "180px",
    },
    {
      name: "Název",
      selector: (row) => row.name,
      width: screenType === "mobile" ? "650px" : "900px",
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

      width: "250px",
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

  return (
    <>
      <Navbar title={"Profil"} />
      {logged ? (
        <div className="Profile--main">
          {token && (
            <div className="Profile--user-data">
              <h1>Osobní údaje</h1>

              <div className="Profile--user-data-body">
                <div className="Profile--user-data-body-labels">
                  <p>Jméno:</p>
                  <p>Email:</p>
                  <p>Role:</p>
                </div>
                <div className="Profile--user-data-body-data">
                  <p>
                    {token.name} {token.surname}
                  </p>
                  <p>{token.email}</p>
                  <p>{token.role}</p>
                </div>
              </div>

              <div className="Profile--change-password-box">
                <a href="./change_password">Změnit heslo</a>
              </div>
            </div>
          )}
          <div
            className={
              screenType === "mobile"
                ? "Profile--tournament-table-mobile"
                : "Profile--tournament-table"
            }
          >
            <h1>Moje Turnaje</h1>
            {userTournaments && token.role !== "basic" && (
              <DataTable
                columns={screenType === "mobile" ? mobileColumns : columns}
                data={userTournaments}
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
                    showEditerButtons={
                      token.role === "organizer" || token.role === "admin"
                    }
                    editTorunament={() => edit_tournament(row.id)}
                    deleteTorunament={() => {
                      setDeleteId(row.id);
                      setShowConfirmation(true);
                    }}
                  />
                )}
                noDataComponent={
                  loading ? (
                    <h3 style={{ fontSize: "30px" }}>Data se načítají...</h3>
                  ) : token.role === "player" ? (
                    <h3 style={{ fontSize: "30px" }}>
                      Nejste přihlášeni na žádný turnaj
                    </h3>
                  ) : (
                    <h3 style={{ fontSize: "30px" }}>Nemáte žádné turnaje</h3>
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
                conditionalRowStyles={
                  screenType === "mobile" && conditionalRowStyles
                }
              />
            )}
          </div>
          <div className="Profile--buttons">
            {(token.role === "admin" || token.role === "organizer") && (
              <button onClick={() => navigate("/add_tournament")}>
                Přidat turnaj
              </button>
            )}
            {token.role === "admin" && (
              <button onClick={create_random_tournament}>
                Přidat random turnaj
              </button>
            )}
            {token.role === "basic" &&
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
        <div className="Profile--logged-out">
          <h1>Radši jsme vás odhlásili, přihlaste se prosím znovu</h1>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Profile;
