function InputMaker({ type, name, label, ...styling }) {
    return (
      <div className="">
        <label
          htmlFor={name}
          className={`${styling.styling.labelStyling}  text-sm font-medium text-gray-700 pl-1 `}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className={`${styling.styling.input} focus:ring-gray-700 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md`}
        />
      </div>
    );
  }
  
  export default InputMaker;