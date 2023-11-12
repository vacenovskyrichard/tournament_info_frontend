import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/AddTournament.css";
import "../styles/Common.css";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import jwt_decode from "jwt-decode";
import useToken from "../components/useToken";
import { useRecoilValue } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import { SelectFormFontFamily } from "../config/Font";
import { screenSize } from "../state/atoms/ScreenSize";

export default function AddTournament() {
  const apiUrl = useRecoilValue(apiUrlState);
  const screenType = useRecoilValue(screenSize);
  const { token } = useToken();
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // on submit form function sends data to backend about newly created tournament
  const onSubmit = (data) => {
    data.user_id = token && jwt_decode(token.accessToken).sub;
    data.category = data.category.label;
    data.level = data.level.label;
    console.log(data);
    fetch(`${apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => navigate("/"));
  };

  // options for category select form
  const categoryOptions = [
    { value: "mix", label: "Mixy" },
    { value: "men", label: "Muži" },
    { value: "women", label: "Ženy" },
    { value: "other", label: "Jiné" },
  ];

  // options for level select form
  const levelOptions = [
    { value: "hobby", label: "Hobby" },
    { value: "open", label: "Open" },
    { value: "cvf", label: "CVF (svazový turnaj)" },
  ];

  // function to check time input
  const onChangeStartTime = (e) => {
    const input = e.target;
    const value = input.value;
    if (/^\d{1,2}:\d{0,2}$/.test(value)) {
      const [hours, minutes] = value.split(":");
      if (parseInt(hours, 10) <= 23 && parseInt(minutes, 10) <= 59) {
        input.setCustomValidity("");
      } else {
        input.setCustomValidity("Invalid time");
      }
    } else {
      input.setCustomValidity("Invalid time");
    }
  };

  // Add custom styles to select form
  const selectStyle = {
    control: (base) => ({
      ...base,
      border: "1px solid #e6e6e6",
      fontFamily: SelectFormFontFamily,
      fontSize: "18px",
      width: "103%",
      backgroundColor: "#f7f7f7",
      height: "42px",
      borderRadius: "10px",
    }),
  };

  return (
    <>
      <Navbar title={"Vytvoření nového turnaje"} />
      <div className="AddTournament">
        <form
          className={
            screenType === "mobile"
              ? "AddTournament--form-mobile"
              : "AddTournament--form"
          }
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Tournament name */}
          <InputField
            label={"Jméno turnaje"}
            type={"text"}
            name={"name"}
            requiredMessage={"Zadejte jméno turnaje"}
            errors={errors.name}
            register={register}
          />

          {/* Tournament date */}
          <InputField
            label={"Datum"}
            type={"date"}
            name={"date"}
            requiredMessage={"Zadejte datum turnaje"}
            errors={errors.date}
            register={register}
          />

          {/* Tournament city */}
          <InputField
            label={"Město"}
            type={"text"}
            name={"city"}
            requiredMessage={"Zadejte město, kde se turnaj koná"}
            errors={errors.city}
            register={register}
          />

          {/* Tournament areal */}
          <InputField
            label={"Areál"}
            type={"text"}
            name={"areal"}
            requiredMessage={"Zadejte areál"}
            errors={errors.areal}
            register={register}
          />

          {/* Tournament capacity */}
          <InputField
            label={"Kapacita"}
            type={"text"}
            name={"capacity"}
            requiredMessage={"Zadejte kapacitu"}
            errors={errors.capacity}
            register={register}
            pattern={{
              value: /^\d+$/,
              message: "Zadaná hodnota není validní",
            }}
          />

          {/* Tournament price */}
          <InputField
            label={"Startovné (za osobu)"}
            type={"text"}
            name={"price"}
            requiredMessage={"Zadejte startovné"}
            errors={errors.price}
            register={register}
            pattern={{
              value: /^\d+$/,
              message: "Zadaná hodnota není validní",
            }}
          />

          {/* Tournament start */}
          <InputField
            label={"Začátek turnaje"}
            type={"text"}
            name={"start"}
            requiredMessage={"Zadejte čas začátku turnaje"}
            errors={errors.start}
            register={register}
            pattern={"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"}
            onChange={onChangeStartTime}
          />

          {/* Tournament organizer */}
          <InputField
            label={"Jméno organizátora"}
            type={"text"}
            name={"organizer"}
            requiredMessage={"Zadejte jméno organizátora"}
            errors={errors.organizer}
            register={register}
          />

          {/* Tournament category */}
          <div className="AddTournament--form-element">
            <label className="InputField--label">Kategorie</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Vyberte kategorii" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  placeholder={"Vyberte kategorii"}
                  styles={selectStyle}
                />
              )}
            />
            {errors.category && (
              <p className="error-message">{errors.category.message}</p>
            )}
          </div>

          {/* Tournament level */}
          <div>
            <label className="InputField--label">Úroveň</label>
            <Controller
              name="level"
              control={control}
              rules={{ required: "Vyberte úroveň" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={levelOptions}
                  placeholder={"Vyberte úroveň"}
                  styles={selectStyle}
                />
              )}
            />
            {errors.level && (
              <p className="error-message">{errors.level.message}</p>
            )}
          </div>

          {/* Tournament link */}
          <InputField
            label={"Odkaz na turnaj"}
            type={"text"}
            name={"link"}
            requiredMessage={"Zadejte odkaz na turnaj"}
            errors={errors.link}
            register={register}
          />

          {/* Enable logging with turnajky.cz */}
          <div className="AddTournament--form-element-checkbox">
            <label className="InputField--label">
              Povolit přihlašování přes turnajky.cz
            </label>

            <input
              type="checkbox"
              name="registration_enabled"
              {...register("registration_enabled")}
            />
          </div>

          {/* Submit button */}
          <div>
            <div
              className={
                screenType === "mobile"
                  ? "AddTournament--submit-button-box-mobile"
                  : "AddTournament--submit-button-box"
              }
            >
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
