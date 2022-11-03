import React from "react";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  callBack,
  classNames,
}) => {
  return (
    <button
      type="button"
      onClick={callBack}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${classNames}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
