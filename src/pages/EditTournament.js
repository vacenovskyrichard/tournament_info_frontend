import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../styles/EditTournament.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
  const [editDate, setEditDate] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editAreal, setEditAreal] = useState(false);
  const [editCapacity, setEditCapacity] = useState(false);
  const [editSigned, setEditSigned] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editStart, setEditStart] = useState(false);
  const [editOrganizer, setEditOrganizer] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editLevel, setEditLevel] = useState(false);
  const [editLink, setEditLink] = useState(false);

  // get all tournaments and filter by id the one to be edited
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

  // send data about edited tournament to bakckend
  const onSubmit = (data) => {
    data.user_id = jwt_decode(token.access_token).sub;
    if (data.level) {
      data.level = data.level.label;
    }
    if (data.category) {
      data.category = data.category.label;
    }

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
    <>
      <Navbar
        token={token}
        removeToken={removeToken}
        setToken={setToken}
        apiUrl={apiUrl}
        title={"Upravení turnaje"}
      />

      <div className="EditTournament--main">
        <div className="EditTournament--form">
          {/* Tournament name */}
          <div className="EditTournament--form-element">
            <h3>Jméno turnaje</h3>
            {!editName ? (
              <p>
                {editedTournament && editedTournament.name}{" "}
                <button onClick={() => setEditName(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="name"
                  defaultValue={editedTournament && editedTournament.name}
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

          {/* Tournament date */}
          <div className="EditTournament--form-element">
            <h3>Datum</h3>
            {!editDate ? (
              <p>
                {editedTournament && editedTournament.date}
                <button onClick={() => setEditDate(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="date"
                  name="date"
                  defaultValue={editedTournament && editedTournament.date}
                  {...register("date", {
                    required: {
                      value: true,
                      message: "Zadejte datum turnaje",
                    },
                  })}
                />
                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament city */}
          <div className="EditTournament--form-element">
            <h3>Město</h3>
            {!editCity ? (
              <p>
                {editedTournament && editedTournament.city}{" "}
                <button onClick={() => setEditCity(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="city"
                  defaultValue={editedTournament && editedTournament.city}
                  {...register("city", {
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

          {/* Tournament areal */}
          <div className="EditTournament--form-element">
            <h3>Areál</h3>
            {!editAreal ? (
              <p>
                {editedTournament && editedTournament.areal}{" "}
                <button onClick={() => setEditAreal(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="areal"
                  defaultValue={editedTournament && editedTournament.areal}
                  {...register("areal", {
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

          {/* Tournament capacity */}
          <div className="EditTournament--form-element">
            <h3>Kapacita</h3>
            {!editCapacity ? (
              <p>
                {editedTournament && editedTournament.capacity}{" "}
                <button onClick={() => setEditCapacity(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="capacity"
                  defaultValue={editedTournament && editedTournament.capacity}
                  {...register("capacity", {
                    required: {
                      value: true,
                      message: "Zadejte kapacitu turnaje.",
                    },

                    pattern: {
                      value: /^\d+$/,
                      message: "Zadaná hodnota není validní",
                    },
                  })}
                />
                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament number of signed teams */}
          <div className="EditTournament--form-element">
            <h3>Pořet přihlášených týmů</h3>
            {!editSigned ? (
              <p>
                {editedTournament && editedTournament.signed}{" "}
                <button onClick={() => setEditSigned(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="signed"
                  defaultValue={editedTournament && editedTournament.signed}
                  {...register("signed", {
                    required: {
                      value: true,
                      message: "Zadejte počet přihlášených týmů.",
                    },

                    pattern: {
                      value: /^\d+$/,
                      message: "Zadaná hodnota není validní",
                    },
                  })}
                />
                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament price */}
          <div className="EditTournament--form-element">
            <h3>Startovné</h3>
            {!editPrice ? (
              <p>
                {editedTournament && editedTournament.price}{" "}
                <button onClick={() => setEditPrice(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="price"
                  defaultValue={editedTournament && editedTournament.price}
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Zadejte město, kde se turnaj koná",
                    },

                    pattern: {
                      value: /^\d+$/,
                      message: "Zadaná hodnota není validní",
                    },
                  })}
                />
                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament start */}
          <div className="EditTournament--form-element">
            <h3>Začátek</h3>
            {!editStart ? (
              <p>
                {editedTournament && editedTournament.start}{" "}
                <button onClick={() => setEditStart(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="start"
                  placeholder="HH:mm"
                  defaultValue={editedTournament && editedTournament.start}
                  pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                  {...register("start", {
                    required: {
                      value: true,
                      message: "Zadejte čas začátku turnaje ",
                    },
                  })}
                  onChange={(e) => {
                    const input = e.target;
                    const value = input.value;
                    if (/^\d{1,2}:\d{0,2}$/.test(value)) {
                      const [hours, minutes] = value.split(":");
                      if (
                        parseInt(hours, 10) <= 23 &&
                        parseInt(minutes, 10) <= 59
                      ) {
                        input.setCustomValidity("");
                      } else {
                        input.setCustomValidity("Invalid time");
                      }
                    } else {
                      input.setCustomValidity("Invalid time");
                    }
                  }}
                />

                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament organizer */}
          <div className="EditTournament--form-element">
            <h3>Organizátor</h3>
            {!editOrganizer ? (
              <p>
                {editedTournament && editedTournament.organizer}{" "}
                <button onClick={() => setEditOrganizer(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="organizer"
                  defaultValue={editedTournament && editedTournament.organizer}
                  {...register("organizer", {
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

          {/* Tournament category */}
          <div className="EditTournament--form-element">
            <h3>Kategorie</h3>
            {!editCategory ? (
              <p>
                {editedTournament && editedTournament.category}{" "}
                <button onClick={() => setEditCategory(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Vyberte úroveň" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryOptions}
                      placeholder={"Vyberte kategorii"}
                      styles={{
                        // Add custom styles for the border
                        control: (base, state) => ({
                          ...base,
                          border: "1px solid #e6e6e6",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "18px",
                          width: "100%",
                          backgroundColor: "#f7f7f7",
                          height: "40px",
                          borderRadius: "10px",
                        }),
                      }}
                    />
                  )}
                />

                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament level */}
          <div className="EditTournament--form-element">
            <h3>Úroveň</h3>
            {!editLevel ? (
              <p>
                {editedTournament && editedTournament.level}{" "}
                <button onClick={() => setEditLevel(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: "Vyberte úroveň" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={levelOptions}
                      placeholder={"Vyberte úroveň"}
                      styles={{
                        // Add custom styles for the border
                        control: (base, state) => ({
                          ...base,
                          border: "1px solid #e6e6e6",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "18px",
                          width: "100%",
                          backgroundColor: "#f7f7f7",
                          height: "40px",
                          borderRadius: "10px",
                        }),
                      }}
                    />
                  )}
                />

                <button type="submit">uložit</button>
              </form>
            )}
          </div>

          {/* Tournament link */}
          <div className="EditTournament--form-element">
            <h3>Odkaz</h3>
            {!editLink ? (
              <p>
                {editedTournament && editedTournament.link}{" "}
                <button onClick={() => setEditLink(true)}>editovat</button>
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="link"
                  defaultValue={editedTournament && editedTournament.link}
                  {...register("link", {
                    required: {
                      value: true,
                      message: "Zadejte odkaz na turnaj",
                    },
                  })}
                />

                <button type="submit">uložit</button>
              </form>
            )}
          </div>
          <div
            className="EditTournament--finish-button"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <p>Dokončit úpravy</p>
          </div>

          {/* <DevTool control={control} /> */}
        </div>
      </div>
    </>
  );
}
