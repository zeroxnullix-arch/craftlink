import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadCount } from "@/redux/messageSlice";
import { IoBanOutline, GoDotFill, HiDotsHorizontal } from "@icons";
import userAvatarPhoto from "../../../assets/img/userAvatar.jpg";
import { useTranslation } from "react-i18next";
const ConversationSidebar = ({
  visibleConversations,
  currentUser,
  activeConversation,
  handleConversationClick,
  handleDeleteConversation,
  receiverId,
  onlineUsers,
}) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const normalizeId = (id) => id?.toString();
  const unreadMap = useSelector((state) => state.messages.unreadMap || {});
  useEffect(() => {
    if (!currentUser?._id) return;
    dispatch(fetchUnreadCount());
  }, [currentUser?._id, dispatch]);
  return (
    <div className="conversations-sidebar">
      <h2>{t("Chats")}</h2>
      {!visibleConversations?.length ? (
        <div className="conversations-empty">
          <IoBanOutline />
          <p>No Conversations yet!</p>
        </div>
      ) : (
        visibleConversations.map((conversation) => {
          const conversationId = normalizeId(conversation._id);
          const otherUser = (conversation.members || []).find(
            (m) => normalizeId(m._id) !== normalizeId(currentUser?._id),
          );
          const isActive =
            receiverId &&
            normalizeId(activeConversation?._id) === conversationId;
          const lastMessage = conversation.lastMessage;
          let lastMessagePreview = "";
          if (lastMessage) {
            const hasImage = !!lastMessage.image;
            const hasText = !!lastMessage.text?.trim();
            if (hasImage && hasText) {
              lastMessagePreview = `📷 ${lastMessage.text}`;
            } else if (hasImage) {
              lastMessagePreview = "📷 Photo";
            } else if (hasText) {
              lastMessagePreview = lastMessage.text;
            }
            if (lastMessagePreview.length > 35) {
              lastMessagePreview = lastMessagePreview.slice(0, 35) + "...";
            }
          }
          const formattedTime = lastMessage?.createdAt
            ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
            : "";
          const unreadCount = unreadMap[String(conversation._id)] ?? 0;
          console.log(unreadCount);
          return (
            <div
              key={conversationId}
              onClick={() => handleConversationClick(conversation)}
              className={`conversation-item ${isActive ? "active" : ""}`}
            >
              <div className="user-item">
                <img
                  src={otherUser?.photoUrl || userAvatarPhoto}
                  alt="User"
                  className="conv-user-avatar"
                />
                <GoDotFill
                  className={`status ${onlineUsers.includes(otherUser?._id) ? "online" : "offline"
                    }`}
                />
              </div>
              <div className="conversation-right">
                <div className="conversation-name-action">
                  <p className="conversation-name" title={otherUser?.name}>
                    {otherUser?.name || "User"}
                  </p>
                  <button
                    className="delete-conversation-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conversationId);
                    }}
                    title="Delete Conversation"
                  >
                    <HiDotsHorizontal />
                  </button>
                </div>
                <div className="conversation-msg-time">
                  <p className="conversation-last-msg">{lastMessagePreview}</p>
                  <div className="conversation-time-unread">
                    <span className="conversation-time">{formattedTime}</span>
                    {unreadCount > 0 && (
                      <span className="conversation-unread">{unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default React.memo(ConversationSidebar);
