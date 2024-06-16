import React from 'react';

const Header = ({ title }) => {
    return (
        <div className='shadow-md py-6 w-[100vw] h-[10vh] pl-4 text-[14px] items-center'>
            <h1 className='font-extrabold text-[16px]'>{title}</h1>
        </div>
    );
}

export default Header;
