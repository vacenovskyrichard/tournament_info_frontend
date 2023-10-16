import { Controller } from "react-hook-form";
import Select from "react-select";
import "../styles/Filters.css";

export default function Filter(props) {
  return (
    <div className="filter">
      <Controller
        control={props.control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            options={props.data}
            value={props.data.find((c) => c.value === value)}
            onChange={(val) => onChange(val.value)}
            defaultValue={props.data.find((c) => c.value === "Bez filtru")}
          />
        )}
        name={props.name}
      />
    </div>
  );
}
