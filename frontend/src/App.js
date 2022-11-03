import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import { Navbar, Sidebar, Footer, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";

import "./App.css";

import { NavbarContextProvider } from "./contexts/NavbarContextProvider";
import { useAppGeneralStateContext } from "./contexts/AppGeneralContextProvider";
import { useAppStyleStateContext } from "./contexts/AppStyleContextProvider";

const App = () => {
  const { sidebarActive, themeSettings, setThemeSettings, screenSize } =
    useAppGeneralStateContext();
  const { currentColor, currentThemeMode } = useAppStyleStateContext();

  /* useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []); */

  return (
    <div className={currentThemeMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4 z-1000">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          <Sidebar />
          <div
            id="mydiv"
            className={
              sidebarActive
                ? "dark:bg-main-dark-bg bg-white min-h-screen md:ml-72 w-full  "
                : "bg-white dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
            style={
              sidebarActive && screenSize > 900
                ? { width: `${screenSize - 288}px` }
                : {}
            }
          >
            <NavbarContextProvider>
              <Navbar />
            </NavbarContextProvider>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
