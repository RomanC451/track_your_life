import React, { createContext, useContext, useState, useEffect } from "react";

const AppGeneralStateContext = createContext();

const initialState = {
  sidebarActive: false,
  screenSize: window.innerWidth,
  themeSettingsActive: false,
};

export const AppGeneralContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(
    initialState.sidebarActive
  );
  const [screenSize, setScreenSize] = useState(initialState.screenSize);
  const [themeSettingsActive, setThemeSettingsActive] = useState(
    initialState.themeSettingsActive
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppGeneralStateContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        screenSize,
        setScreenSize,
        themeSettingsActive,
        setThemeSettingsActive,
      }}
    >
      {children}
    </AppGeneralStateContext.Provider>
  );
};

export const useAppGeneralStateContext = () =>
  useContext(AppGeneralStateContext);
