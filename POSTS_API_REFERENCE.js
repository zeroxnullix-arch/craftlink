/**
 * Timeline/Posts API - Quick Reference
 * 
 * Base URL: http://localhost:8000/api/post
 * All write operations require authentication (Bearer token in Authorization header)
 */

// ============================================================================
// 1. CREATE A NEW POST
// ============================================================================
async function createPost() {
  const response = await fetch("http://localhost:8000/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Your JWT token
    },
    body: JSON.stringify({
      content: "Hello world! 👋",
      images: [
        "data:image/png;base64,...", // Base64 or URL
      ],
    }),
    credentials: "include", // For cookies
  });
  return await response.json();
  // Returns: { message: "Post created successfully", post: {...} }
}

// ============================================================================
// 2. GET ALL POSTS (Public - No auth required)
// ============================================================================
async function getAllPosts() {
  const response = await fetch("http://localhost:8000/api/post");
  return await response.json();
  // Returns: Array of posts with populated author and comments
}

// ============================================================================
// 3. GET SPECIFIC USER'S POSTS
// ============================================================================
async function getUserPosts(userId) {
  const response = await fetch(
    `http://localhost:8000/api/post/user/${userId}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  return await response.json();
  // Returns: Array of posts by that user
}

// ============================================================================
// 4. UPDATE A POST
// ============================================================================
async function updatePost(postId) {
  const response = await fetch(`http://localhost:8000/api/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: "Updated content!",
      images: [],
    }),
    credentials: "include",
  });
  return await response.json();
  // Returns: { message: "Post updated successfully", post: {...} }
  // Note: Only the author can update
}

// ============================================================================
// 5. DELETE A POST
// ============================================================================
async function deletePost(postId) {
  const response = await fetch(`http://localhost:8000/api/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });
  return await response.json();
  // Returns: { message: "Post deleted successfully" }
  // Note: Only the author can delete
}

// ============================================================================
// 6. LIKE/UNLIKE A POST
// ============================================================================
async function toggleLike(postId) {
  const response = await fetch(`http://localhost:8000/api/post/${postId}/like`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });
  return await response.json();
  // Returns: { message: "Post liked/unliked", post: {...} }
  // Note: Toggle functionality - like if not liked, unlike if already liked
}

// ============================================================================
// 7. ADD A COMMENT
// ============================================================================
async function addComment(postId) {
  const response = await fetch(
    `http://localhost:8000/api/post/${postId}/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: "Great post! 👍",
      }),
      credentials: "include",
    }
  );
  return await response.json();
  // Returns: { message: "Comment added successfully", post: {...} }
}

// ============================================================================
// 8. DELETE A COMMENT
// ============================================================================
async function deleteComment(postId, commentId) {
  const response = await fetch(
    `http://localhost:8000/api/post/${postId}/comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  return await response.json();
  // Returns: { message: "Comment deleted successfully", post: {...} }
  // Note: Only the comment author can delete
}

// ============================================================================
// REACT INTEGRATION EXAMPLE (Using axios)
// ============================================================================

import api from "./services/api";

// Create Post
async function reactCreatePost(content, images) {
  try {
    const { data } = await api.post("/post", { content, images });
    console.log("Post created:", data.post);
    return data.post;
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
}

// Get All Posts
async function reactGetAllPosts() {
  try {
    const { data } = await api.get("/post");
    console.log("Posts:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
}

// Like Post
async function reactToggleLike(postId) {
  try {
    const { data } = await api.patch(`/post/${postId}/like`);
    console.log("Like toggled:", data.message);
    return data.post;
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
}

// Add Comment
async function reactAddComment(postId, text) {
  try {
    const { data } = await api.post(`/post/${postId}/comment`, { text });
    console.log("Comment added:", data.post);
    return data.post;
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
}

// ============================================================================
// POST OBJECT STRUCTURE
// ============================================================================
const postObject = {
  _id: "507f1f77bcf86cd799439011",
  author: {
    _id: "507f1f77bcf86cd799439012",
    name: "John Doe",
    photoUrl: "https://example.com/photo.jpg",
  },
  content: "This is an awesome post!",
  images: [
    "data:image/png;base64,...", // Array of image URLs or base64
  ],
  likes: [
    {
      _id: "507f1f77bcf86cd799439013",
      name: "Jane Doe",
      photoUrl: "https://example.com/photo2.jpg",
    },
  ],
  comments: [
    {
      _id: "507f1f77bcf86cd799439014",
      userId: {
        _id: "507f1f77bcf86cd799439015",
        name: "Alice Smith",
        photoUrl: "https://example.com/photo3.jpg",
      },
      userName: "Alice Smith",
      userPhoto: "https://example.com/photo3.jpg",
      text: "Great post!",
      createdAt: "2026-03-16T10:30:00.000Z",
    },
  ],
  shares: 5,
  createdAt: "2026-03-16T10:00:00.000Z",
  updatedAt: "2026-03-16T10:30:00.000Z",
};

// ============================================================================
// ERROR RESPONSES
// ============================================================================
/*
400 Bad Request:
{
  message: "Post content is required" | "Comment text is required"
}

403 Forbidden:
{
  message: "Unauthorized to delete this post" | "Unauthorized to delete this comment"
}

404 Not Found:
{
  message: "Post not found" | "User not found" | "Comment not found"
}

500 Internal Server Error:
{
  message: "Error creating post",
  error: "Error details here"
}
*/
