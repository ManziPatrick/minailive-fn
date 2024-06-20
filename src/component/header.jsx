import React from 'react';
import menuIcon from '../component/Images/playlist_2326138.png'; 
import closeIcon from '../component/Images/close.png';  

const Header = ({ title, isOpen, toggleSidebar }) => {
    return (
        <div className='shadow-md py-6  h-[10vh] pl-4 pr-4 flex justify-between items-center'>
            <div>
                  <h1 className='font-extrabold text-[16px]'>{title}</h1>
            </div>
          
            <div className='checkbtn hidden md:block' onClick={toggleSidebar}>
                <img src={isOpen ? closeIcon : menuIcon} alt="Menu" />
            </div>
              
          
        </div>
    );
}

export default Header;
