import React, { useState } from 'react';
import "./page.css";
import image1 from '../component/Images/1 (1).jpg';
import image2 from '../component/Images/2 (1).jpg';
import image4 from '../component/Images/3 (1).jpg';
import image5 from '../component/Images/5.jpg';
import image6 from '../component/Images/6.jpg';
import image7 from '../component/Images/7.jpg';
import image8 from '../component/Images/8.jpg';
import image9 from '../component/Images/9.jpg';
import upload from '../assets/lets-icons_upload.png';
import image3 from '../component/Images/5.jpg';
import image11 from '../assets/Frame 8.png';
import image22 from '../assets/Frame 11.png';
import upload2 from '../assets/lets-icons_upload (1).png';
import camera from '../assets/icon-park-outline_camera-one.png';
import docs from '../assets/fluent_clipboard-edit-20-regular.png';
import { useDropzone } from 'react-dropzone';
import dote1 from '../component/Images/Group.png';

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage1, setCapturedImage1] = useState(null);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const [activeCamera, setActiveCamera] = useState(null);
  const [results, setResults] = useState(null);

  

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
  const handleImageClick = (imageSrc) => {
    setUploadedImage1(imageSrc);
  };
  const handleImageClick2 = (imageSrc) => {
    setUploadedImage2(imageSrc);
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
  const handleSubmit = async () => {
    setLoading(true);
    

    let file1 = null;
    if (uploadedImage1 || capturedImage1) {
      try {
        file1 = await dataURLtoFile(uploadedImage1 || capturedImage1, 'image1.jpg');
        if (!file1) {
          console.error('Error converting image1 to file.');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error converting image1 to file:', error);
        setLoading(false);
        return;
      }
    } else {
      console.error('No image1 or captured image1 found.');
      setLoading(false);
      return;
    }

    let file2 = null;
    if (uploadedImage2 || capturedImage2) {
      try {
        file2 = await dataURLtoFile(uploadedImage2 || capturedImage2, 'image2.jpg');
        if (!file2) {
          console.error('Error converting image2 to file.');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error converting image2 to file:', error);
        setLoading(false);
        return;
      }
    } else {
      console.error('No image2 or captured image2 found.');
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
  
    try {
      const response = await fetch('http://191.96.31.183:8080/face_compare', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.face1 === null || result.face2 === null) {
        console.log('No face detected in one or both images.');
    
      } else {
        setResults(result);
      }
      
    } catch (error) {
      console.error('Error submitting images:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const dataURLtoFile = (dataurl, filename) => {
    
    if (dataurl.startsWith('data:')) {
      const arr = dataurl.split(',');
      if (arr.length < 2) {
        console.error('Invalid data URL format:', dataurl);
        return null;
      }
      
      const mime = arr[0].match(/:(.*?);/);
      if (!mime || !mime[1]) {
        console.error('Invalid MIME type in data URL:', dataurl);
        return null;
      }
      
      const type = mime[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type });
    } else {
      
      return fetch(dataurl)
        .then(response => response.blob())
        .then(blob => new File([blob], filename));
    }
  };
  
  
  

  
  const renderTable = (data) => {
    if (!data) return null;
  
    const { compare_result, compare_similarity } = data;
  
    return (
      <div className='max-h-[70vh] overflow-y-auto'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='py-2 px-4 bg-gray-200'>Key</th>
              <th className='py-2 px-4 bg-gray-200'>Value</th>
            </tr>
          </thead>
          <tbody>
            
            <tr className='bg-gray-100'>
              <td className='py-2 px-4 border font-extrabold'>compare_result</td>
              <td className='py-2 px-4 border'>{compare_result}</td>
            </tr>
  
            
            <tr className='bg-gray-100'>
              <td className='py-2 px-4 border font-extrabold'>compare_similarity</td>
              <td className='py-2 px-4 border'>{compare_similarity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className='flex w-[98%] '>
      <div className=' w-full h-full'>
        <div className='flex ' id=''>
          <div className=' flex flex-col justify-center w-full'>
            <div className=' w-[100%] gap-10 pt-6 pl-4'>
              <div className=' flex justify-around  '>
                <div className=''>
                  <div {...getRootProps1()} className='flex items-center border-2 border-orange-200 w-[300px] border-dashed rounded-xl h-[280px]'>
                    <input {...getInputProps1()} />
                    {uploadedImage1 || capturedImage1 ? (
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
                {[image1, image2, image3, image4].map((img, index) => (
              <div
                key={index}
                className='border rounded-lg overflow-hidden shadow-md cursor-pointer'
                onClick={() => handleImageClick(img)}
              >
                <img src={img} alt={`Image ${index + 1}`} className='h-32 w-32 object-cover' />
              </div>
            ))}
                </div>
              </div>
              <div className='bg-gray-200 w-4/5 p-2 rounded-lg py-2'>
                <select name="option" id="option" className='py-2 bg-white rounded-xl text-[15px] w-[100%]  px-2  mb-4'>
                  <option value="example">Examples</option>
                </select>
                <div className='grid grid-cols-4  gap-x-2 p-3 gap-y-2'>
                {[ image6, image7, image8, image9].map((img, index) => (
              <div
                key={index=5}
                className='border rounded-lg overflow-hidden shadow-md cursor-pointer'
                onClick={() => handleImageClick2(img)}
              >
                <img src={img} alt={`Image ${index + 1}`} className='h-32 w-32 object-cover' />
              </div>
            ))}
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} className='bg-orange-500 text-white px-4 rounded-[20px] py-2 w-[80%] self-center mt-2 text-[15px]'> {loading ? 'Processing...' : 'Check your comparisons'}</button>
            <div className='text-[#00000049] text-center p-5'>
              We offer advanced security solutions with facial recognition, liveness detection, and ID document recognition, seamlessly integrating with your existing systems.
            </div>
          </div>
          <div className='bg-gray-200  flex items-center mt-5 justify-center rounded-xl w-[100%]'>
            <div className="w-[100%] flex flex-col p-4 gap-4 h-[100%]">
              {loading ? (
                <div className='flex flex-col align-middle justify-center '>
                  <div className="flex justify-center ">
                    <img src={dote1} alt="" className='align-middle' />
                  </div>
                  <div className='text-[#FF5000] text-center'>Loading Results....</div>
                </div>
              ) : (
                results ? (
                 
                    <div className='mt-2'>
                      <h2 className='text-xl  py-4 font-bold'>Comparison Results</h2>
                      <div className='grid grid-cols-2'>
                        <div className='w-full h-[280px]'>
                         <img src={uploadedImage1 || capturedImage1} alt="Uploaded" className='  object-cover h-[280px] w-full  object-center rounded-xl' />
                         </div>
                         <div className='w-full h-[280px] '>
                         <img src={uploadedImage2 || capturedImage2} alt="Image" className=' object-cover h-[280px] w-full rounded-xl' />
                         </div>
                         </div>
                      
                      
                      <div>{renderTable(results)}</div>
                    </div>
                
                ) : (
                  <div className='text-center'>
                    <img src={image3} alt="image" className='pb-4 mx-auto' />
                    
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
