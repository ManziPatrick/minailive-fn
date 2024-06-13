import log from "../assets/Rectangle 48.png"
import profile from "../assets/Vector (8).png"
import card from "../assets/Vector (9).png"

function Dashboard() {
    return ( 
        <>
        <div className=" p-6 h-[100vh] bg-white w-[40%] shadow-2xl border-r-2 ">
<div className=" flex align-middle justify-center"> 
<img src={log}/>
</div>
<div class="relative width-full   dropdown">
      <div>
        <button class="flex justify-between w-full   border-2  border-none shadow-sm  p-4 rounded-sm bg-[#F5F8FFB2] text-sm font-medium text-gray-700   ">
            <div className=" flex gap-5 flex-row align-bottom"> <img src={profile} alt="" /><span className="bold">Face SDK</span></div>
            
          
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class=" right-0 mt-2 w-full rounded-md  bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <a href="#" class="text-[#FF5000] border-l-4 border-[#FF5000] block  bg-[#FF50000A]  px-4 py-5 text-sm" role="menuitem" tabindex="-1">Face Recognition</a>
          <a href="#" class="text-[#7E7E7EE5] block px-4 py-5  text-sm" role="menuitem" tabindex="-1">Face Liveness Detection</a>
          <a href="#" class="text-[#7E7E7EE5] block px-4 py-5  text-sm" role="menuitem" tabindex="-1">Face Emotions Recognition</a>
        </div>
      </div>
    </div>


    <div class="relative width-full mt-2   dropdown">
      <div>
        <button class="flex justify-between w-full   border-2  border-none shadow-sm  p-4 rounded-sm bg-white text-sm font-medium text-gray-700   ">
            <div className=" flex gap-5 flex-row align-bottom"> <img src={card} alt="" /><span className="bold">ID SDK</span></div>
            
          
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class=" right-0 mt-2 w-full rounded-md  bg-white ring-1 ring-black ring-opacity-0 focus:outline-none dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <a href="#" class="text-[#7E7E7EE5]  block    px-4 py-5 text-sm" role="menuitem" tabindex="-1">ID Card Recognition</a>
          <a href="#" class="text-[#7E7E7EE5] block px-4 py-5  text-sm" role="menuitem" tabindex="-1">Credit Card Recognition</a>
          <a href="#" class="text-[#7E7E7EE5] block px-4 py-5  text-sm" role="menuitem" tabindex="-1">MRz/Barcode Recognition</a>
        </div>
      </div>
    </div>
        </div>
        </>
     );
}

export default Dashboard;