
import ImageUpload from "../component/page";
import ImageDash from "../component/idrecognition"
import Dashboard from "../component/dashboard"
import Header from "../component/header";
function IdCard() {
    return ( 
        <div className="w-[100vw] h-[100vh] overflow-hidden">
        <div className="flex h-full">
            <div className="w-[20%] h-full overflow-hidden">
                <Dashboard />
            </div>
            <div className="w-[80%] flex flex-col h-full overflow-hidden">
                <Header />
                <ImageDash/>
            </div>
        </div>
    </div>
     );
}

export default IdCard;