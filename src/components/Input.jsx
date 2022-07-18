const Input = ({
  value,
  name,
  label,
  type,
  onChange,
  placeholder,
  classParent = "",
  classLabel = "",
  classInput = "",
  maxlength = 100,
  onChangeByE = null,
  step=1
}) => {
  const handleChange = e => {
    if (onChangeByE) onChangeByE(e);
    else onChange(e.target.value);
  };

  return (
    <div className={"mb-3 pt-3 rounded bg-gray-200 " + classParent}>
      <label
        className={
          "block text-gray-700 text-sm font-bold mb-2 ml-3 " + classLabel
        }
        htmlFor={name}
      >
        {label}
      </label>
      {type === "number"
        ? <input
            maxLength={maxlength}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            name={name}
            type="number"
            step={step}
            id={name}
            className={
              "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 pb-3 " +
              classInput
            }
            required={true}
          />
        : <input
            maxLength={maxlength}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            name={name}
            type={type}
            id={name}
            className={
              "bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-600 transition duration-500 px-3 pb-3 " +
              classInput
            }
            required={true}
          />}
    </div>
  );
};

export default Input;
