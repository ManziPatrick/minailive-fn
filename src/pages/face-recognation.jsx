import ImageRComare from "../component/faceComparison";
import Dashboard from "../component/dashboard";
import Header from "../component/header";
import { useState } from "react";

function ImageCompare_Page() {
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
            title="Face Recognition: 1:1, 1:N Matching Algorithm"
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <ImageRComare />
        </div>
      </div>
    </div>
  );
}

export default ImageCompare_Page;
