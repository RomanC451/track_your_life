import React from "react";

const Header = ({ category, title }) => {
  return (
    <div id="header" className="mb-10 text-slate-900 dark:text-gray-200">
      <p className="text-gray-400>">{category}</p>
      <p className="text-rxl font-extrabold tracking-tight ">{title}</p>
    </div>
  );
};

export default Header;
