import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import "../styles/Filters.css";
import Filter from "./Filter";

export default function Filters(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const filter_values = {
    areals: new Set(),
    cities: new Set(),
    categories: new Set(),
    levels: new Set(),
  };

  props.data.map((tournament) => {
    filter_values.areals.add(tournament.areal);
  });
  const areals = Array.from(filter_values.areals).map((areal) => {
    return {
      label: areal,
      value: areal,
    };
  });
  areals.push({
    label: "Bez filtru",
    value: "Bez filtru",
  });

  props.data.map((tournament) => {
    filter_values.cities.add(tournament.city);
  });
  const cities = Array.from(filter_values.cities).map((city) => {
    return {
      label: city,
      value: city,
    };
  });
  cities.push({
    label: "Bez filtru",
    value: "Bez filtru",
  });
  props.data.map((tournament) => {
    filter_values.categories.add(tournament.category);
  });
  const categories = Array.from(filter_values.categories).map((category) => {
    return {
      label: category,
      value: category,
    };
  });
  categories.push({
    label: "Bez filtru",
    value: "Bez filtru",
  });
  props.data.map((tournament) => {
    filter_values.levels.add(tournament.level);
  });

  const levels = Array.from(filter_values.levels).map((level) => {
    return {
      label: level,
      value: level,
    };
  });
  levels.push({
    label: "Bez filtru",
    value: "Bez filtru",
  });

  const saveData = (form_data) => {
    console.log("form_data", form_data);
    fetch("http://127.0.0.1:5000/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    })
      .then((resp) => resp.json())
      .then((resp) => props.setData(resp));
  };

  return (
    <div className="filters">
      <form className="filters-form" onSubmit={handleSubmit(saveData)}>
        <div>
          <h3>Město</h3>
          <Filter name="city" data={cities} control={control} />
        </div>
        <div>
          <h3>Areál</h3>
          <Filter name="areal" data={areals} control={control} />
        </div>
        <div>
          <h3>Kategorie</h3>
          <Filter name="category" data={categories} control={control} />
        </div>
        <div>
          <h3>Úroveň</h3>
          <Filter name="level" data={levels} control={control} />
        </div>
        <div>
          <button className="save-button" type="submit">
            Filtrovat
          </button>
        </div>
      </form>
    </div>
  );
}
