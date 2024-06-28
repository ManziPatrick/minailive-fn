import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./page.css";
import image1 from "../assets/Images/Liveness/f_real_andr.jpg";
import image2 from "../assets/Images/Liveness/f_fake_andr_outline3d.jpg";
import image3 from "../assets/Images/Liveness/f_fake_andr_outline.jpg";
import image4 from "../assets/Images/Liveness/f_fake_andr_monitor.jpg";
import prev_img1 from "../assets/Images/prev_img1.png";
import img_upload_l from "../assets/Images/upload_large.png";
import loading_gif from "../assets/Images/loading.gif";


const Facelive = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [results, setResults] = useState(null);
  const [livenessImage, setLivenessImage] = useState(null);

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
    
    const formData = new FormData();
    try {
      const file = await dataURLtoFile(
        uploadedImage,
        "image.jpg"
      );
      if (!file) {
        const existingToastId = toast.isActive("noImageError");
        if (!existingToastId) {
          toast.error("Please upload an image.", {
            toastId: "noImageError",
            style: {
              backgroundColor: "#FF6347", 
              color: "#FFFFFF",
            },
          });
        }
        setLoading(false);
        return;
      }
    
      setLivenessImage(uploadedImage);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://191.96.31.183:8080/face_liveness_check",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResults(result);
      setLivenessImage(uploadedImage);
    } catch (error) {
      console.error("Error submitting image:", error);
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
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoFile = async (dataurl, filename) => {
    try {
      let blob;

      if (dataurl.startsWith("data:")) {
        const arr = dataurl.split(",");
        if (arr.length < 2) {
          throw new Error("Invalid data URL format");
        }

        const mime = arr[0].match(/:(.*?);/);
        if (!mime || !mime[1]) {
          throw new Error("Invalid MIME type in data URL");
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
          throw new Error(
            `Failed to fetch data URL: ${response.status} ${response.statusText}`
          );
        }
        blob = await response.blob();
      }

      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Error converting data URL to file:", error);
      throw error;
    }
  };

  const FaceResult = ({ results, image }) => {
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
      if (results && results.faces && results.faces.length > 0) {
        const face = results.faces[0];
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = image;

        img.onload = () => {
          const faceWidth = face.x2 - face.x1;
          const faceHeight = face.y2 - face.y1;
          canvas.width = faceWidth;
          canvas.height = faceHeight;
          ctx.drawImage(
            img,
            face.x1,
            face.y1,
            faceWidth,
            faceHeight,
            0,
            0,
            faceWidth,
            faceHeight
          );

          const croppedImageUrl = canvas.toDataURL();
          setCroppedImage(croppedImageUrl);
        };
      }
    }, [results, image]);

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4  gap-y-2 mt-4">
          <div className="flex flex-col ">
            <span className="font-bold text-center">FaceID</span>
            <span className="text-center">{results.face_state[0].FaceID}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-center">Age</span>
            <span className="text-center">{results.face_state[0].Age}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center ">Gender</span>
            <span className="text-center">{results.face_state[0].Gender}</span>
          </div>
          <div className="flex  flex-col">
            <span className="font-bold text-center">LivenessCheck</span>
            <span className="text-center">
              {results.face_state[0].LivenessCheck}
            </span>
          </div>
        </div>

        {croppedImage && (
          <div className="bg-white flex flex-col p-4 gap-4">
            <span className="font-extrabold">Cropped Face</span>
            <img
              src={croppedImage}
              alt={`Cropped Face`}
              className="w-3/4 h-3/4 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-[95%]">
      <div className="w-full h-full">
        <div className="flex">
          <div className="flex flex-col justify-center w-full">
            <div className="w-[100%] gap-10 pt-6 pl-4">
              <div className="flex justify-around">
                <div>
                  <div
                    {...getRootProps()}
                    className="flex items-center border-2 border-orange-200 cursor-pointer w-[300px] border-dashed rounded-xl h-[280px]"
                  >
                    <input {...getInputProps()} />
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-fill rounded-xl"
                      />
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                        <img src={prev_img1} alt="" />
                        <div>
                          <img src={img_upload_l} alt="" />
                        </div>
                        <h1 className="text-orange-500 text-[18px] font-bold">
                          Drag & Drop image
                        </h1>
                      </div>
                    )}
                  </div>
                  <div><br></br></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-3 mt-1 px-2">
              <div className="bg-gray-200 w-4/5 p-2 rounded-lg py-2">
                <select
                  name="option"
                  id="option"
                  className="py-2 bg-white rounded-xl text-[15px] w-[100%] px-2 mb-4"
                >
                  <option value="example">Examples</option>
                </select>
                <div className="grid grid-cols-4 gap-x-2 p-2 gap-y-2">
                  <img
                    src={image1}
                    alt="image"
                    className="w-full h-36 object-cover rounded-lg"
                    onClick={() => handleImageClick(image1)}
                  />
                  <img
                    src={image2}
                    alt="image"
                    className="w-full h-36 object-cover rounded-lg"
                    onClick={() => handleImageClick(image2)}
                  />
                  <img
                    src={image3}
                    alt="image"
                    className="w-full h-36 object-cover rounded-lg"
                    onClick={() => handleImageClick(image3)}
                  />
                  <img
                    src={image4}
                    alt="image"
                    className="w-full h-36 object-cover rounded-lg"
                    onClick={() => handleImageClick(image4)}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-4 w-[80%] self-center mt-2 rounded-[20px] py-2 text-[15px]"
            >
              {loading ? "Processing..." : "Check Liveness Result"}
              {/* Check Liveness Result */}

            </button>
            <div className="text-[#00000049] text-center p-5">
              Experience MiniAiLive's iBeta (Level 2) Certified, Single-Image Based Face Liveness Detection (Face Anti Spoofing) Engine today.
            </div>
          </div>
          <div className="bg-gray-200 mt-4 flex items-center justify-center rounded-xl w-[100%]">
            <div className="w-[90%] flex flex-col p-4 gap-4 h-[80vh]">
              {loading ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <img src={loading_gif} alt="" />
                  </div>
                  <div className="text-[#FF5000] text-center">
                    Loading Results....
                  </div>
                </div>
              ) : (
                <div>
                  {results && livenessImage ? (
                    <div className="flex flex-col h-[80%] ">
                      <div className="bg-white flex flex-col p-4  ">
                        <span className="font-extrabold">Results</span>
                        <FaceResult results={results} image={livenessImage} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center flex flex-col justify-center items-center h-[100vh]"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facelive;
