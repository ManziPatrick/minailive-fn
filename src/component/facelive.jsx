import React, { useEffect, useState } from 'react';
import "./page.css";
import image2 from '../component/Images/liveness/f_real_andr.jpg';
import image1 from '../component/Images/liveness/f_fake_andr_outline3d.jpg';
import image3 from '../component/Images/liveness/f_fake_andr_outline.jpg';
import image4 from '../component/Images/liveness/f_fake_andr_monitor.jpg';
import upload from '../assets/lets-icons_upload.png';
import image11 from '../assets/Frame 8.png';
import upload2 from '../assets/lets-icons_upload (1).png';
import camera from '../assets/icon-park-outline_camera-one.png';
import docs from '../assets/fluent_clipboard-edit-20-regular.png';
import { useDropzone } from 'react-dropzone';
import dote1 from '../component/Images/Group.png';


const Facelive = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [results, setResults] = useState(null);
  const [livenessImage1, setLivenessImage1] = useState(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  const openCamera = () => {
    setShowCamera(true);
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const video = document.getElementById('camera-preview');
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing camera:', err));
  };

  const closeCamera = () => {
    setShowCamera(false);
    const video = document.getElementById('camera-preview');
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
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

  const handleImageClick = (imageSrc) => {
    setUploadedImage(imageSrc);
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

    try {
      const file = await dataURLtoFile(uploadedImage || capturedImage, 'image.jpg');
      if (!file) {
        console.error('Error converting image to file.');
        setLoading(false);
        return;
      }
      setLivenessImage1(uploadedImage || capturedImage)
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://191.96.31.183:8080/face_liveness_check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResults(result);
      setLivenessImage1(uploadedImage || capturedImage); // Update livenessImage1 state

    } catch (error) {
      console.error('Error submitting image:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('livenessImage1:', livenessImage1);
console.log('results:', results);


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
      throw error;
    }
  };

  
  const FaceResult = ({ results, image }) => {
    const [croppedImage, setCroppedImage] = useState(null);
  
    useEffect(() => {
      if (results && results.faces && results.faces.length > 0) {
        const face = results.faces[0]; 
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
  
        img.onload = () => {
          const faceWidth = face.x2 - face.x1;
          const faceHeight = face.y2 - face.y1;
          canvas.width = faceWidth;
          canvas.height = faceHeight;
          ctx.drawImage(img, face.x1, face.y1, faceWidth, faceHeight, 0, 0, faceWidth, faceHeight);
  
         
          const croppedImageUrl = canvas.toDataURL();
          setCroppedImage(croppedImageUrl);
        };
      }
    }, [results, image]);
  
    return (
      <div className="flex flex-col gap-4">
               <div className="grid grid-cols-4 gap-4  gap-y-4 mt-4">
               <div className="flex flex-col ">
            <span className="font-bold text-center">FaceID</span>
            <span className='text-center'>{results.face_state[0].FaceID}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-center">Age</span>
            <span className='text-center'>{results.face_state[0].Age}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold text-center ">Gender</span>
            <span className='text-center'>{results.face_state[0].Gender}</span>
          </div>
          <div className="flex  flex-col">
            <span className="font-bold text-center">LivenessCheck</span>
            <span className='text-center'>{results.face_state[0].LivenessCheck}</span>
          </div>
        </div>

        {croppedImage && (
          <div className='bg-white flex flex-col p-4 gap-4'>
            <span className='font-extrabold'>Cropped Face</span>
            <img
              src={croppedImage}
              alt={`Cropped Face`}
              className='w-full h-auto object-cover rounded-lg'
            />
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className='flex w-[95%]'>
      <div className='w-full h-full'>
        <div className='flex'>
          <div className='flex flex-col w-full'>
            <div className='w-[100%] gap-10 pt-6 pl-4'>
              <div className='flex justify-around'>
                <div>
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
                <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[100%] px-2 mb-4'>
                  <option value="example">Examples</option>
                </select>
                <div className='grid grid-cols-4 gap-x-2 p-2 gap-y-2'>
                  <img src={image1} alt="image" className='w-full h-36 object-cover rounded-lg' onClick={() => handleImageClick(image1)} />
                  <img src={image2} alt="image" className='w-full h-36 object-cover rounded-lg' onClick={() => handleImageClick(image2)} />
                  <img src={image3} alt="image" className='w-full h-36 object-cover rounded-lg' onClick={() => handleImageClick(image3)} />
                  <img src={image4} alt="image" className='w-full h-36 object-cover rounded-lg' onClick={() => handleImageClick(image4)} />
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} className='bg-orange-500 text-white px-4 rounded-[20px] text-[15px] w-[80%] self-center py-2 mt-4'>
              {loading ? 'Processing...' : 'Check your comparisons'}
            </button>
            <div className='text-[#00000049] text-center p-5'>
              We offer advanced security solutions with facial recognition, liveness detection, and ID document recognition, seamlessly integrating with your existing systems.
            </div>
          </div>
          <div className='bg-gray-200 mt-4 flex items-center justify-center rounded-xl w-[100%]'>
            <div className="w-[90%] flex flex-col p-4 gap-4 h-[100%]">
              {loading ? (
                <div className='flex flex-col gap-8'>
                  <div>
                    <img src={dote1} alt="" />
                  </div>
                  <div className='text-[#FF5000] text-center'>Loading Results....</div>
                </div>
              ) : (
                
                <div>
                {results && livenessImage1 ? (
                  <div className="flex flex-col h-[80%] ">
                    <div className='bg-white flex flex-col p-4  '>
                      <span className='font-extrabold'>Results</span>
                      <FaceResult results={results} image={livenessImage1} />
                    
                    </div>
                  </div>
                ) : (
                  <div className='text-center'>
                    <img src={image1} alt="image" className='pb-4 mx-auto' />
                  </div>
                )}
              </div>
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
  );
};

export default Facelive;
