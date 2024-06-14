
import React, { useState } from 'react';
import "./page.css"
import image1 from '../component/Images/Rectangle 50.png'
import image2 from '../component/Images/Rectangle 47.png'
import upload from '../assets/lets-icons_upload.png'
import image3 from '../component/Images/3.jpeg'
import image11 from '../assets/Frame 8.png'
import image22 from '../assets/Frame 11.png'
import upload2 from '../assets/lets-icons_upload (1).png'
import camera from '../assets/icon-park-outline_camera-one.png'
import docs from '../assets/fluent_clipboard-edit-20-regular.png'
import { useDropzone } from 'react-dropzone';
import dote1 from '../component/Images/Group.png'
import resulti from "../component/Images/Rectangle 53.png"
import resultl from "../component/Images/Rectangle 50.png"


const ImageUpload= () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage1, setCapturedImage1] = useState(null);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const [activeCamera, setActiveCamera] = useState(null);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);}
  const openCamera1 = () => {
    setShowCamera(true);
    setActiveCamera(1);
    const constraints = { video: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const video = document.getElementById('camera-preview');
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch(err => console.error('Error accessing camera:', err));
  };

  const openCamera2 = () => {
    setShowCamera(true);
    setActiveCamera(2);
    const constraints = { video: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const video = document.getElementById('camera-preview');
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch(err => console.error('Error accessing camera:', err));
  };

  const closeCamera = () => {
    setShowCamera(false);
    const video = document.getElementById('camera-preview');
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
  };

  const captureImage1 = () => {
    const video = document.getElementById('camera-preview');
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage1(imageUrl);

      closeCamera();
    }
  };

  const captureImage2 = () => {
    const video = document.getElementById('camera-preview');
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage2(imageUrl);

      closeCamera();
    }
  };

  const onDrop1 = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage1(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const onDrop2 = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage2(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({ onDrop: onDrop1 });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: onDrop2 });

  return (
  
    <div className='flex w-[95%] '>
      <div className=' w-full h-full'>
        <div className='flex ' id=''>
          <div className=' flex flex-col justify-center w-full'>
          <div className=' w-[100%] gap-10 pt-6 pl-4'>
            <div className=' flex justify-around  '>
            <div className=''>
            <div {...getRootProps1()} className='flex items-center border-2 border-orange-200 w-[300px] border-dashed rounded-xl h-[280px]'>
                  <input {...getInputProps1()} />
                  {uploadedImage1 || capturedImage1  ? (
                    <img src={uploadedImage1 || capturedImage1} alt="Uploaded" className='w-full h-full object-cover rounded-xl' />
                  ) : (
                    <div className='text-center flex flex-col items-center justify-center gap-4 w-full'>
                      <img src={image11} alt="" />
                      <div>
                        <img src={upload} alt="" />
                      </div>
                      <h1 className='text-orange-500 text-[18px] font-bold'>Drag & Drop image</h1>
                    </div>
                  )}
                </div>
                <div className='flex justify-center mt-1 w-full'>
                  <div className='flex gap-2 justify-center shadow-lg rounded-sm bg-white w-32 p-4'>
                    <div><img src={upload2} alt="" /></div>
                    <div onClick={openCamera1}><img src={camera} alt="" /></div>
                    <div><img src={docs} alt="" /></div>
                  </div>
                </div>
              </div>
              <div>
                <div {...getRootProps2()} className='flex items-center border-2 border-orange-100 w-[300px] border-dashed rounded-xl h-[280px]'>
                  <input {...getInputProps2()} />
                  {uploadedImage2 || capturedImage2 ? (
      <img src={uploadedImage2 || capturedImage2} alt="Image" className='w-full h-full object-cover rounded-xl' />
    ) : (
                    <div className='text-center flex flex-col items-center justify-center gap-4 w-full'>
                      
                      <img src={image22} alt="" />
                      <div>
                        <img src={upload} alt="" />
                      </div>
                      <h1 className='text-orange-500 text-[18px] font-bold'>Drag & Drop image</h1>
                    </div>
                  )}
                </div>
              
              <div className='flex justify-center mt-1 w-full'>
                <div className='flex gap-2 justify-center bg-white shadow-lg rounded-sm w-32 p-4'>
                  <div><img src={upload2} alt="" /></div>
                  <div onClick={openCamera2}><img src={camera} alt="" /></div>
                  <div><img src={docs} alt="" /></div>
                </div>
              </div>
             </div>
            </div>
            
            
          </div>
    <div className='flex justify-around gap-3 mt-1 px-2'>
            <div className='bg-gray-200 w-4/5 p-2 rounded-lg py-2'>
              <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[100%]  px-2  mb-4'>
                <option value="example">Examples</option>
              </select>
              <div className='grid grid-cols-4  gap-x-2 p-2 gap-y-2'>
                <img src={image1} alt="image" className=' w-full  object-cover   rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image1} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image1} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
              </div>
            </div>
            <div className='bg-gray-200 w-4/5 p-2 rounded-lg py-2'>
              <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[100%]  px-2  mb-4'>
                <option value="example">Examples</option>
              </select>
              <div className='grid grid-cols-4  gap-x-2 p-3 gap-y-2'>
                <img src={image1} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image1} alt="image" className='w-full  object-cover rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image1} alt="image" className='w-full  object-cover  rounded-lg' />
                <img src={image2} alt="image" className='w-full  object-cover  rounded-lg' />
              </div>
            </div>

          </div>
          <div className='text-[#00000049] text-center p-5'>
          We offer advanced security solutions with facial recognition, liveness detection, and ID document recognition, seamlessly integrating with your existing systems.
          </div>
         
          </div>
          <div className='bg-gray-200 mt-4 flex items-center justify-center rounded-xl w-[62%]'>
          {/* {loading ? (
            <div className=' flex flex-col  gap-8'>
             <div className="">
      <img src={dote1} alt="" />
      </div> 
            <div className='text-[#FF5000] text-center'>Loading Results....</div>
            </div>
             ) : (
              <>
                  <div className='text-center'>

<img src={image3} alt="image" className='pb-4 mx-auto' />
<button onClick={handleClick} className='bg-orange-500 text-white px-4 rounded-[20px] py-2 text-[15px]'>Check your comparisons</button>
</div>
              </>
            )} */}
             
             <div className=" w-[90%] flex flex-col p-4  gap-4 h-[90%]">
<div className='bg-white flex flex-col p-4  gap-4 h-[60%]'>
              <span className=' font-extrabold'>Results</span>
              <button className=' bg-[#ff510034] text-left p-4  rounded-lg'>Not Same Person</button>
              <div className='grid grid-cols-2 gap-x-2'>
                <img src={resulti} alt=" "  className='w-full  object-cover  rounded-lg'/>
                <img src={resultl} alt="" className='w-full  object-cover  rounded-lg' />

              </div>
              </div>      
              <div className='bg-white grid grid-cols-2  gap-y-3 p-6'>
                <div>
                Matching Probability:
                </div>

                <div>
                Very Low
                </div>

                <div>
                Confidence Score:
                </div>
                <div>
                0.90
                </div>
              </div>

             </div>
             
      
        <div>
        
        </div>
      </div>
         
        </div>
       
      </div>
      {showCamera && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="relative max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
            <video id="camera-preview" autoPlay className="w-full rounded-lg"></video>
            <div className="absolute top-0 right-0 m-4">
              <button onClick={closeCamera} className="text-gray-200 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mt-4">
              {activeCamera === 1 && ( 
                <button onClick={captureImage1} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Capture Image
                </button>
              )}
              {activeCamera === 2 && (
                <button onClick={captureImage2} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Capture Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      
    </div>
 
  )
}

export default ImageUpload;