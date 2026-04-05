import crypto from "crypto";
import { encrypt, decrypt } from "../utils/encryption.js";
import Message from "../model/MessageModel.js";
import Conversation from "../model/ConversationModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text, image, receiverId } = req.body;
    const senderId = req.user._id;
    if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    let conversation = conversationId
      ? await Conversation.findById(conversationId)
      : null;
    if (!conversation && receiverId) {
      const members = [senderId, receiverId].sort();
      const generateKey = () => crypto.randomBytes(32).toString("hex");
      conversation = await Conversation.findOneAndUpdate(
        { members },
        {
          $setOnInsert: {
            members,
            encryptionKey: generateKey(),
          },
        },
        { new: true, upsert: true },
      );
    }
    if (!conversation)
      return res.status(400).json({ message: "Conversation not found" });
    const key =
      conversation.encryptionKey || crypto.randomBytes(32).toString("hex");
    if (!conversation.encryptionKey) {
      conversation.encryptionKey = key;
      await conversation.save();
    }
    const encryptedText = text ? encrypt(text, key) : null;
    const message = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      receiver: receiverId,
      text: encryptedText,
      image,
      status: "sent",
    });
    conversation.lastMessage = message._id;
    if (receiverId) {
      conversation.deletedFor = (conversation.deletedFor || []).filter(
        (id) => id.toString() !== receiverId.toString(),
      );
    }
    await conversation.save();
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name photoUrl",
    );
    const io = req.app.get("io");
    const receiverSockets = global.onlineUsers[String(receiverId)] || [];
    receiverSockets.forEach((socketId) => {
      io.to(socketId).emit("getMessage", populatedMessage);
    });
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const conversationId = req.params.conversationId;
  const io = req.app.get("io");
  const conversation = await Conversation.findById(conversationId);
  const messages = await Message.find({
    conversationId,
    deletedFor: { $ne: req.user._id },
  })
    .populate("sender", "name photoUrl")
    .sort({ createdAt: 1 });
  messages.forEach((msg) => {
    try {
      if (msg.text && conversation?.encryptionKey && msg.text.includes(":")) {
        msg.text = decrypt(msg.text, conversation.encryptionKey);
      }
    } catch (err) {
      console.log("Decryption failed for message:", msg._id);
    }
  });
  const sentMessages = messages.filter(
    (m) =>
      m.sender._id.toString() !== req.user._id.toString() &&
      m.status === "sent",
  );
  const messageIds = sentMessages.map((m) => m._id);
  if (messageIds.length > 0) {
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { status: "delivered" },
    );
  }
  if (conversation) {
    conversation.members.forEach((member) => {
      if (member.toString() !== req.user._id.toString()) {
        const sockets = global.onlineUsers[member] || [];
        sockets.forEach((socketId) => {
          io.to(socketId).emit("updateMessageStatus", {
            messageIds: messageIds.map((id) => id.toString()),
            status: "delivered",
          });
        });
      }
    });
  }
  res.json(messages);
};

export const markAsSeen = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({
    conversationId,
    sender: { $ne: req.user._id },
    status: { $ne: "seen" },
  });
  const messageIds = messages.map((m) => m._id);
  await Message.updateMany({ _id: { $in: messageIds } }, { status: "seen" });
  const io = req.app.get("io");
  const conversation = await Conversation.findById(conversationId).populate(
    "members",
    "_id",
  );
  conversation.members.forEach((member) => {
    if (member._id.toString() !== req.user._id.toString()) {
      const sockets = global.onlineUsers[member._id] || [];
      sockets.forEach((socketId) => {
        io.to(socketId).emit("updateMessageStatus", {
          messageIds: messageIds.map((id) => id.toString()),
          status: "seen",
        });
      });
    }
  });
  res.json({ message: "Messages marked as seen" });
};

export const getUnreadCount = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: req.user._id,
    }).select("_id");
    const unreadMap = {};
    for (const conv of conversations) {
      const count = await Message.countDocuments({
        conversationId: conv._id,
        sender: { $ne: req.user._id },
        status: { $ne: "seen" },
      });
      unreadMap[conv._id] = count;
    }
    res.json(unreadMap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { deletedFor: req.user._id },
    },
    { new: true },
  );
  res.json({ message: "Deleted", data: message });
};

export const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID required" });
    }
    const members = [req.user._id, receiverId].sort();
    const generateKey = () => {
      return crypto.randomBytes(32).toString("hex");
    };
    let conversation = await Conversation.findOneAndUpdate(
      { members },
      {
        $setOnInsert: {
          members,
          encryptionKey: generateKey(),
        },
      },
      { new: true, upsert: true },
    );
    conversation = await Conversation.findById(conversation._id).populate(
      "members",
      "_id name photoUrl",
    );
    res.status(201).json(conversation);
  } catch (error) {
    console.error("createConversation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.error("User not found in request:", req.user);
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Fetching conversations for user:", req.user._id);
    const conversations = await Conversation.find({
      members: req.user._id,
    })
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "name photoUrl" },
      })
      .populate("members", "name photoUrl")
      .sort({ updatedAt: -1 });
    console.log("Conversations fetched:", conversations.length);
    res.json(conversations);
  } catch (error) {
    console.error("Error in getUserConversations:", error);
    try {
      const fallbackConversations = await Conversation.find({
        members: req.user._id,
      }).sort({ updatedAt: -1 });
      console.warn("Returning fallback conversations without populate.");
      return res.json(fallbackConversations);
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      return res
        .status(500)
        .json({ message: "Server Error", error: fallbackError.message });
    }
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { forAll } = req.query;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    if (forAll === "true") {
      await Message.deleteMany({ conversationId });
      await Conversation.findByIdAndDelete(conversationId);
      const io = req.app.get("io");
      conversation.members.forEach((memberId) => {
        io.to(memberId.toString()).emit("deleteConversationForAll", {
          conversationId,
        });
      });
      return res.status(200).json({ message: "Deleted for all" });
    }
    conversation.deletedFor = conversation.deletedFor || [];
    if (!conversation.deletedFor.includes(userId)) {
      conversation.deletedFor.push(userId);
      await conversation.save();
    }
    await Message.updateMany(
      { conversationId },
      { $addToSet: { deletedFor: userId } },
    );
    return res.status(200).json({
      message: "Deleted for current user",
      conversationId,
    });
  } catch (err) {
    console.error("deleteConversation error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
