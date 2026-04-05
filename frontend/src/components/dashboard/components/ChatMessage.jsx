import React from "react";
import { PhotoView } from "react-photo-view";
const ChatMessage = React.memo(({ msg, currentUser, resendMessage }) => {
  const imageSrc = msg.image || msg.imagePreview || null;
  const messageTime = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      className={`chat-message ${msg.sender?._id === currentUser._id ? "sent" : "received"}`}
    >
      {imageSrc && (
        <PhotoView src={imageSrc}>
          <div className="message-image-wrapper">
            <img loading="lazy" src={imageSrc} alt="msg" />
          </div>
        </PhotoView>
      )}
      {msg.text && <p>{msg.text}</p>}
      <div className="message-meta">
        <span className="message-time">{messageTime}</span>
        {msg.sender?._id === currentUser._id && (
          <span className="message-status">
            {msg.status === "sending" && "Sending..."}
            {msg.status === "failed" && (
              <span
                className="message-failed"
                onClick={() => resendMessage(msg)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Failed - Click to retry
              </span>
            )}
            {msg.status === "sent" && "Sent"}
            {msg.status === "delivered" && "Delivered"}
            {msg.status === "seen" && "Seen"}
          </span>
        )}
      </div>
    </div>
  );
});

export default ChatMessage;
