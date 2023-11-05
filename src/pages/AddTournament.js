import "../styles/AddTournament.css";
import "../styles/Common.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";
import Navbar from "../components/Navbar";

export default function AddTournament({
  token,
  removeToken,
  setToken,
  apiUrl,
}) {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // on submit form function sends data to backend about newly created tournament
  const onSubmit = (data) => {
    data.user_id = jwt_decode(token.access_token).sub;
    data.category = data.category.label;
    data.level = data.level.label;
    console.log(data);
    fetch(`${apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => navigate("/"));
  };

  const categoryOptions = [
    { value: "mix", label: "Mixy" },
    { value: "men", label: "Muži" },
    { value: "women", label: "Ženy" },
    { value: "other", label: "Jiné" },
  ];
  const levelOptions = [
    { value: "hobby", label: "Hobby" },
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
        title={"Vytvoření nového turnaje"}
      />

      <div className="AddTournament--main">
        <p></p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tournament name */}
          <div className="AddTournament--form-element">
            <label>Jméno turnaje</label>
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
            {errors.name && (
              <p className="error-message">{errors.name?.message}</p>
            )}
          </div>

          {/* Tournament date */}
          <div className="AddTournament--form-element">
            <label>Datum</label>
            <input
              type="date"
              name="date"
              {...register("date", {
                required: {
                  value: true,
                  message: "Zadejte datum turnaje",
                },
              })}
            />
            {errors.date && (
              <p className="error-message">{errors.date?.message}</p>
            )}
          </div>

          {/* Tournament city */}
          <div className="AddTournament--form-element">
            <label>Město</label>
            <input
              type="text"
              name="city"
              {...register("city", {
                required: {
                  value: true,
                  message: "Zadejte město, kde se turnaj koná",
                },
              })}
            />
            {errors.city && (
              <p className="error-message">{errors.city?.message}</p>
            )}
          </div>

          {/* Tournament areal */}
          <div className="AddTournament--form-element">
            <label>Název areálu</label>
            <input
              type="text"
              name="areal"
              {...register("areal", {
                required: {
                  value: true,
                  message: "Zadejte jméno areálu",
                },
              })}
            />
            {errors.areal && (
              <p className="error-message"> {errors.areal?.message}</p>
            )}
          </div>

          {/* Tournament capacity */}
          <div className="AddTournament--form-element">
            <label>Kapacita</label>
            <input
              type="text"
              name="capacity"
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
            {errors.capacity && (
              <p className="error-message">{errors.capacity?.message}</p>
            )}
          </div>

          {/* Tournament price */}
          <div className="AddTournament--form-element">
            <label>Startovné (za osobu)</label>
            <input
              type="text"
              name="price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Zadejte cenu startovného",
                },

                pattern: {
                  value: /^\d+$/,
                  message: "Zadaná hodnota není validní",
                },
              })}
            />
            {errors.price && (
              <p className="error-message">{errors.price?.message}</p>
            )}
          </div>

          {/* Tournament start */}
          <div className="AddTournament--form-element">
            <label>Začátek turnaje</label>
            <input
              type="text"
              name="start"
              placeholder="HH:mm"
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
            {errors.start && (
              <p className="error-message">{errors.start?.message}</p>
            )}
          </div>

          {/* Tournament organizer */}
          <div className="AddTournament--form-element">
            <label>Jméno organizátora</label>
            <input
              type="text"
              name="organizer"
              {...register("organizer", {
                required: {
                  value: true,
                  message: "Zadejte jméno organizátora",
                },
              })}
            />
            {errors.organizer && (
              <p className="error-message">{errors.organizer?.message}</p>
            )}
          </div>

          {/* Tournament category */}
          <div className="AddTournament--form-element">
            <label>Kategorie</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Vyberte kategorii" }}
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
            {errors.category && (
              <p className="error-message">{errors.category.message}</p>
            )}
          </div>

          {/* Tournament level */}
          <div className="AddTournament--form-element">
            <label>Úroveň</label>
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
            {errors.level && (
              <p className="error-message">{errors.level.message}</p>
            )}
          </div>

          {/* Tournament link */}
          <div className="AddTournament--form-element">
            <label>Odkaz na turnaj</label>
            <input
              type="text"
              name="link"
              {...register("link", {
                required: {
                  value: true,
                  message: "Zadejte odkaz na turnaj",
                },
              })}
            />
            {errors.link && (
              <p className="error-message">{errors.link?.message}</p>
            )}
          </div>

          {/* Enable logging with turnajky.cz */}
          <div className="AddTournament--form-element-checkbox">
            <label>Povolit přihlašování přes turnajky.cz</label>

            <input
              type="checkbox"
              name="registration_enabled"
              {...register("registration_enabled")}
            />
          </div>

          {/* Submit button */}
          <div className="AddTournament--form-element">
            <label></label>
            <div className="AddTournament--submit-button-box">
              <button className="AddTournament--submit-button" type="submit">
                Přidat turnaj
              </button>
            </div>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </>
  );
}
