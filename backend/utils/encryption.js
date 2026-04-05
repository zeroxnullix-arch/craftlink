import crypto from "crypto";
const algorithm = "aes-256-cbc";
/**
 * Encrypts a plain text string using AES-256-CBC.
 * - Generates a random IV for each encryption for security
 * - Uses a provided key (hex string, 32 bytes for AES-256)
 * - Returns a string in the format: iv:encryptedHex
 *
 * @param {string} text - The plain text to encrypt
 * @param {string} key - The encryption key (hex string)
 * @returns {string} The result in the format iv:encryptedHex
 */
export const encrypt = (text, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex").slice(0, 32),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};
/**
 * Decrypts a ciphertext string produced by the encrypt() function above.
 * - Expects input in the format: iv:encryptedHex
 * - Uses the provided key (hex string) for decryption
 * - Returns the decrypted plain text
 *
 * @param {string} text - The encrypted string (iv:encryptedHex)
 * @param {string} key - The decryption key (hex string)
 * @returns {string} The decrypted plain text
 */
export const decrypt = (text, key) => {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex").slice(0, 32),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};