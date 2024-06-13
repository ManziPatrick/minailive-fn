
import ImageUpload from "../component/page";
import Dashboard from "../component/dashboard"
function ImageDashbord() {
    return ( 
        <>
        <div className=" flex flex-row">
      
          <Dashboard/>  
          <ImageUpload/>
        </div>
        </>
     );
}

export default ImageDashbord;