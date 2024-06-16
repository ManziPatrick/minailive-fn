import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import image22 from '../assets/Frame 11.png';
import upload from '../assets/lets-icons_upload.png';
import upload2 from '../assets/lets-icons_upload (1).png';
import camera from '../assets/icon-park-outline_camera-one.png';
import docs from '../assets/fluent_clipboard-edit-20-regular.png';
import resulti from "../component/Images/Rectangle 53.png";
import resultl from "../component/Images/Rectangle 50.png";
import cantact from "../component/Images/contact.png";
import imageRes from "../component/Images/Vector (10).png";
import Apimage from "../component/Images/Vector (11).png";

const Idrecognition = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [activeSection, setActiveSection] = useState('extractedData'); // State for active section

  const openCamera2 = () => {
    setShowCamera(true);
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

  const captureImage = () => {
    const video = document.getElementById('camera-preview');
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageUrl);

      closeCamera();
    }
  };

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleTabClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <div className='flex w-full'>
        <div className='w-full'>
          <div {...getRootProps()} className='flex items-center border-2 border-orange-100 w-96 border-dashed rounded-xl h-[280px]'>
            <input {...getInputProps()} />
            {uploadedImage || capturedImage ? (
              <img src={uploadedImage || capturedImage} alt="Image" className='w-full h-full object-cover rounded-xl' />
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
        <div className='bg-gray-200 mt-4 rounded-xl w-[62%]'>
          <nav className='flex justify-around'>
            <div className='flex cursor-pointer' onClick={() => handleTabClick('extractedData')}>
              <img src={cantact} alt="" />
              <span>Extracted Data</span>
            </div>
            
            <div className='flex cursor-pointer' onClick={() => handleTabClick('images')}>
              <img src={imageRes} alt="" />
              <span>Images</span>
            </div>
            <div className='flex cursor-pointer' onClick={() => handleTabClick('apiResponse')}>
              <img src={Apimage} alt="" />
              <span>API Response </span>
            </div>
          </nav>
          
          {activeSection === 'extractedData' && (
            <div className="p-4">
              <div className="bg-white flex flex-col p-4 gap-4 h-[60%]">
                <span className='font-extrabold'>Results</span>
                <button className='bg-[#ff510034] text-left p-4 rounded-lg'>Not Same Person</button>
                <div className='grid grid-cols-2 gap-x-2'>
                  <img src={resulti} alt=" " className='w-full object-cover rounded-lg'/>
                  <img src={resultl} alt="" className='w-full object-cover rounded-lg' />
                </div>
              </div>
              <div className='bg-white grid grid-cols-2 gap-y-3 p-6 mt-4'>
                <div>Matching Probability:</div>
                <div>Very Low</div>
                <div>Confidence Score:</div>
                <div>0.90</div>
              </div>
            </div>
          )}
          
          {activeSection === 'images' && (
            <div className="p-4">
              <div className="bg-white p-4 rounded-lg">
                {/* Add content for Images section */}
                Images Content Here
              </div>
            </div>
          )}
          
          {activeSection === 'apiResponse' && (
            <div className="p-4">
              <div className="bg-white p-4 rounded-lg">
                {/* Add content for API Response section */}
                API Response Content Here
              </div>
            </div>
          )}
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
              <button onClick={captureImage} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                Capture Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Idrecognition;
