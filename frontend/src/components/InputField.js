import React from "react";

const InputField = (props) => {
  const propClasses = props.className;
  const classes = `p-3 rounded-2xl  shadow-lg w-[100%] border-[0.5px] border-gray-500 ${propClasses}`;
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg text-black-500 ">{props.label}</label>
      <input
        className={classes}
        type={props.type}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};

export default InputField;
