
import React, { useState } from 'react';
import "./page.css"
import image1 from '../component/Images/1.webp'
import image2 from '../component/Images/2.jpeg'
import upload from '../assets/lets-icons_upload.png'
import image3 from '../component/Images/3.jpeg'
import image11 from '../assets/Frame 8.png'
import image22 from '../assets/Frame 11.png'
import upload2 from '../assets/lets-icons_upload (1).png'
import camera from '../assets/icon-park-outline_camera-one.png'
import docs from '../assets/fluent_clipboard-edit-20-regular.png'

const ImageUpload= () => {

  return (
  
    <div className='flex w-full h-screen'>
      <div className=' w-full h-full'>
        <div className='grid w-full mx-auto' id='sides'>
          <div className='flex gap-6 pt-6 pl-4'>
            <div>
              <div className='flex items-center border-2 border-orange-200 w-[300px] border-dashed rounded-xl h-[350px]'>
                <div className='text-center flex flex-col items-center justify-center gap-4 w-full'>
                  <img src={image11} alt="" />
                  <div>
                    <img src={upload} alt="" />
                  </div>
                  <h1 className='text-orange-500 text-[18px] font-bold'>Drag & Drop image</h1>
                </div>
              </div>
              <div className='flex justify-center mt-3 w-full'>
                <div className='flex gap-2 justify-center shadow-lg rounded-sm bg-white w-32 p-4'>
                  <div><img src={upload2} alt="" /></div>
                  <div><img src={camera} alt="" /></div>
                  <div><img src={docs} alt="" /></div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex items-center border-2 border-orange-100 w-[300px] border-dashed rounded-xl h-[350px]'>
                <div className='text-center flex flex-col items-center justify-center gap-4 w-full'>
                  <img src={image22} alt="" />
                  <div>
                    <img src={upload} alt="" />
                  </div>
                  <h1 className='text-orange-500 text-[18px] font-bold'>Drag & Drop image</h1>
                </div>
              </div>
              <div className='flex justify-center mt-3 w-full'>
                <div className='flex gap-2 justify-center bg-white shadow-lg rounded-sm w-32 p-4'>
                  <div><img src={upload2} alt="" /></div>
                  <div><img src={camera} alt="" /></div>
                  <div><img src={docs} alt="" /></div>
                </div>
              </div>
              <div className='flex justify-between mt-4 px-2'>
            <div className='bg-gray-200 w-[245px] rounded-lg py-2'>
              <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[228px] pl-2 mx-2 mb-4'>
                <option value="example">Examples</option>
              </select>
              <div className='flex flex-wrap'>
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
              </div>
            </div>
            <div className='bg-gray-200 w-[245px] rounded-lg py-2'>
              <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[228px] pl-2 mx-2 mb-4'>
                <option value="example">Examples</option>
              </select>
              <div className='flex flex-wrap'>
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image1} alt="image" className='h-12 w-12 m-1 rounded-lg' />
                <img src={image2} alt="image" className='h-12 w-12 m-1 rounded-lg' />
              </div>
            </div>
          </div>
            </div>
            
          </div>
 <div className='bg-gray-200 flex items-center justify-center rounded-xl w-1/4'>
        <div className='text-center'>
          <img src={image3} alt="image" className='pb-4 mx-auto' />
          <button className='bg-orange-500 text-white px-4 rounded-[20px] py-2 text-[15px]'>Check your comparisons</button>
        </div>
      </div>
         
        </div>
       
      </div>

      
    </div>
 
  )
}

export default ImageUpload;