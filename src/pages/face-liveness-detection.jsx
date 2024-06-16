
import Dashboard from "../component/dashboard"
import Facelive from "../component/facelive.jsx"
import Header from "../component/header";
function FaceliveDashbord() {
    return ( 
        <div className="w-[100vw] h-[100vh] overflow-hidden">
        <div className="flex h-full">
            <div className="w-[20%] h-full overflow-hidden">
                <Dashboard />
            </div>
            <div className="w-[80%] flex flex-col h-full overflow-hidden">
            <Header title='Face liveness detection' />
                <Facelive/>
            </div>
        </div>
    </div>
     );
}

export default FaceliveDashbord;