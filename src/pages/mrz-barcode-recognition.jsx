

import Dashboard from "../component/dashboard"
import Mrz from "../component/mrz.jsx"
import Header from "../component/header";
function MrzDashbord() {
    return ( 
        <div className="w-[100vw] h-[100vh] overflow-hidden">
        <div className="flex h-full">
            <div className="w-[20%] h-full overflow-hidden">
                <Dashboard />
            </div>
            <div className="w-[80%] flex flex-col h-full overflow-hidden">
            <Header title='Mrc barcode recognition' />
                <Mrz/>
            </div>
        </div>
    </div>
     );
}

export default MrzDashbord;