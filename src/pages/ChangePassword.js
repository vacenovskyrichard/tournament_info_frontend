import "../styles/ChangePassword.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";

export default function ChangePassword({}) {
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const changePassword = (credentials) => {
    console.log("Passwords:");
    console.log(credentials.oldPassword);
    console.log(credentials.newPassword);
    console.log(credentials.newPasswordCheck);
  };

  return (
    <>
      <Navbar title={"Změna hesla"} />
      <h1>Tady na tom se ještě pracuje</h1>
      {/* <form onSubmit={handleSubmit(changePassword)} className="login-form">
          <InputField
            label={"Původní heslo"}
            type={"password"}
            name={"oldPassword"}
            requiredMessage={"Zadejte heslo"}
            errors={errors.oldPassword}
            register={register}
          />

          <InputField
            label={"Nové heslo"}
            type={"password"}
            name={"newPassword"}
            requiredMessage={"Zadejte heslo"}
            errors={errors.newPassword}
            register={register}
          />

          <InputField
            label={"Nové heslo znovu"}
            type={"password"}
            name={"newPasswordCheck"}
            requiredMessage={"Zadejte znovu heslo"}
            errors={errors.newPasswordCheck}
            register={register}
          />

          <button className="Login--login-button" type="submit">
            <p>Změnit heslo</p>
          </button>

        </form> */}
      <Footer />
    </>
  );
}
