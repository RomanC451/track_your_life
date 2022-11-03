import React from "react";

import { AiOutlineMenu, AiFillCustomerService } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "~/data/avatar.jpg";
import {
  Cart,
  Chat,
  Notification,
  UserProfile,
  MusicPlayer,
} from "./navbar_components";

import { useNavbarStateContext } from "~/contexts/NavbarContextProvider";
import { useAppGeneralStateContext } from "~/contexts/AppGeneralContextProvider";
import { MusicPlayerContextProvider } from "~/contexts/MusicPlayerContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { navbarState, handleClick } = useNavbarStateContext();
  const { setSidebarActive } = useAppGeneralStateContext();

  return (
    <div className="static  dark:bg-main-dark-bg navbar w-full ">
      <div className="flex justify-between p-2 md:mx-6 relative">
        <div className="flex">
          <NavButton
            title="Menu"
            customFunc={() =>
              setSidebarActive((prevSidebarActive) => !prevSidebarActive)
            }
            color="blue"
            icon={<AiOutlineMenu />}
          />
          <NavButton
            title="Music Player"
            customFunc={() => handleClick("musicPlayer")}
            color="blue"
            icon={<AiFillCustomerService />}
          />
        </div>
        <div className="flex">
          <NavButton
            title="Cart"
            customFunc={() => handleClick("cart")}
            color="blue"
            icon={<FiShoppingCart />}
          />
          <NavButton
            title="Chat"
            dotColor="#03C9D7"
            customFunc={() => handleClick("chat")}
            color="blue"
            icon={<BsChatLeft />}
          />
          <NavButton
            title="Notification"
            dotColor="#03C9D7"
            customFunc={() => handleClick("notification")}
            color="blue"
            icon={<RiNotification3Line />}
          />
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className=" flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => {
                handleClick("userProfile");
              }}
            >
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="avatar"
              ></img>
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text 14">
                  Michael
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
          {navbarState.cart && <Cart />}
          {navbarState.chat && <Chat />}
          {navbarState.notification && <Notification />}
          {navbarState.userProfile && <UserProfile />}

          <MusicPlayerContextProvider>
            {navbarState.musicPlayer && <MusicPlayer />}
          </MusicPlayerContextProvider>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
