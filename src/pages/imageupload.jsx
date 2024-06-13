
import ImageUpload from "../component/page";
import Dashboard from "../component/dashboard"
import Header from "../component/header";
function ImageDashbord() {
    return ( 
        <>
        <div className=" flex  w-full">
      
          <Dashboard/> 
          <div className="w-[60%]">
            <Header/>
            <ImageUpload/>
            </div> 
          
        </div>
        </>
     );
}

export default ImageDashbord;