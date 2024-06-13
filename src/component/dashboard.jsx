import log from "../assets/Rectangle 48.png"

function Dashboard() {
    return ( 
        <>
        <div className=" p-6 h-[100vh] bg-white w-[40%] shadow-2xl border-r-2 border-zinc-600">
<div className=" flex align-middle justify-center"> 
<img src={log}/>
</div>
<div class="relative width-full   dropdown">
      <div>
        <button class="flex justify-between w-full  border-2  border-gray-900 shadow-sm  p-3 bg-[#F5F8FFB2] text-sm font-medium text-gray-700   ">
          Face SDK
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class=" right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Recognition</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Liveness Detaction</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Emotions Recognition</a>
        </div>
      </div>
    </div>
        </div>
        </>
     );
}

export default Dashboard;