// import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = (data) => {
    console.log("REGISTER");
    console.log(data);
  };

  return (
    <div className="Form">
      <h1>Přidat turnaj:</h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="form-control">
          <label>Email</label>
          <input type="email" name="email" {...register("email")} />
        </div>

        <div className="form-control">
          <label>Heslo</label>
          <input type="password" name="password" {...register("password")} />
        </div>

        <div className="form-control">
          <label></label>
          <button type="submit">Registrovat</button>
        </div>
      </form>
    </div>
  );
}
export default Register;
