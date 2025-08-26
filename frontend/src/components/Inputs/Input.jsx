import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, type, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                className="cursor-pointer text-primary"
                size={22}
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                className="cursor-pointer text-slate-400"
                size={22}
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
