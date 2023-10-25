import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../styles/AddTournament.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";
import dayjs from "dayjs";
import { TimePicker } from "antd";

export default function EditTournament({
  token,
  removeToken,
  setToken,
  apiUrl,
  tournamentToEditId,
  tournamentsData,
  setTournamentsData,
}) {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [editedTournament, setEditedTournament] = useState();
  const [editName, setEditName] = useState(false);
  const [myId, setmyId] = useState();

  // get all tournaments and filter by id the one to be edited
  console.log();
  useEffect(() => {
    console.log("Rendering...");
    fetch(`${apiUrl}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        const editId = localStorage.getItem("editId");
        setEditedTournament(resp.find((item) => item.id === editId));
      })
      .catch((err) => console.log(err)); // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    data.user_id = jwt_decode(token.access_token).sub;
    fetch(`${apiUrl}/update/${localStorage.getItem("editId")}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => window.location.reload(false));
  };

  const categoryOptions = [
    { value: "mix", label: "Mixy" },
    { value: "men", label: "Muži" },
    { value: "women", label: "Ženy" },
    { value: "other", label: "Jiné" },
  ];
  const levelOptions = [
    { value: "hobby", label: "Hobby/Amatér" },
    { value: "open", label: "Open" },
    { value: "cvf", label: "CVF (svazový turnaj)" },
  ];

  return (
    <div className="AddTournament--main">
      <h1>Upravit turnaj:</h1>
      <div className="AddTournament--form-element">
        <label>Jméno turnaje</label>
        {!editName ? (
          <h3>
            {editedTournament && editedTournament.name}{" "}
            <button onClick={() => setEditName(true)}>editovat</button>
          </h3>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Zadejte jméno turnaje",
                },
              })}
            />
            <button type="submit">uložit</button>
          </form>
        )}
      </div>
      <p>{editedTournament && editedTournament.date}</p>
      <p>{editedTournament && editedTournament.city}</p>
      <p>{editedTournament && editedTournament.areal}</p>
      <p>{editedTournament && editedTournament.capacity}</p>
      <p>{editedTournament && editedTournament.price}</p>
      <p>{editedTournament && editedTournament.start}</p>
      <p>{editedTournament && editedTournament.organizer}</p>
      <p>{editedTournament && editedTournament.category}</p>
      <p>{editedTournament && editedTournament.level}</p>
      <p>{editedTournament && editedTournament.link}</p>

      {/* <DevTool control={control} /> */}
    </div>
  );
}
