// Import the logout action creator from the user slice
import { logout as userLogout } from "./userSlice";
// Import the action to clear all conversation messages from the message slice
import { clearConversationMessagesForAll } from "./messageSlice";
// Import persistent storage utilities for conversations and messages
import { conversationsStore, messagesStore } from "../utils/storage";
/**
 * performLogout
 *
 * Handles the complete user logout process, including:
 *   - Dispatching Redux actions to clear user and message state
 *   - Clearing persisted conversations and messages from local storage
 *
 * This ensures that all sensitive user data is removed from both memory and disk
 * when a user logs out, providing a secure and clean logout experience.
 *
 * @returns {Function} Thunk action for Redux dispatch
 */
export const performLogout = () => async (dispatch) => {
  // Dispatch the logout action to clear user authentication state from Redux
  dispatch(userLogout());
  // Dispatch action to clear all conversation messages from Redux state
  dispatch(clearConversationMessagesForAll());
  // Clear all persisted conversations from local storage (IndexedDB, etc.)
  await conversationsStore.clear();
  // Clear all persisted messages from local storage
  await messagesStore.clear();
};