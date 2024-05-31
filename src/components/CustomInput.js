import React from "react";
import { Input } from "antd";
const CustomInput = (props) => {
  const { type, className, id, placeholder, name, value, onChange } = props;
  return (
    <>
      <div className="form-floating">
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onChange}
        />
        <label htmlFor="">{placeholder}</label>
      </div>
    </>
  );
};

export default CustomInput;
