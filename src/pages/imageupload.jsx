
import ImageUpload from "../component/page";
import Dashboard from "../component/dashboard"
import Header from "../component/header";
function ImageDashbord() {
    return ( 
        <>
 <div className="flex  h-screen w-[100vw]">
      <div className="w-[30%]">
        <Dashboard />
      </div>
      <div className="w-[70%] flex flex-col">
        <Header />
        <ImageUpload />
      </div>
    </div>
        </>
     );
}

export default ImageDashbord;