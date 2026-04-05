// socket.js
import MessageModel from "../model/MessageModel.js";
export const initializeSocket = (io) => {
  // Online Users Object
  // { userId: [socketId1, socketId2] }
  global.onlineUsers = {};
  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);
    socket.on("addUser", async (userId) => {
      if (!userId) return;
      const userIdStr = userId.toString();
      socket.userId = userIdStr;
      if (!global.onlineUsers[userIdStr]) {
        global.onlineUsers[userIdStr] = [];
      }
      if (!global.onlineUsers[userIdStr].includes(socket.id)) {
        global.onlineUsers[userIdStr].push(socket.id);
      }
      socket.join(userIdStr);
      io.emit("updateUserStatus", { userId: userIdStr, online: true });
      io.emit("allOnlineUsers", Object.keys(global.onlineUsers));
      try {
        const undeliveredMessages = await MessageModel.find({
          receiver: userIdStr,
          status: "sent",
        }).select("_id sender");
        if (undeliveredMessages.length > 0) {
          const messageIds = undeliveredMessages.map((m) => m._id);
          await MessageModel.updateMany(
            { _id: { $in: messageIds } },
            { status: "delivered" }
          );
          undeliveredMessages.forEach((msg) => {
            const senderId = msg.sender._id?.toString() || msg.sender.toString();
            const senderSockets = global.onlineUsers[senderId] || [];
            senderSockets.forEach((socketId) => {
              io.to(socketId).emit("updateMessageStatus", {
                messageIds: [msg._id.toString()],
                status: "delivered",
              });
            });
          });
          const receiverSockets = global.onlineUsers[userIdStr] || [];
          receiverSockets.forEach((socketId) => {
            io.to(socketId).emit("updateMessageStatus", {
              messageIds: messageIds.map((id) => id.toString()),
              status: "delivered",
            });
          });
        }
      } catch (err) {
        console.error("Deliver Pending Error:", err);
      }
    });

    socket.on("typing", ({ to, username, from }) => {
      const sockets = global.onlineUsers[to] || [];
      sockets.forEach((id) =>
        io.to(id).emit("typing", { username, from })
      );
    });
    socket.on("stopTyping", ({ from, to }) => {
      const sockets = global.onlineUsers[to] || [];
      sockets.forEach((id) =>
        io.to(id).emit("stopTyping", { from })
      );
    });
    socket.on("markAsSeen", async ({ conversationId, userId }) => {
      try {
        const userIdStr = userId.toString();
        const unseenMessages = await MessageModel.find({
          conversationId,
          "sender._id": { $ne: userIdStr },
          status: { $ne: "seen" },
        }).select("_id sender");
        if (unseenMessages.length === 0) return;
        const messageIds = unseenMessages.map((m) => m._id);
        await MessageModel.updateMany(
          { _id: { $in: messageIds } },
          { status: "seen" }
        );
        unseenMessages.forEach((msg) => {
          const senderId = msg.sender._id?.toString() || msg.sender.toString();
          const senderSockets = global.onlineUsers[senderId] || [];
          senderSockets.forEach((socketId) =>
            io.to(socketId).emit("updateMessageStatus", {
              messageIds: [msg._id.toString()],
              status: "seen",
            })
          );
        });
        const currentUserSockets = global.onlineUsers[userIdStr] || [];
        currentUserSockets.forEach((socketId) => {
          io.to(socketId).emit("updateMessageStatus", {
            messageIds: messageIds.map((id) => id.toString()),
            status: "seen",
          });
        });
      } catch (err) {
        console.error("MarkAsSeen Error:", err);
      }
    });
    socket.on("messageDelivered", async ({ messageId }) => {
      try {
        const msg = await MessageModel.findByIdAndUpdate(
          messageId,
          { status: "delivered" },
          { new: true }
        );
        if (!msg) return;
        const senderId = msg.sender._id?.toString() || msg.sender.toString();
        const senderSockets = global.onlineUsers[senderId] || [];
        senderSockets.forEach((socketId) =>
          io.to(socketId).emit("updateMessageStatus", {
            messageIds: [messageId],
            status: "delivered",
          })
        );
      } catch (err) {
        console.error("Delivered Error:", err);
      }
    });
    socket.on("disconnect", () => {
      const userIdStr = socket.userId;
      if (!userIdStr) return;
      if (global.onlineUsers[userIdStr]) {
        global.onlineUsers[userIdStr] =
          global.onlineUsers[userIdStr].filter((id) => id !== socket.id);
        if (global.onlineUsers[userIdStr].length === 0) {
          delete global.onlineUsers[userIdStr];
          io.emit("updateUserStatus", { userId: userIdStr, online: false });
        }
      }
      io.emit("allOnlineUsers", Object.keys(global.onlineUsers));
    });
  });
};