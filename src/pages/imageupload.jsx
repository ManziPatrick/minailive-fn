
import ImageUpload from "../component/page";
import Dashboard from "../component/dashboard"
import Header from "../component/header";
function ImageDashbord() {
    return ( 
        <div className="w-[100vw] h-[100vh] overflow-hidden">
        <div className="flex h-full">
            <div className="w-[20%] h-full overflow-hidden">
                <Dashboard />
            </div>
            <div className="w-[80%] flex flex-col h-full overflow-hidden">
                <Header />
                <ImageUpload />
            </div>
        </div>
    </div>
     );
}

export default ImageDashbord;