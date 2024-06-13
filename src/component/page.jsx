
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