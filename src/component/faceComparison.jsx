import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./page.css";
import image1 from "../assets/Images/Compare/a1.jpg";
import image2 from "../assets/Images/Compare/a2.jpg";
import image3 from "../assets/Images/Compare/a3.jpg";
import image4 from "../assets/Images/Compare/a4.jpg";
import image5 from "../assets/Images/Compare/b1.jpg";
import image6 from "../assets/Images/Compare/b2.jpg";
import image7 from "../assets/Images/Compare/b3.jpg";
import image8 from "../assets/Images/Compare/b4.jpg";
import prev_img1 from "../assets/Images/prev_img1.png";
import prev_img2 from "../assets/Images/prev_img2.png";
import img_upload_l from "../assets/Images/upload_large.png";
import loading_gif from "../assets/Images/loading.gif";

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [results, setResults] = useState(null);
  const [comparisonImage1, setComparisonImage1] = useState(null);
  const [comparisonImage2, setComparisonImage2] = useState(null);

  const handleImageClick = (imageSrc) => {
    setUploadedImage1(imageSrc);
  };
  const handleImageClick2 = (imageSrc) => {
    setUploadedImage2(imageSrc);
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

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } =
    useDropzone({ onDrop: onDrop1 });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } =
    useDropzone({ onDrop: onDrop2 });
  const handleSubmit = async () => {
    setLoading(true);

    let file1 = null;
    if (uploadedImage1) {
      try {
        file1 = await dataURLtoFile(
          uploadedImage1,
          "image1.jpg"
        );
        if (!file1) {
          console.error("Error converting image1 to file.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error converting image1 to file:", error);
        setLoading(false);
        return;
      }
    } else {
      
      const existingToastId = toast.isActive("noImageError");

      if (!existingToastId) {
        toast.error("Please input 1st test image.", {
          toastId: "noImageError", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "#FF6347", 
          },
        });
      }
      console.error("Please input 1st test image");
      setLoading(false);
      return;
    }

    let file2 = null;
    if (uploadedImage2) {
      try {
        file2 = await dataURLtoFile(
          uploadedImage2,
          "image2.jpg"
        );
        if (!file2) {
          console.error("Error converting image2 to file.");
          setLoading(false);
          return;
        }
      } catch (error) {
        
        console.error("Error converting image2 to file:", error);
        setLoading(false);
        return;
      }
    } else {
      const existingToastId = toast.isActive("noImageError");

      if (!existingToastId) {
        toast.error("Please input 2nd test image", {
          toastId: "noImageError", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "#FF6347", 
          },
        });
      }
      console.error("Please input 2nd test image");
      setLoading(false);
      return;
    }
    setComparisonImage1(uploadedImage1);
    setComparisonImage2(uploadedImage2);
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await fetch("http://191.96.31.183:8080/face_compare", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.face1 === null || result.face2 === null) {
        console.error("No face detected in one or both images.");
      } else {
        setResults(result);
      }
    } catch (error) {
      console.error("Error submitting images:", error);
      
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    if (dataurl.startsWith("data:")) {
      const arr = dataurl.split(",");
      if (arr.length < 2) {
        console.error("Invalid data URL format:", dataurl);
        return null;
      }

      const mime = arr[0].match(/:(.*?);/);
      if (!mime || !mime[1]) {
        console.error("Invalid MIME type in data URL:", dataurl);
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
        .then((response) => response.blob())
        .then((blob) => new File([blob], filename));
    }
  };

  const FaceComparisonResult = ({ results, image1, image2 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (results && canvasRef.current && image1 && image2) {
        drawComparison();
      }
    }, [results, image1, image2]);

    const drawComparison = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const canvasWidth = 580;
      const canvasHeight = 280;
      const padding = 10;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const imageWidth = 290;
      const imageHeight = canvasHeight - padding * 2;

      drawFace(
        ctx,
        image1,
        results.face1,
        padding,
        padding,
        imageWidth,
        imageHeight,
        "Face 1"
      );
      drawFace(
        ctx,
        image2,
        results.face2,
        padding * 2 + imageWidth,
        padding,
        imageWidth,
        imageHeight,
        "Face 2"
      );
    };

    const drawFace = (
      ctx,
      imageSrc,
      face,
      x,
      y,
      maxWidth,
      maxHeight,
      label
    ) => {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, maxWidth, maxHeight);

        const faceWidth = face.x2 - face.x1;
        const faceHeight = face.y2 - face.y1;
        const faceAspectRatio = faceWidth / faceHeight;

        let drawWidth = maxWidth;
        let drawHeight = maxWidth / faceAspectRatio;

        if (drawHeight > maxHeight) {
          drawHeight = maxHeight;
          drawWidth = maxHeight * faceAspectRatio;
        }

        const offsetX = (maxWidth - drawWidth) / 2;
        const offsetY = (maxHeight - drawHeight) / 2;

        ctx.drawImage(
          img,
          face.x1,
          face.y1,
          faceWidth,
          faceHeight,
          x + offsetX,
          y + offsetY,
          drawWidth,
          drawHeight
        );

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + offsetX, y + offsetY, drawWidth, drawHeight);

        ctx.font = "14px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(label, x + maxWidth / 2, y + maxHeight + 20);
      };
      img.src = imageSrc;
    };

    const renderTable = (data) => {
      if (!data) return null;

      const { compare_result, compare_similarity } = data;

      return (
        <div className="max-h-[70vh] mt-4 overflow-y-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr className="bg-white">
                <td className="py-2 px-4 font-extrabold">Matching Result: </td>
                <td className="py-2 px-4">{compare_result}</td>
              </tr>
              <tr className="bg-white">
                <td className="py-2 px-4 font-extrabold">Similarity Score: </td>
                <td className="py-2 px-4">{compare_similarity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div>
        <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto" }} />
        {renderTable(results)}
      </div>
    );
  };

  return (
    <div className="flex w-[98%] ">
      <div className=" w-full h-full">
        <div className="flex " id="">
          <div className=" flex flex-col justify-center w-[60%]">
            <div className=" w-[100%] gap-10 pt-6 pl-4">
              <div className=" flex justify-around  ">
                <div className="">
                  <div
                    {...getRootProps1()}
                    className="flex items-center cursor-pointer border-2 border-orange-200 w-[20vw] md:w-[24vw] lg:w-[24vw] border-dashed rounded-xl h-[35vh] md:h-[24vh] lg:h-[24vh]"
                  >
                    <input {...getInputProps1()} />
                    {uploadedImage1 ? (
                      <img
                        src={uploadedImage1}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                        <img src={prev_img1} alt="" />
                        <div>
                          <img src={img_upload_l} alt="" />
                        </div>
                        <h1 className="text-orange-500 text-[16px] font-bold">
                          Drag & Drop image
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    {...getRootProps2()}
                    className="flex items-center border-2 cursor-pointer border-orange-100 w-[20vw] md:w-[24vw] lg:md:w-[24vw]  border-dashed rounded-xl h-[35vh] md:h-[24vh] lg:h-[24vh]"
                  >
                    <input {...getInputProps2()} />
                    {uploadedImage2 ? (
                      <img
                        src={uploadedImage2}
                        alt="Image"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center gap-4 w-full">
                        <img src={prev_img2} alt="" />
                        <div>
                          <img src={img_upload_l} alt="" />
                        </div>
                        <h1 className="text-orange-500 text-[16px] font-bold">
                          Drag & Drop image
                        </h1>
                      </div>
                    )}
                  </div>
                  <div><br></br></div>
                </div>
              </div>
            </div>
            <div className="flex justify-around gap-3 h-[28vh] relative  px-2">
              <div className="bg-gray-200 w-4/5 p-2 rounded-lg py-2">
                <select
                  name="option"
                  id="option"
                  className="py-2 bg-white rounded-xl text-[15px] w-[100%]  px-2  mb-4"
                >
                  <option value="example">Examples</option>
                </select>
                <div className="grid grid-cols-4 w-full  gap-x-2 p-2  md:grid-cols-2 lg:grid-cols-2  ">
                  {[image1, image2, image3, image4].map((img, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden shadow-md cursor-pointer"
                      onClick={() => handleImageClick(img)}
                    >
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="h-[10vh] w-32 object-cover "
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-200 w-4/5 p-2 rounded-lg py-2">
                <select
                  name="option"
                  id="option"F
                  className="py-2 bg-white rounded-xl text-[15px] w-[100%]  px-2  mb-4"
                >
                  <option value="example">Examples</option>
                </select>
                <div className="grid grid-cols-4  gap-x-2 p-3 md:grid-cols-2 lg:grid-cols-2 ">
                  {[image5, image6, image7, image8].map((img, index) => (
                    <div
                      key={(index = 5)}
                      className="border rounded-lg overflow-hidden shadow-md cursor-pointer "
                      onClick={() => handleImageClick2(img)}
                    >
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="h-[10vh] w-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-4 rounded-[20px] py-2 w-[80%] self-center mt-2 text-[12                                                                                   px]"
            >
              {" "}
              {loading ? "Processing..." : "Check your comparisons"}
            </button>
            <div className="text-[#00000049] text-center p-5">
            Check the likelihood that two faces belong to the same person. You will get a confidence score and thresholds to evaluate the similarity.
            </div>
          </div>
          <div className="bg-gray-200  flex items-center mt-5 justify-center rounded-xl w-[38%]">
            <div className="w-[100%] flex flex-col p-4 gap-4 h-[100%]">
              {loading ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <img src={loading_gif} alt="Loading spinner" />
                  </div>
                  <div className="text-[#FF5000] text-center">
                    Loading Results....
                  </div>
                </div>
              ) : (
                <>
                  {results && comparisonImage1 && comparisonImage2 && (
                    <div>
                      <button
                        className={`
    text-left p-4 m-2 w-1/2 md:w-full lg:w-full rounded-lg
    ${
      results.compare_similarity > 0.8
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }
  `}
                      >
                        {results.compare_similarity > 0.8
                          ? "Same Person"
                          : "Not Same Person"}
                      </button>

                      <FaceComparisonResult
                        results={results}
                        image1={comparisonImage1}
                        image2={comparisonImage2}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
