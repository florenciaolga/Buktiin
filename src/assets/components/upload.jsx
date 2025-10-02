import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./upload.css";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-page">
      <Header />

      <div className="upload-container">
        <h2 className="upload-title">#SkillNyataPeluangNyata</h2>

        <div className="upload-box">
          {/* Upload Image */}
          <div className="upload-image-section">
            <label htmlFor="file-upload">
              {image ? (
                <img src={image} alt="preview" className="preview-img" />
              ) : (
                <div className="upload-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="upload-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V3.75m0 12.75L7.5 12m4.5 4.5l4.5-4.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25h-2.25"
                    />
                  </svg>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <button className="upload-btn">Upload</button>
          </div>

          {/* Text Input */}
          <div className="upload-text-section">
            <input
              type="text"
              placeholder="Tulis judul disini..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
            <textarea
              placeholder="Tulis deskripsi disini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="desc-input"
            ></textarea>
          </div>

          {/* Settings Button */}
          <div className="settings-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="settings-icon"
                >
                    <circle cx="12" cy="12" r="3" stroke="#1C274C" strokeWidth="1.5"></circle>
                    <path
                    d="M3.66 10.64C4.13 10.94 4.44 11.44 4.44 12c0 .56-.31 1.06-.78 1.36-.32.2-.53.38-.68.57-.32.42-.46.95-.39 1.49.05.39.29.8.75 1.6.46.81.69 1.21 1.01 1.46.42.32.95.46 1.49.39.24-.03.49-.12.82-.29.49-.26 1.09-.27 1.57.01.48.28.77.79.79 1.34.01.37.04.62.11.82.16.41.51.75.95.93.37.16.83.16 1.76.16.93 0 1.39 0 1.76-.16.44-.18.79-.52.95-.93.07-.2.1-.45.11-.82.02-.55.31-1.06.79-1.34.48-.28 1.08-.27 1.57-.01.33.17.58.26.82.29.54.07 1.07-.07 1.49-.39.32-.25.55-.65 1.01-1.46.46-.8.7-1.21.75-1.6.07-.54-.07-1.07-.39-1.49-.15-.19-.36-.37-.68-.57-.47-.3-.78-.8-.78-1.36 0-.56.31-1.06.78-1.36.32-.2.53-.38.68-.57.32-.42.46-.95.39-1.49-.05-.39-.29-.8-.75-1.6-.46-.81-.69-1.21-1.01-1.46-.42-.32-.95-.46-1.49-.39-.24.03-.49.12-.82.29-.49.26-1.09.27-1.57-.01-.48-.28-.77-.79-.79-1.34-.01-.37-.04-.62-.11-.82-.16-.41-.51-.75-.95-.93C13.39 2 12.93 2 12 2c-.93 0-1.39 0-1.76.16-.44.18-.79.52-.95.93-.07.2-.1.45-.11.82-.02.55-.31 1.06-.79 1.34-.48.28-1.08.27-1.57.01-.33-.17-.58-.26-.82-.29-.54-.07-1.07.07-1.49.39-.32.25-.55.65-1.01 1.46-.46.8-.7 1.21-.75 1.6-.07.54.07 1.07.39 1.49.15.19.36.37.68.57z"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>

        {/* Hashtags */}
        <div className="hashtags">
          <button>#RekomendasiHashtag</button>
          <button>#Tag1</button>
          <button>#TrendingTags</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
