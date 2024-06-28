import { useState } from "react";
import Dashboard from "../component/dashboard.jsx";
import Header from "../component/header.jsx";
import Facelive from "../component/facelive";

function Facelive_Pages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <div className="flex h-full">
        <div
          className={`md:fixed relative  md:w-[80%] w-[20%] h-full md:transition-transform md:duration-300 md:ease-in-out ${
            sidebarOpen ? "translate-x-0" : "md:-translate-x-full translate-x-0"
          } bg-white shadow-2xl md:z-50 z-auto`}
        >
          <Dashboard />
        </div>
        <div className="flex-1  md:w-[80%] flex flex-col h-full overflow-hidden">
          <Header
            title="3D Face Passive Liveness Detection (Anti-Spoofing)"
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <Facelive />
        </div>
      </div>
    </div>
  );
}

export default Facelive_Pages;
