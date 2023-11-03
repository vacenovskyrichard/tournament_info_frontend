import { useForm } from "react-hook-form";
import { useState } from "react";
import "../styles/Filters.css";
import Filter from "./Filter";
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function Filters({
  data,
  setData,
  apiUrl,
  setFilterResults,
  filterOptions,
  isTabletOrMobile,
}) {
  const { control, handleSubmit, register, errors } = useForm();

  const filter_values = {
    areals: new Set(),
    cities: new Set(),
    categories: new Set(),
    levels: new Set(),
  };

  filterOptions.map((tournament) => filter_values.areals.add(tournament.areal));
  const areals = Array.from(filter_values.areals).map((areal) => {
    return {
      label: areal,
      value: areal,
    };
  });

  filterOptions.map((tournament) => filter_values.cities.add(tournament.city));
  const cities = Array.from(filter_values.cities).map((city) => {
    return {
      label: city,
      value: city,
    };
  });

  filterOptions.map((tournament) =>
    filter_values.categories.add(tournament.category)
  );
  const categories = Array.from(filter_values.categories).map((category) => {
    return {
      label: category,
      value: category,
    };
  });

  filterOptions.map((tournament) => filter_values.levels.add(tournament.level));

  const levels = Array.from(filter_values.levels).map((level) => {
    return {
      label: level,
      value: level,
    };
  });

  const saveData = (form_data) => {
    setFilterResults(form_data);
    console.log("form_data", form_data);
    fetch(`${apiUrl}/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    })
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };

  return (
    <div className={isTabletOrMobile ? "filters-mobile" : "filters"}>
      <form
        className={isTabletOrMobile ? "filters-form-mobile" : "filters-form"}
        onSubmit={handleSubmit(saveData)}
      >
        <div>
          <h3>Město</h3>
          {/* <Filter name="city" data={cities} control={control} /> */}

          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <Select
                placeholder="Vyberte"
                isMulti
                {...field}
                options={cities}
              />
            )}
          />
        </div>
        <div>
          <h3>Areál</h3>
          {/* <Filter name="areal" data={areals} control={control} /> */}
          <Controller
            name="areal"
            control={control}
            defaultValue=""
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <Select
                placeholder="Vyberte"
                isMulti
                {...field}
                options={areals}
              />
            )}
          />
        </div>
        <div>
          <h3>Kategorie</h3>
          {/* <Filter name="category" data={categories} control={control} /> */}
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <Select
                placeholder="Vyberte"
                isMulti
                {...field}
                options={categories}
              />
            )}
          />
        </div>
        <div>
          <h3>Úroveň</h3>
          {/* <Filter name="level" data={levels} control={control} /> */}
          <Controller
            name="level"
            control={control}
            defaultValue=""
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <Select
                placeholder="Vyberte"
                isMulti
                {...field}
                options={levels}
              />
            )}
          />
        </div>
        <div>
          <button
            className={isTabletOrMobile ? "save-button-mobile" : "save-button"}
            type="submit"
          >
            Filtrovat
          </button>
        </div>
      </form>
    </div>
  );
}
