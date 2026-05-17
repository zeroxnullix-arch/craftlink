// ThumbnailUpload.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { LuCloudUpload } from "react-icons/lu";
import { useTranslation } from "react-i18next";
const ThumbnailUpload = ({
  setThumbnail,
  type = "image",
  reset = false,
  currentVideoUrl = null,
  currentImageUrl = null,
}) => {
  const { i18n, t } = useTranslation();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // Unique key to force video re-render on every upload
  const [videoKey, setVideoKey] = useState(0);

  const acceptType =
    type === "video"
      ? "video/mp4,video/webm,video/ogg,video/quicktime"
      : "image/*";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);

    // Always clear preview and revoke blob if present
    if (preview && preview.startsWith("blob:")) {
      try { URL.revokeObjectURL(preview); } catch { }
    }
    setPreview(null);
    if (type === "video") {
      setFile(selectedFile);

    }
    setThumbnail(selectedFile);

    // Reset input value to allow uploading the same file again
    if (inputRef.current) inputRef.current.value = "";

    // For images, we can load preview here
    if (type === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setLoading(false); // let useEffect handle video preview
    }
  };
  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) {
      try { URL.revokeObjectURL(preview); } catch { }
    }
    setFile(null);
    setPreview(null);
    setThumbnail(null);
    if (type === "video") setVideoKey(Date.now() + Math.random());
    if (inputRef.current) inputRef.current.value = "";
  };

  // Full reset logic: always clear everything on reset
  useEffect(() => {
    if (!reset) return;

    if (preview && preview.startsWith("blob:")) {
      try { URL.revokeObjectURL(preview); } catch { }
    }

    if (type === "video") {
      if (currentVideoUrl) {
        setPreview(currentVideoUrl);
        setVideoKey(Date.now() + Math.random());
      } else {
        setPreview(null);
      }
    } else {
      if (currentImageUrl) {
        setFile(null);
        setPreview(currentImageUrl || null);
      } else {
        setPreview(null);
      }
    }

    if (inputRef.current) inputRef.current.value = "";

  }, [reset, currentVideoUrl, currentImageUrl, type]);
  // Always sync preview with file
  useEffect(() => {
    if (file) {
      if (type === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        const videoUrl = URL.createObjectURL(file);
        setPreview(videoUrl);
        setVideoKey(Date.now() + Math.random());
        setLoading(false);
      }
    } else {
      if (type === "video") {
        setPreview(currentVideoUrl || null);
        setVideoKey(Date.now() + Math.random());
      } else {
        setPreview(currentImageUrl || null);
      }
      setLoading(false);
    }

    return () => {
      if (preview && preview.startsWith("blob:")) {
        try { URL.revokeObjectURL(preview); } catch { }
      }
    };
  }, [file, currentVideoUrl, currentImageUrl, type]);

  const displaySrc = preview;

  return (
    <div className="thumb-upload">
      <input
        type="file"
        accept={acceptType}
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      <div className="thumb-box" onClick={() => inputRef.current.click()}>
        {displaySrc ? (
          type === "video" ? (
            <video
              key={videoKey} // Unique key to force re-render
              src={displaySrc}
              width="100%"
              preload="auto"
            // controls
            />
          ) : (
            <img src={displaySrc} alt="thumbnail" />
          )
        ) : (
          <div className="thumb-placeholder">
            <LuCloudUpload />
            <p>{type === "video" ? t("Upload Video") : t("Upload Thumbnail")}</p>
            <span>{type === "video" ? "MP4, WEBM, MOV" : "PNG, JPG, JPEG"}</span>
          </div>
        )}
      </div>

      {preview && !file && (
        <button
          type="button"
          onClick={handleRemove}
          className="file-action btn-delete"
        >
          <FaTrash />
        </button>
      )}

      {file && (
        <>
          <div className="thumb-info">
            <p>{file.name}</p>
            <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="file-action btn-delete"
          >
            <FaTrash />
          </button>
        </>
      )}
    </div>
  );
};

export default ThumbnailUpload;