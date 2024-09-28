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
    />
  );
});

Inpts.displayName = "Input";

export default Inpts;