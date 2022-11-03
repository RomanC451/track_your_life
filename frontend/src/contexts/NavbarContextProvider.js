import React, { createContext, useContext, useState } from "react";

const NavbarStateContext = createContext();

const navbarInitialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  musicPlayer: false,
};

export const NavbarContextProvider = ({ children }) => {
  const [navbarState, setNavbarState] = useState(navbarInitialState);

  const handleClick = (navbarItem) => {
    setNavbarState({ ...navbarInitialState, [navbarItem]: true });
  };

  const resetNavbarState = () => setNavbarState(navbarInitialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NavbarStateContext.Provider
      value={{
        navbarState,
        handleClick,
        resetNavbarState,
      }}
    >
      {children}
    </NavbarStateContext.Provider>
  );
};

export const useNavbarStateContext = () => useContext(NavbarStateContext);
