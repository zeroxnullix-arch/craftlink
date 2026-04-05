// Import localforage for robust, async (IndexedDB, WebSQL, or localStorage)
import localforage from "localforage";
// ===================== Store Instances =====================
// Create a persistent store for all conversations (thread metadata)
export const conversationsStore = localforage.createInstance({
  name: "CraftLinkChat",      // Database name (namespace)
  storeName: "conversations", // Store for conversation lists
});
// Create a persistent store for all messages (per conversation)
export const messagesStore = localforage.createInstance({
  name: "CraftLinkChat",      // Database name (namespace)
  storeName: "messages",      // Store for message data
});
// ================= Conversation Operations =================
/**
 * Persist the entire conversations array to local storage.
 * Overwrites any previous data for the 'all' key.
 *
 * @param {Array} conversations - Array of conversation objects
 */
export const saveConversations = async (conversations) => {
  await conversationsStore.setItem("all", conversations);
};
/**
 * Retrieve all conversations from local storage.
 * Returns an empty array if nothing is stored.
 *
 * @returns {Promise<Array>} Array of conversation objects
 */
export const getConversations = async () => {
  return (await conversationsStore.getItem("all")) || [];
};
// ==================== Message Operations ====================
/**
 * Persist all messages for a specific conversation.
 * Uses a unique key per conversation for efficient lookup.
 *
 * @param {string} conversationId - Unique conversation identifier
 * @param {Array} messages - Array of message objects
 */
export const saveMessages = async (conversationId, messages) => {
  await messagesStore.setItem(`messages_${conversationId}`, messages);
};
/**
 * Retrieve all messages for a specific conversation.
 * Returns an empty array if no messages are found.
 *
 * @param {string} conversationId - Unique conversation identifier
 * @returns {Promise<Array>} Array of message objects
 */
export const getMessagesForConversation = async (conversationId) => {
  return (
    (await messagesStore.getItem(`messages_${conversationId}`)) || []
  );
};
/**
 * Remove all messages for a specific conversation from storage.
 *
 * @param {string} conversationId - Unique conversation identifier
 */
export const clearMessagesForConversation = async (conversationId) => {
  await messagesStore.removeItem(`messages_${conversationId}`);
};
/**
 * Retrieve all message keys currently stored.
 * Useful for maintenance, migration, or analytics.
 *
 * @returns {Promise<Array<string>>} Array of message storage keys
 */
export const getAllMessageKeys = async () => {
  return await messagesStore.keys();
};