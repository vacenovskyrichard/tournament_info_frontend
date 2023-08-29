// import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const loginUser = (data) => {
    console.log("LOGIN");
    console.log(data);
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((respjson) =>
        console.log(
          `LOGIN RESPONSE:\n\tID: ${respjson["id"]}\n\temail: ${respjson["email"]}`
        )
      );
  };

  return (
    <div className="Form">
      <h1>Přidat turnaj:</h1>
      <form onSubmit={handleSubmit(loginUser)}>
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
          <button type="submit">Přihlásit</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
