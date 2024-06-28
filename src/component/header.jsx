import React from "react";
import menuIcon from "../assets/icons/header/list.png";
import closeIcon from "../assets/icons/header/close.png";

const Header = ({ title, isOpen, toggleSidebar }) => {
  return (
    <div className="shadow-md py-6  h-[10vh] pl-4 pr-4 flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-[20px]">{title}</h1>
      </div>

      <div className="checkbtn hidden md:block" onClick={toggleSidebar}>
        <img src={isOpen ? closeIcon : menuIcon} alt="Menu" />
      </div>
    </div>
  );
};

export default Header;
