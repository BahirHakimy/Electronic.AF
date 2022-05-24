function InputMaker({ type, name, label,required,data ,placeholder, ...styling }) {

  return (
      <div>
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
          className={`${styling.styling.input}  focus:ring-gray-700 focus:border-gray-500 border-gray-300  sm:text-sm  rounded-md`}
          required={required}
          onChange={e => data(e.target.value, name) }
          placeholder={placeholder}
        />
          
      </div>
    );
  }
  
  export default InputMaker;