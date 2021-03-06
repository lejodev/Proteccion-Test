import React from "react";
import { useState } from "react";
import processImages from "./processImage";

const FileInput = () => {
  const [images, setImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);

  const style = {
    backgroundColor: "blueviolet",
    height: "2rem",
    padding: "0.2rem",
    color: "aliceblue",
    "borderRadius": "0.3rem"
  };

  const handleInputs = (e) => {
    setImages(e.target.files);
  };

  const processImagesEvent = (e) => {
    e.preventDefault();
    processImages(images).then((images) => {
      setProcessedImages(images);
      console.table(images);
    });
  };

  return (
    <>
      <div className="container">
        <div className="input">
          <form className="fileForm" onSubmit={processImagesEvent}>
            <div className="form_control">
              <label htmlFor="fileInput"><span>Select your files</span></label>
              <input
                type="file"
                name=""
                id="fileInput"
                accept="image/jpeg"
                onChange={handleInputs}
                multiple
                style={style}
              />
            </div>
            <input type="submit" value="Send" style={style}/>
          </form>
        </div>
        <div className="results">
          {processedImages != null && processedImages.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Orientation</th>
                  <th>Resized</th>
                  <th>Original Width</th>
                  <th>Original Height</th>
                  <th>New Weight</th>
                  <th>New Height</th>
                </tr>
              </thead>
              <tbody>
                {processedImages.map((result) => (
                  <tr key={Math.random()}>
                    <td>{result.name}</td>
                    <td>{result.orientation}</td>
                    <td>{result.resized ? "true" : "false"}</td>
                    <td>{result.originalWidth}</td>
                    <td>{result.originalHeight}</td>
                    <td>{result.width}</td>
                    <td>{result.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;
