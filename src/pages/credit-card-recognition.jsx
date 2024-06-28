import Dashboard from "../component/dashboard";
import CreditCard from "../component/creditcard";
import Header from "../component/header";

import { useState } from "react";

function CreditCard_Pages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-[100vw] h-[100vh] md:h-[100%] overflow-hidden">
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
            title="Bank & Credit Card Recognition"
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <CreditCard />
        </div>
      </div>
    </div>
  );
}

export default CreditCard_Pages;
