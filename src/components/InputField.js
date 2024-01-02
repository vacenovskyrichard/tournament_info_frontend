import "../styles/AddTournament.css";
import "../styles/Common.css";
import "../styles/InputField.css";

export default function InputField({
  className,
  type,
  label,
  additionalLabel,
  additionalLabelOnClick,
  name,
  placeholder,
  pattern,
  requiredMessage,
  onChange,
  register,
  errors,
}) {
  return (
    <div className={className ? className : "InputField"}>
      <label className="InputField--label">{label && label}</label>
      <label
        className="InputField--additional-label"
        onClick={additionalLabelOnClick && additionalLabelOnClick}
      >
        {additionalLabel && additionalLabel}
      </label>
      <input
        className="InputField--input"
        type={type && type}
        name={name && name}
        placeholder={placeholder && placeholder}
        pattern={pattern && pattern}
        {...register(
          name && name,
          requiredMessage && {
            required: {
              value: true,
              message: requiredMessage,
            },
          },
          // Set defaultValue based on pre-filled value from the browser
          { defaultValue: "" }
        )}
        onChange={onChange && onChange}
      />
      {errors && <p className="error-message">{errors?.message}</p>}
    </div>
  );
}
