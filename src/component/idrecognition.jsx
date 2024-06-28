import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./page.css";
import prev_img1 from "../assets/Images/prev_img1.png";
import img_upload_l from "../assets/Images/upload_large.png";
import img_id_detail from "../assets/Images/id_detail.png";
import img_id from "../assets/Images/id_img.png";
import card1 from "../assets/Images/IDCard/demo1.jpg";
import card2 from "../assets/Images/IDCard/demo2.png";
import card3 from "../assets/Images/IDCard/demo3.png";

const Idrecognition = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("extractedData");
  const [apiResponse, setApiResponse] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [extractedImages, setExtractedImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

      const response = await fetch("http://191.96.31.183:8082/api/id_check", {
        method: "POST",
        body: formData,
      });

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
    const file = uploadedImage;

    if (!file) {
      const existingToastId = toast.isActive("noImageError");

      if (!existingToastId) {
        toast.error("Please upload an image.", {
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
    const excludedKeys = ["MRZ", "MRZ Type", "Images"];

    return Object.entries(data).map(([key, value]) => {
      if (excludedKeys.includes(key)) {
        return null;
      }

      return (
        <div className="  grid grid-cols-1 border" key={key}>
          <span className="px-4  font-bold py-2">{key}</span>
          <span className="px-4 py-2">
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
              className="flex items-center border-2 cursor-pointer border-orange-100 w-full border-dashed rounded-xl h-[280px]"
              onClick={handleUploadClick}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Image"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                  <img src={prev_img1} alt="" />
                  <div>
                    <img src={img_upload_l} alt="" />
                  </div>
                  <h1 className="text-orange-500 text-[18px] font-bold">
                    Drag & Drop image or click to upload
                  </h1>
                </div>
              )}
            </div>
            <div><br></br></div>
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
                  <img src={img_id_detail} alt="" className="h-5 " />
                  <span>Extracted Data</span>
                </div>
                <div
                  className={`flex cursor-pointer gap-4 items-center ${
                    activeSection === "images" ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleTabClick("images")}
                >
                  <img src={img_id} alt="" className="h-4 " />
                  <span>Extracted Image</span>
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
                    <div className="grid grid-cols-2 gap-y-2  gap-x-2">
                      {Object.values(extractedImages).map((item, index) => (
                        <img
                          key={index}
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={`Image ${index}`}
                          className="w-full object-contain h-[250px] rounded-lg"
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No images available</p>
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

export default Idrecognition;
