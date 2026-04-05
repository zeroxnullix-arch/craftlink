import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@services/api";
import { encrypt, decrypt } from "@/utils/encryption.js";
export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (conversationId) => {
    const res = await api.get(`/api/message/${conversationId}`);
    return res.data;
  },
);
export const sendMessage = createAsyncThunk("messages/send", async (data) => {
  const res = await api.post("/api/message/", data);
  return res.data;
});
export const markMessagesAsSeen = createAsyncThunk(
  "messages/seen",
  async (conversationId, { getState }) => {
    const currentUserId = getState().user.userData._id;
    await api.patch(`/api/message/seen/${conversationId}`);
    return { conversationId, currentUserId };
  },
);
export const fetchUnreadCount = createAsyncThunk(
  "messages/unreadCount",
  async () => {
    const res = await api.get("/api/message/unread");
    return res.data;
  },
);
export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async (messageId) => {
    await api.delete(`/api/message/${messageId}`);
    return messageId;
  },
);
export const deleteConversationThunk = createAsyncThunk(
  "messages/deleteConversation",
  async ({ conversationId, forAll = false }) => {
    await api.delete(
      `/api/message/conversation/${conversationId}?forAll=${forAll}`,
    );
    return { conversationId, forAll };
  },
);
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    conversations: [],
    unreadMap: {},
    typingUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      let message = { ...action.payload };
      if (message.replaceId) {
        const index = state.messages.findIndex(
          (m) => m._id === message.replaceId,
        );
        if (index !== -1) {
          state.messages[index] = {
            ...state.messages[index],
            ...message,
            _id: message._id,
            status: "sent",
            imagePreview:
              state.messages[index].imagePreview || message.imagePreview,
          };
          return;
        }
      }
      if (!state.messages.some((m) => m._id === message._id)) {
        state.messages.push(message);
      } else {
        state.messages = state.messages.map((m) =>
          m._id === message._id ? { ...m, ...message } : m,
        );
      }
    },
    clearUnreadForConversation: (state, action) => {
      const conversationId = action.payload;
      state.unreadMap[conversationId] = 0;
    },
    updateConversationLastMessage: (state, action) => {
      const message = action.payload;
      const index = state.conversations.findIndex(
        (c) => c._id === message.conversationId,
      );
      if (index !== -1) {
        state.conversations[index] = {
          ...state.conversations[index],
          lastMessage: message,
        };
      } else {
        state.conversations.unshift({
          _id: message.conversationId,
          lastMessage: message,
        });
      }
      state.conversations.sort(
        (a, b) =>
          new Date(b.lastMessage?.createdAt || 0) -
          new Date(a.lastMessage?.createdAt || 0),
      );
    },
    updateMessagesStatus: (state, action) => {
      const { messageIds, status } = action.payload;
      const idsArray = Array.isArray(messageIds) ? messageIds : [messageIds];
      state.messages = state.messages.map((msg) =>
        idsArray.includes(msg._id) ? { ...msg, status } : msg,
      );
    },
    setMessageFailed: (state, action) => {
      const { tempId } = action.payload;
      const index = state.messages.findIndex((msg) => msg._id === tempId);
      if (index !== -1) {
        state.messages[index].status = "failed";
      }
    },
    setTyping: (state, action) => {
      state.typingUser = action.payload;
    },
    clearConversationMessages: (state, action) => {
      const conversationId = action.payload;
      state.messages = state.messages.filter(
        (msg) => msg.conversationId !== conversationId,
      );
    },
    clearConversationMessagesForAll: (state) => {
      state.messages = [];
      state.conversations = [];
    },
    updateUnreadMap: (state, action) => {
      state.unreadMap = action.payload;
      console.log("Unread Map:", state.unreadMap);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const serverMessages = action.payload;
        serverMessages.forEach((msg) => {
          const conv = state.conversations.find(
            (c) => c._id === msg.conversationId,
          );
          const encryptionKey = conv?.encryptionKey;
          if (msg.text && encryptionKey) {
            try {
              msg.text = decrypt(msg.text, encryptionKey);
            } catch (err) {
              console.error("Decrypt failed:", err);
            }
          }
          const existingIndex = state.messages.findIndex(
            (m) => m._id === msg._id,
          );
          if (existingIndex !== -1) {
            state.messages[existingIndex] = {
              ...state.messages[existingIndex],
              ...msg,
              imagePreview: null,
            };
          } else {
            state.messages.push({
              ...msg,
              imagePreview: null,
            });
          }
        });
      })
      .addCase(markMessagesAsSeen.fulfilled, (state, action) => {
        const { conversationId, currentUserId } = action.payload;
        state.messages = state.messages.map((msg) =>
          msg.conversationId === conversationId &&
          msg.sender?._id !== currentUserId
            ? { ...msg, status: "seen" }
            : msg,
        );
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        console.log("API unread map:", action.payload);
        state.unreadMap = action.payload;
      })
      .addCase(addMessage, (state, action) => {
        const msg = action.payload;
        const existing = state.messages.find((m) => m._id === msg._id);
        if (!existing) state.messages.push(msg);
        else Object.assign(existing, msg);
        const map = { ...state.unreadMap };
        if (msg.sender?._id !== state.currentUserId && msg.status !== "seen") {
          map[msg.conversationId] = (map[msg.conversationId] || 0) + 1;
        }
        state.unreadMap = map;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload,
        );
      })
      .addCase(deleteConversationThunk.fulfilled, (state, action) => {
        const conversationId = action.payload.conversationId;
        state.messages = state.messages.filter(
          (msg) => msg.conversationId !== conversationId,
        );
      });
  },
});

export const {
  addMessage,
  setMessageFailed,
  clearUnreadForConversation,
  updateUnreadMap,
  updateMessagesStatus,
  setTyping,
  clearConversationMessages,
  clearConversationMessagesForAll,
  updateConversationLastMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
