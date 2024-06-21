import React, { useState } from 'react';
import "./page.css";
import image1 from '../component/Images/10.jpg';
import image3 from '../component/Images/7.jpg';
import image4 from '../component/Images/3 (2).jpg';
import upload from '../assets/lets-icons_upload.png';
import image11 from '../assets/Frame 8.png';
import upload2 from '../assets/lets-icons_upload (1).png';
import camera from '../assets/icon-park-outline_camera-one.png';
import docs from '../assets/fluent_clipboard-edit-20-regular.png';
import { useDropzone } from 'react-dropzone';
import dote1 from '../component/Images/Group.png';

import image2 from '../component/Images/4 (1).jpg';
const Emotion = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [results, setResults] = useState(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleImageClick = (imageSrc) => {
    setUploadedImage(imageSrc);
  };
  const openCamera = () => {
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

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    try {
     
      if (uploadedImage || capturedImage) {
        const file = await dataURLtoFile(uploadedImage || capturedImage, 'image.jpg');
        if (!file) {
          throw new Error('Error converting image to file.');
        }
        formData.append('file', file);

        const response = await fetch('http://191.96.31.183:8080/face_emotion', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setResults(result);
      } else {
        throw new Error('No image selected.');
      }
    } catch (error) {
      console.error('Error submitting images:', error);
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoFile = async (dataurl, filename) => {
    try {
      let blob;

      if (dataurl.startsWith('data:')) {
        const arr = dataurl.split(',');
        if (arr.length < 2) {
          throw new Error('Invalid data URL format');
        }

        const mime = arr[0].match(/:(.*?);/);
        if (!mime || !mime[1]) {
          throw new Error('Invalid MIME type in data URL');
        }

        const type = mime[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        blob = new Blob([u8arr], { type });
      } else {
      
        const response = await fetch(dataurl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data URL: ${response.status} ${response.statusText}`);
        }
        blob = await response.blob();
      }

      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error('Error converting data URL to file:', error);
      return null;
    }
  };

  const renderTable = (data) => {
    if (!data) return null;
  
    if (data.faces && data.faces.length > 0) {
      const face = data.faces[0]; 
  
      return (
        <div className='max-h-[70vh] overflow-y-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Attribute</th>
                <th className="py-2 px-4 bg-gray-200">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(face).map(([key, value]) => (
                <tr key={key} className="bg-gray-100">
                  <td className="py-2 px-4 border">{key}</td>
                  <td className="py-2 px-4 border">{value}</td>
                </tr>
              ))}
              {Object.keys(data)
                .filter((key) => key !== 'faces')
                .map((key) => (
                  <tr key={key} className="bg-gray-100">
                    <td className="py-2 px-4 border">{key}</td>
                    <td className="py-2 px-4 border">{data[key]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    } else {
     
      return (
        <div className="">
          <tr  className="bg-gray-100">
                    <td className="py-2 px-4 border">emotion_result</td>
                    <td className="py-2 px-4 border">{data.emotion_result}</td>
                  </tr>
        </div>
      );
    }
  };
  

  return (
    <div className='flex w-[95%] '>
      <div className=' w-full h-full'>
        <div className='flex ' id=''>
          <div className=' flex flex-col justify-center w-full'>
            <div className=' w-[100%] gap-10 pt-6 pl-4'>
              <div className=' flex justify-around  '>
                <div className=''>
                  <div {...getRootProps()} className='flex items-center border-2 border-orange-200 w-[300px] border-dashed rounded-xl h-[280px]'>
                    <input {...getInputProps()} />
                    {uploadedImage || capturedImage ? (
                      <img src={uploadedImage || capturedImage} alt="Uploaded" className='w-full h-full object-fill rounded-xl' />
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
                      <div onClick={openCamera}><img src={camera} alt="" /></div>
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
                  <img src={image1} alt="image" className=' w-full h-36  object-fill   rounded-lg' onClick={() => handleImageClick(image1)} />
                  <img src={image2} alt="image" className='w-full  h-36 object-fill  rounded-lg' onClick={() => handleImageClick(image2)} />
                  <img src={image3} alt="image" className='w-full h-36 object-fill  rounded-lg' onClick={() => handleImageClick(image3)} />
                  <img src={image4} alt="image" className='w-full h-36 object-fill  rounded-lg'  onClick={() => handleImageClick(image4)}/>
       
                </div>
              </div>
             
            </div>
            <button onClick={handleSubmit} className='bg-orange-500 text-white px-4 w-[80%] self-center mt-2 rounded-[20px] py-2 text-[15px]'>Check your comparisons</button>
            <div className='text-[#00000049] text-center p-5'>
              We offer advanced security solutions with facial recognition, liveness detection, and ID document recognition, seamlessly integrating with your existing systems.
            </div>
          </div>
          <div className='bg-gray-200 mt-4 flex items-center justify-center rounded-xl w-[100%]'>
            <div className="w-[96%] flex flex-col p-4 gap-4 h-[90%]">
              {loading ? (
                <div className='flex flex-col gap-8'>
                  <div className="">
                    <img src={dote1} alt="" />
                  </div>
                  <div className='text-[#FF5000] text-center'>Loading Results....</div>
                </div>
              ) : (
                results ? (
                  <div className="flex flex-col gap-4">
                    <div className='bg-white flex flex-col p-4 gap-4 h-[90%]'>
                      <span className='font-extrabold'>Emotion Results</span>
                     
                      {renderTable(results)}
                      {/* <div className='grid grid-cols-2 gap-x-2'>
                        <img src={results.image1} alt="Result 1" className='w-full object-cover rounded-lg' />
                        
                      </div> */}
                    </div>
                    {/* <div className='bg-white grid grid-cols-2 gap-y-3 p-6'>
                    <div>{results.matchingProbability}</div>
                    <div>{results.matchingProbability}</div>
                      <div>Emotion_result:</div>
                      <div>{results.emotion_result}</div>
                    </div> */}
                  </div>
                ) : (
                  <div className='text-center'>
                    <img src={image1} alt="image" className='pb-4 mx-auto' />
                   
                  </div>
                )
              )}
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
              <button onClick={captureImage} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                Capture Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Emotion;
