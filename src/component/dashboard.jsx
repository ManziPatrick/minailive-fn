import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./page.css";
import log from "../assets/icons/Dashboard/logo.png";
import img_facesdk from "../assets/icons/Dashboard/facesdk.png";
import img_idsdk from "../assets/icons/Dashboard/idsdk.png";
import aboutus from "../assets/icons/Dashboard/about.png";
import img_github from "../assets/icons/Dashboard/github.png";
import img_website from "../assets/icons/Dashboard/website.png";
import img_youtube from "../assets/icons/Dashboard/youtube.png";

function Dashboard() {
  const [faceSDKOpen, setFaceSDKOpen] = useState(true);
  const [idSDKOpen, setIdSDKOpen] = useState(true);
  const [AboutOpen, setAboutOpen] = useState(true);

  return (
    <>
      <div className="p-6 h-[100vh] bg-white w-[100%] shadow-2xl border-r-2 overflow-y-auto">
        <div className="flex align-middle justify-center">
          <img src={log} alt="Logo" />
        </div>

        <div className="relative width-full dropdown">
          <div>
            <button
              className="flex justify-between w-full border-2 border-none shadow-sm p-4 rounded-sm bg-[#F5F8FFB2] text-sm font-medium text-gray-700"
              onClick={() => setFaceSDKOpen(!faceSDKOpen)}
            >
              <div className="flex gap-5 lg:gap-1 flex-row lg:flex-col  align-bottom">
                <img src={img_facesdk} className=" w-6" alt="" />
                <span className="bold">Face SDK</span>
              </div>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {faceSDKOpen && (
            <div
              className="right-0 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <NavLink
                  to="/"
                  className="block px-4 ml-[14%]  py-5 text-sm"
                  activeClassName="active"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Face Recognition
                </NavLink>
                <NavLink
                  to="/face-liveness-detection"
                  className="block px-4 ml-[14%] py-5 text-sm "
                  activeClassName="active "
                  role="menuitem"
                  tabIndex="-1"
                >
                  Face Liveness Detection
                </NavLink>
                <NavLink
                  to="/face-emotions-recognition"
                  className="block px-4 ml-[14%]  py-5 text-sm "
                  activeClassName="active"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Face Emotions Recognition
                </NavLink>
              </div>
            </div>
          )}
        </div>

        <div className="relative width-full mt-2 dropdown">
          <div>
            <button
              className="flex justify-between w-full border-2 border-none shadow-sm p-4 rounded-sm bg-white text-sm font-medium text-gray-700"
              onClick={() => setIdSDKOpen(!idSDKOpen)}
            >
              <div className="flex gap-5 lg:gap-1 flex-row lg:flex-col align-bottom">
                <img src={img_idsdk} alt="" />
                <span className="bold">ID SDK</span>
              </div>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {idSDKOpen && (
            <div
              className="right-0 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <NavLink
                  to="/id-card"
                  className="block ml-[14%]  px-4 py-5 text-sm "
                  activeClassName="active"
                  role="menuitem"
                  tabIndex="-1"
                >
                  ID Document Recognition
                </NavLink>
                <NavLink
                  to="/credit-card-recognition"
                  className="block ml-[14%]  px-4 py-5 text-sm "
                  activeClassName="active"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Bank/Credit Recognition
                </NavLink>
                <NavLink
                  to="/mrz-barcode-recognition"
                  className="block ml-[14%]  px-4 py-5 text-sm "
                  activeClassName="active"
                  role="menuitem"
                  tabIndex="-1"
                >
                  MRZ/Barcode Recognition
                </NavLink>
              </div>
            </div>
          )}
        </div>

        <div className="relative width-full mt-2 dropdown">
          <div>
            <button
              className="flex justify-between w-full border-2 border-none shadow-sm p-4 rounded-sm bg-white text-sm font-medium text-gray-700"
              onClick={() => setAboutOpen(!AboutOpen)}
            >
              <div className="flex gap-5 lg:gap-1 flex-row lg:flex-col align-bottom">
                <img src={aboutus} alt="" className="w-8 h-6" />
                <span className="bold">About</span>
              </div>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {AboutOpen && (
  <div
    className="right-0 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabIndex="-1"
  >
 {AboutOpen && (
  <div
    className="right-0 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabIndex="-1"
  >
    <div className="py-1" role="none">
      <NavLink
        to="https://miniai.live/"
        className="flex items-center ml-[10%] px-4 py-2 text-sm h-12"
        activeClassName="active"
        role="menuitem"
        tabIndex="-1"
        target="_blank"
      >
        <img src={img_website} alt="" className="w-8 mr-4" />
        <span className="text-left">Visit MiniAiLive</span>
      </NavLink>
      <NavLink
        to="https://github.com/MiniAiLive"
        className="flex items-center ml-[10%] px-4 py-2 text-sm h-12"
        activeClassName="active"
        role="menuitem"
        tabIndex="-1"
        target="_blank"
      >
        <img src={img_github} alt="" className="w-8 mr-4" />
        <span className="text-left">Visit GitHub Repo</span>
      </NavLink>
      <NavLink
        to="https://www.youtube.com/@miniailive"
        className="flex items-center ml-[10%] px-4 py-2 text-sm h-12"
        activeClassName="active"
        role="menuitem"
        tabIndex="-1"
        target="_blank"
      >
        <img src={img_youtube} alt="" className="w-8 mr-4" />
        <span className="text-left">See Youtube Channel</span>
      </NavLink>
    </div>
  </div>
)}

  </div>
)}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
