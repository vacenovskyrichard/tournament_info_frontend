import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function Form(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.user_id = props.getToken().user_id;
    console.log(data);
    fetch("http://127.0.0.1:5000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => navigate("/"));
  };

  return (
    <div className="Form">
      <h1>Přidat turnaj:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Jméno turnaje</label>
          <input
            type="text"
            name="name"
            placeholder="Jmeno"
            {...register("name")}
          />
        </div>

        <div className="form-control">
          <label>Datum</label>
          <input type="date" name="date" {...register("date")} />
        </div>

        <div className="form-control">
          <label>Město</label>
          <input type="text" name="city" {...register("city")} />
        </div>

        <div className="form-control">
          <label>Název areálu</label>
          <input type="text" name="areal" {...register("areal")} />
        </div>

        <div className="form-control">
          <label>Kapacita turnaje</label>
          <input type="number" name="capacity" {...register("capacity")} />
        </div>

        <div className="form-control">
          <label>Startovné (za dvojici)</label>
          <input type="number" name="price" {...register("price")} />
        </div>

        <div className="form-control">
          <label>Začátek turnaje</label>
          <input type="time" name="start" {...register("start")} />
        </div>

        <div className="form-control">
          <label>Jméno organizátora</label>
          <input type="text" name="organizer" {...register("organizer")} />
        </div>

        <div className="form-control">
          <label>Kategorie (Muži/Ženy/Mixy)</label>
          <input type="text" name="category" {...register("category")} />
        </div>

        <div className="form-control">
          <label>Úroveň (Open/Hobby)</label>
          <input type="text" name="level" {...register("level")} />
        </div>

        <div className="form-control">
          <label>Odkaz na turnaj</label>
          <input type="text" name="link" {...register("link")} />
        </div>

        <div className="form-control">
          <label></label>
          <button type="submit">Přidat turnaj</button>
        </div>
      </form>
    </div>
  );
}
