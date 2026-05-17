// ============================================================================
// IMPORTS
// ============================================================================
import React, { useState, useEffect, useRef } from "react";
import Nav from "../../../components/dashboard/components/Nav";
import SideBar from "../../../components/dashboard/components/SideBar";
import { useTheme } from "../../../context/ThemeContext";
import { useMessageLogic } from "../functions";
import ChatWindow from "../../../components/dashboard/components/ChatWindow";
import ConversationSidebar from "../../../components/dashboard/components/ConversationSidebar";
import { compressImage } from "@hooks";
import { IoSend, TbPhotoPlus, RiChatSmileAiFill } from "@icons";
// ============================================================================
// MAIN COMPONENT
// ============================================================================
const Message = () => {
  const { darkMode, setDarkMode } = useTheme();

  const {
    // Router
    navigate,
    receiverId,
    isMobileView,
    screenLoaded,
    // Redux
    currentUser,
    messages,
    onlineUsers,
    // Refs
    messagesEndRef,
    inputRef,
    inputElementRef,
    fileInputRef,

    // State
    activeMenu,
    setActiveMenu,
    sidebarHide,
    setSidebarHide,
    searchShow,
    setSearchShow,
    conversations,
    visibleConversations,
    activeConversation,
    setActiveConversation,
    image,
    setImage,
    previewUrl,
    setPreviewUrl,
    otherUser,

    // Derived
    currentOtherUser,

    // Display messages
    displayMessages,

    // Functions
    handleSendMessage,
    resendMessage,
    handleTyping,
    handleConversationClick,
    handleDeleteConversation,
  } = useMessageLogic();


  return (
    <div className="message-container">
      <SideBar
        sidebarHide={true}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <section id="content" className="chat-page">
        <Nav
          sidebarHide={sidebarHide}
          setSidebarHide={setSidebarHide}
          searchShow={searchShow}
          setSearchShow={setSearchShow}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className={`chat-main ${receiverId ? "chat-open" : ""}`}>
          <ConversationSidebar
            visibleConversations={visibleConversations}
            conversations={conversations}
            currentUser={currentUser}
            activeConversation={activeConversation}
            handleConversationClick={handleConversationClick}
            handleDeleteConversation={handleDeleteConversation}
            receiverId={receiverId}
            onlineUsers={onlineUsers}
            messages={messages}
          />

          <ChatWindow
            currentUser={currentUser}
            activeConversation={activeConversation}
            currentOtherUser={currentOtherUser}
            otherUser={otherUser}
            displayMessages={displayMessages}
            messagesEndRef={messagesEndRef}
            inputRef={inputRef}
            inputElementRef={inputElementRef}
            fileInputRef={fileInputRef}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            image={image}
            setImage={setImage}
            handleTyping={handleTyping}
            handleSendMessage={handleSendMessage}
            resendMessage={resendMessage}
            isMobileView={isMobileView}
            receiverId={receiverId}
            navigate={navigate}
            compressImage={compressImage}
            onlineUsers={onlineUsers}
          />
        </main>
      </section>
    </div>
  );
};

export default Message;