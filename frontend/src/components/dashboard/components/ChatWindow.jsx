import React, { useMemo } from "react";
import { PhotoProvider } from "react-photo-view";
import {
  IoSend,
  TbPhotoPlus,
  RiChatSmileAiFill,
  TbArrowLeftDashed,
} from "@icons";
import ChatMessage from "./ChatMessage";
import AnimatedWrapper from "./AnimatedMessageWrapper";
import userAvatarPhoto from "../../../assets/img/userAvatar.jpg";
const ChatWindow = ({
  currentUser,
  activeConversation,
  currentOtherUser,
  otherUser,
  displayMessages,
  messagesEndRef,
  inputRef,
  inputElementRef,
  fileInputRef,
  previewUrl,
  setPreviewUrl,
  setImage,
  handleTyping,
  handleSendMessage,
  resendMessage,
  isMobileView,
  receiverId,
  navigate,
  compressImage,
  onlineUsers,
}) => {
  if (!receiverId || !activeConversation) {
    return (
      <div className="chat-empty">
        <RiChatSmileAiFill />
        <h3>Welcome to your chats!</h3>
        <p>Select a conversation or start a new one.</p>
      </div>
    );
  }
  const reversedMessages = useMemo(
    () => displayMessages?.slice().reverse(),
    [displayMessages],
  );
  return (
    <div className="chat-window">
      <div className="chat-header">
        {isMobileView && receiverId && (
          <button className="back-btn" onClick={() => navigate("/message")}>
            <TbArrowLeftDashed />
          </button>
        )}
        <div className="chat-user-info">
          <img
            src={currentOtherUser?.photoUrl || userAvatarPhoto}
            alt="User"
            className="chat-user-avatar"
          />
          <div className="chat-user-details">
            <p className="chat-user-name" onClick={()=>navigate(`/profile/${currentOtherUser?._id}`)}>{currentOtherUser?.name || "User"}</p>
            <p className="chat-user-status">
              {otherUser?.typing ? (
                <>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </>
              ) : onlineUsers.includes(currentOtherUser?._id) ? (
                "Online"
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
      </div>
      {!displayMessages || displayMessages.length === 0 ? (
        <div className="no-messages">
          <h3>Say hi 👋 and start chatting!</h3>
        </div>
      ) : (
        <PhotoProvider maskOpacity={0.8} speed={() => 300}>
          <div className="chat-messages">
            <div ref={messagesEndRef} />
            {reversedMessages.map((msg, index) => (
              <React.Fragment key={msg.replaceId || msg.tempId || msg._id}>
                <AnimatedWrapper
                  type={
                    msg.sender?._id === currentUser._id ? "sent" : "received"
                  }
                >
                  {msg.sender?._id !== currentUser._id && (
                    <img
                      className="chat-user-avatar"
                      src={msg.sender?.photoUrl || userAvatarPhoto}
                      alt="User"
                    />
                  )}
                  <ChatMessage
                    msg={msg}
                    currentUser={currentUser}
                    resendMessage={resendMessage}
                  />
                  {msg.sender?._id === currentUser._id && (
                    <img
                      className="chat-user-avatar"
                      src={msg.sender?.photoUrl || userAvatarPhoto}
                      alt="User"
                    />
                  )}
                </AnimatedWrapper>
                {msg.showDateSeparator && (
                  <div
                    className="date-separator"
                    key={"date_" + msg.formattedDate + "_" + index}
                  >
                    {msg.formattedDate}
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="chat-fixed-info">
              🔒 Messages are end-to-end encrypted. Only people in this chat can
              read.
            </div>
          </div>
        </PhotoProvider>
      )}
      <div className="chat-input-form">
        <input
          ref={inputElementRef}
          type="text"
          placeholder="Type a message..."
          onChange={(e) => {
            inputRef.current = e.target.value;
            handleTyping(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        {previewUrl && (
          <div className="image-preview-inline">
            <img src={previewUrl} alt="preview" />
            <button
              type="button"
              className="remove-image"
              onClick={() => {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
                setImage(null);
              }}
            >
              ×
            </button>
          </div>
        )}
        <div className="icon-photo-upload">
          <TbPhotoPlus className="icon-photo" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const compressedFile = await compressImage(file, 800, 0.7);
              const blobUrl = URL.createObjectURL(compressedFile);
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              setImage(compressedFile);
              setPreviewUrl(blobUrl);
              e.target.value = "";
            }}
          />
        </div>
        <button className="send-btn" onClick={handleSendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
