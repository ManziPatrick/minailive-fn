import Dashboard from "./component/dashboard";
import Mrz from "../component/mrz.jsx";
import Header from "../component/header";

import { useState } from "react";

function MrzDashbord() {
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
            title="Mrc barcode recognition"
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <Mrz />
        </div>
      </div>
    </div>
  );
}

export default MrzDashbord;
