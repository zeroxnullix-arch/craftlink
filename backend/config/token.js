// Import jsonwebtoken library for JWT operations
import jwt from "jsonwebtoken";
/**
 * Generates a signed JWT (JSON Web Token) for a user.
 * - Uses the user's unique identifier as the payload
 * - Signs the token with the application's secret key
 * - Sets a 7-day expiration for security
 * - Throws an error if signing fails or the secret is missing
 *
 * @param {string} userId - MongoDB user _id or any unique identifier
 * @returns {string} Signed JWT token
 */
const genToken = (userId) => {
  // Ensure the JWT secret is defined in environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment");
  }
  try {
    // Prepare the payload with the user's ID
    const payload = { id: userId };
    // Sign the JWT with the secret and set expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });
    return token;
  } catch (error) {
    // Log and rethrow any errors during signing
    console.error("genToken error:", error.message || error);
    throw error;
  }
};
// Export the token generator for use in authentication flows
export default genToken;