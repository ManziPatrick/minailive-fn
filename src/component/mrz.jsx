import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import image22 from "../assets/Frame 11.png";
import upload from "../assets/lets-icons_upload.png";
import upload2 from "../assets/lets-icons_upload (1).png";
import camera from "../assets/icon-park-outline_camera-one.png";
import docs from "../assets/fluent_clipboard-edit-20-regular.png";
import cantact from "../component/Images/contact.png";
import imageRes from "../component/Images/Vector (10).png";
import Apimage from "../component/Images/Vector (11).png";
import card1 from "../component/Images/MRZ_Barcode/demo1.png";
import card2 from "../component/Images/MRZ_Barcode/demo2.png";
import card3 from "../component/Images/MRZ_Barcode/demo3.png";
import "./page.css";
import { toast } from "react-toastify";

const MrcBarcode = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [activeSection, setActiveSection] = useState("extractedData");
  const [apiResponse, setApiResponse] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [extractedImages, setExtractedImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const openCamera2 = () => {
    setShowCamera(true);
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const video = document.getElementById("camera-preview");
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  };

  const closeCamera = () => {
    setShowCamera(false);
    const video = document.getElementById("camera-preview");
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  const captureImage = () => {
    const video = document.getElementById("camera-preview");
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
      }, "image/jpeg");

      closeCamera();
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const sendImageToApi = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://191.96.31.183:8082/api/mrz_barcode_check",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setApiResponse(data);
      setExtractedData(data);
      setExtractedImages(data.Images);
    } catch (error) {
      console.error("Error sending image to API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecognitionClick = () => {
    const file = capturedImage || uploadedImage;
    if (!file) {
      const existingToastId = toast.isActive("noImageError");

      if (!existingToastId) {
        toast.error("Please upload or capture an image.", {
          toastId: "noImageError", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "#FF6347", 
          },
        });
      }
      return;
    }
  
    if (file) {
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => sendImageToApi(blob))
        .catch((err) => console.error("Error fetching the image:", err));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleTabClick = (section) => {
    setActiveSection(section);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageClick = (imageSrc) => {
    setUploadedImage(imageSrc);
  };

  const renderTableData = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (key === "Images") {
        return null;
      }
      return (
        <div className="  grid grid-cols-1 border" key={key}>
          <span className=" px-4  font-bold py-2">{key}</span>
          <span className=" px-4 py-2">
            {typeof value === "object" ? renderTableData(value) : value}
          </span>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="flex w-full">
        <div className="w-full py-8 px-4 flex gap-4 mb-10">
          <div className="w-[40%] flex-col ">
            <div
              {...getRootProps()}
              className="flex items-center border-2 border-orange-100 w-full border-dashed rounded-xl h-[280px]"
              onClick={handleUploadClick}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {uploadedImage || capturedImage ? (
                <img
                  src={uploadedImage || capturedImage}
                  alt="Image"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                  <img src={image22} alt="" />
                  <div>
                    <img src={upload} alt="" />
                  </div>
                  <h1 className="text-orange-500 text-[18px] font-bold">
                    Drag & Drop image or click to upload
                  </h1>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-1 w-full">
              <div className="flex gap-2 justify-center shadow-lg rounded-sm bg-white w-32 p-4">
                <div>
                  <img src={upload2} alt="" />
                </div>
                <div onClick={openCamera2}>
                  <img src={camera} alt="" />
                </div>
                <div>
                  <img src={docs} alt="" />
                </div>
              </div>
            </div>

            <div className="bg-gray-200 w-full p-2 rounded-lg py-2">
              <select
                name="optionid"
                id="optionId"
                className="py-2 bg-white rounded-xl text-sm w-full px-4 mb-4 "
              >
                <option value="idReference">ID References</option>
              </select>
              <div className="grid grid-cols-3 bg-white p-2  gap-x-2 h-32  gap-y-2">
                <img
                  src={card3}
                  alt="image"
                  className="w-full  object-cover h-28 rounded-lg"
                  onClick={() => handleImageClick(card3)}
                />
                <img
                  src={card1}
                  alt="image"
                  className="w-full  object-cover h-28 rounded-lg"
                  onClick={() => handleImageClick(card1)}
                />
                <img
                  src={card2}
                  alt="image"
                  className="w-full  object-cover h-28 rounded-lg"
                  onClick={() => handleImageClick(card2)}
                />
              </div>
            </div>
            <div className="flex justify-center  pt-4">
              <button
                className="bg-orange-500 text-white px-4  w-[80%] self-center rounded-[20px] py-2 text-[15px]"
                onClick={handleRecognitionClick}
                disabled={loading}
              >
                {loading ? "Processing..." : "Id card recognition"}
              </button>
            </div>
            <div className="text-[#00000049] text-center p-5">
              We offer advanced security solutions with facial recognition,
              liveness detection, and ID document recognition, seamlessly
              integrating with your existing systems
            </div>
          </div>
          <div className="bg-gray-200 rounded-xl w-[60%] ">
            <nav>
              <div className="flex flex-wrap justify-around px-4 bg-white h-12 items-center">
                <div
                  className={`flex cursor-pointer gap-4 ${
                    activeSection === "extractedData" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleTabClick("extractedData")}
                >
                  <img src={cantact} alt="" className="h-5 " />
                  <span>Extracted Data</span>
                </div>
                <div
                  className={`flex cursor-pointer gap-4 items-center ${
                    activeSection === "images" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleTabClick("images")}
                >
                  <img src={imageRes} alt="" className="h-4 " />
                  <span>Images</span>
                </div>
              </div>
              <div className=" h-[0.14rem] w-[10.5rem]"></div>
            </nav>

            {activeSection === "extractedData" && (
              <div className="p-4">
                <div className="bg-white p-4 rounded-lg max-h-[70vh] overflow-y-auto">
                  {extractedData ? (
                    <table className="w-full">
                      <tbody>{renderTableData(extractedData)}</tbody>
                    </table>
                  ) : (
                    <div>No extracted data available.</div>
                  )}
                </div>
              </div>
            )}
            {activeSection === "images" && (
              <div className="p-4">
                <div className="bg-white p-4 rounded-lg max-h-[70vh]">
                  {extractedImages ? (
                    <div className="grid grid-cols-2 gap-x-2">
                      {Object.values(extractedImages).map((item, index) => (
                        <img
                          key={index}
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={`Image ${index}`}
                          className="w-full object-contain rounded-lg"
                        />
                      ))}
                    </div>
                  ) : (
                    <div>No images available.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MrcBarcode;
