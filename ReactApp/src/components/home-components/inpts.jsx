import { forwardRef } from "react";

const Inpts = forwardRef(({ placeholder, type, value, Change_Value }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}

      ref={ref}
      value={value}
      onInput={Change_Value}
      className="inpts"
      required
      pattern="^[a-zA-Z0-9]+$"
      title="Solo puede contener letras y números"
      minLength="5"
      maxLength="15"
      
    />
  );
});

Inpts.displayName = "Input";

export default Inpts;