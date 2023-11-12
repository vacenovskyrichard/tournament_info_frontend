import { Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Filters.css";

export default function Filter({ header, name, control, options }) {
  return (
    <div>
      <h3>{header}</h3>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <Select placeholder="Vyberte" isMulti {...field} options={options} />
        )}
      />
    </div>
  );
}
