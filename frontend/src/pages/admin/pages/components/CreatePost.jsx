import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../../redux/postSlice";
import {
    RiImageCircleAiFill,
} from "@icons";

const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dhynqaw42/image/upload";
const UPLOAD_PRESET = "CraftLink_Image";

const CreatePost = ({ userPhoto, userName }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [previewImages, setPreviewImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ اختيار الصور + preview
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        setFiles((prev) => [...prev, ...selectedFiles]);

        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    // ✅ حذف صورة
    const removeImage = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // ✅ رفع الصور على Cloudinary (parallel upload)
    const uploadImagesToCloudinary = async () => {
        if (files.length === 0) return [];

        try {
            const uploadPromises = files.map((file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET);
                formData.append("folder", "craftlink/posts");

                return fetch(CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((data) => data.secure_url);
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            return uploadedUrls.filter(Boolean);
        } catch (error) {
            console.error("Error uploading images:", error);
            return [];
        }
    };

    // ✅ إنشاء البوست
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Please write something in your post");
            return;
        }

        try {
            setLoading(true);

            // 🔥 رفع الصور على Cloudinary
            const images = await uploadImagesToCloudinary();

            const result = await dispatch(
                createPost({ content: content.trim(), images })
            ).unwrap();

            if (result) {
                setContent("");
                setPreviewImages([]);
                setFiles([]);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-container">
            <div className="create-post-card">
                {/* Header */}
                <div className="post-header">
                    <img
                        src={userPhoto || "https://via.placeholder.com/40"}
                        alt="user"
                        className="user-avatar"
                    />
                    <input
                        type="text"
                        placeholder={`What's on your mind, ${userName}?`}
                        className="post-input"
                        onClick={() =>
                            document.querySelector(".post-textarea")?.focus()
                        }
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="post-textarea-container">
                        <textarea
                            className="post-textarea"
                            placeholder="Share your thoughts..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="3"
                        />
  
                        <div className="action-buttons">
                            <label className="action-btn">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                                <RiImageCircleAiFill /> Photo
                            </label>
                        </div>
                    </div>
                                {/* Preview Images */}
          {previewImages.length > 0 && (
            <div className="image-preview-container">
              {previewImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`preview-${index}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

                    {/* Actions */}
                    <div className="post-actions">


                        <button
                            type="submit"
                            disabled={loading || !content.trim()}
                            className="post-btn"
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;