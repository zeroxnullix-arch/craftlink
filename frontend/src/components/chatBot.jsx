import React, { useState, useEffect, useRef } from "react";
import { VscRobot } from "react-icons/vsc";
import { PiUserCircleDashed } from "react-icons/pi";
import { BsRobot } from "react-icons/bs";
const ChatBot = () => {
  const chatEndRef = useRef(null);

  // 🔘 فتح/قفل الشات
  const [open, setOpen] = useState(false);

  // 🧠 messages (localStorage)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved
      ? JSON.parse(saved)
      : [{ from: "bot", text: "Hello 👋 How can I help you?" }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 💾 save to localStorage
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  // 🔽 auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: currentInput },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          user_id: "user1",
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to server ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        {open ? "✖" : <BsRobot/>}
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">🤖 AI Support</div>

          {/* Body */}
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.from}`}>
                <div className="chatbot-avatar">
                  {msg.from === "user" ? (
                    <PiUserCircleDashed />
                  ) : (
                    <VscRobot />
                  )}
                </div>

                <div className="chatbot-bubble">{msg.text}</div>
              </div>
            ))}

            {/* typing */}
            {loading && (
              <div className="chatbot-message bot">
                <div className="chatbot-avatar">
                  <VscRobot />
                </div>

                <div className="chatbot-bubble typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Footer */}
          <div className="chatbot-footer">
            <input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;