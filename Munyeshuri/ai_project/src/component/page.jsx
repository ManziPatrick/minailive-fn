
import React, { useState } from 'react';
import "./page.css"
import image1 from '../component/Images/1.webp'
import image2 from '../component/Images/2.jpeg'
import image3 from '../component/Images/3.jpeg'
const ImageUpload= () => {

  return (
   <>
   <div className='grid  w-full' id='container' >
   <div class="flex justify-center items-center w-full">
    <div class="relative inline-block  dropdown">
      <div>
        <button class="flex justify-between w-full  shadow-sm  py-2 bg-gray-200 text-sm font-medium text-gray-700   ">
          Face SDK
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Recognition</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Liveness Detaction</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Face Emotions Recognition</a>
        </div>
      </div>
    </div>
  </div>
    <div className=' '>
      <div className='shadow-md h-10 pl-4 text-[14px] items-center flex'>
       <h1 className=''>Face Recognition</h1>
      </div>
      <div className='grid ' id='sides'>
      <div>
      <div className='flex gap-6 pt-6 pl-4'>
       <div className='border-2 border-orange-200 w-[200px] h-[250px] border-dashed rounded-xl ' >
        <h1 className='text-orange-500 text-[15px]'>Image 1</h1>
        <h1>Drag & Drop image</h1>
       </div>
       <div className='border-2 border-orange-200 w-[200px] h-[250px] border-dashed rounded-xl'>
        <h1 className='text-orange-500 text-[15px]'> Image 1</h1>
        <h1>Drag & Drop image</h1>
       </div>
       
      </div>
      <div className='flex justify-between bg-gray-200 border-4'>
       <div className='border-2'>
        <select name="option" id="option" className='px-10 py-2 bg-white   '>
          <option value="example">Examples</option>
        </select>
       </div>
       <div className='border-2 '>
        <select name="option" id="option" className='px-10 py-2 bg-white rounded-lg'>
          <option value="example" className='text-[14px]'>Examples</option>
        </select>
       </div>
      </div>
      </div>
      <div className='bg-gray-200 flex items-center  '>
        <div >
        <img src={image3} alt="image"  className='pl-10 pb-16'/>
        <button className='bg-orange-500 text-white px-4 rounded-[20px] py-2 ml-10 text-[15px] '>Check your compairings</button>
        </div>
      </div> 
    </div>
    </div>
   </div>
   </>
  
  )
}

export default ImageUpload;