import React, { createContext, useContext, useState } from "react";

const AppStyleStateContext = createContext();

const themeMode = localStorage.getItem("themeMode");
const currentColor = localStorage.getItem("currentColor");

const initialState = {
  currentColor: currentColor ? currentColor : "#03C9D7",
  currentThemeMode: themeMode ? themeMode : "Light",
};

export const AppStyleContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(initialState.currentColor);
  const [currentThemeMode, setCurrentThemeMode] = useState(
    initialState.currentThemeMode
  );

  const setThemeMode = (e) => {
    setCurrentThemeMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppStyleStateContext.Provider
      value={{
        currentColor,
        setColor,
        currentThemeMode,
        setThemeMode,
      }}
    >
      {children}
    </AppStyleStateContext.Provider>
  );
};

export const useAppStyleStateContext = () => useContext(AppStyleStateContext);
