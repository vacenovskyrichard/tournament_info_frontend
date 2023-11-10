import { useForm } from "react-hook-form";
import { useState } from "react";
import "../styles/Filters.css";
import Filter from "./Filter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { apiUrlState } from "../state/atoms/ApiUrlState";
import { tournamentsState } from "../state/atoms/TournamentsState";

export default function Filters({
  setFilterResults,
  filterOptions,
  isTabletOrMobile,
}) {
  const { control, handleSubmit } = useForm();
  const [showFilters, setShowFilers] = useState(false);
  const apiUrl = useRecoilValue(apiUrlState);
  const setTournamentsData = useSetRecoilState(tournamentsState);
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
      .then((resp) => setTournamentsData(resp));
  };

  return (
    <div className={isTabletOrMobile ? "filters-mobile" : "filters"}>
      {/* {showFilters ? ( */}
      <form
        className={isTabletOrMobile ? "filters-form-mobile" : "filters-form"}
        onSubmit={handleSubmit(saveData)}
      >
        <Filter header="Město" name="city" control={control} options={cities} />
        <Filter
          header="Areál"
          name="areal"
          control={control}
          options={areals}
        />
        <Filter
          header="Kategorie"
          name="category"
          control={control}
          options={categories}
        />
        <Filter
          header="Úroveň"
          name="level"
          control={control}
          options={levels}
        />
        <div>
          <button
            className={
              isTabletOrMobile
                ? "Filters--save-button-mobile"
                : "Filters--save-button"
            }
            type="submit"
          >
            Filtrovat
          </button>
        </div>
        {/* <button
          className="Filters--hide-filters-btn"
          onClick={() => setShowFilers(false)}
        >
          X
        </button> */}
      </form>
      {/* ) : (
        <button
          className="Filters--show-filters-btn"
          onClick={() => setShowFilers(true)}
        >
          Zobrazit filtry
        </button>
      )} */}
    </div>
  );
}
