import CryptoJS from "crypto-js";
/**
 * Encrypts a plain text string using AES-CBC mode with PKCS7 padding.
 * - Generates a random IV for each encryption for security
 * - Uses a provided key (hex string) for encryption
 * - Returns a string in the format: iv:encryptedHex
 *
 * @param {string} text - The plain text to encrypt
 * @param {string} key - The encryption key (hex string)
 * @returns {string} The result in the format iv:encryptedHex, or empty string on error
 */
export const encrypt = (text, key) => {
  if (!text || !key) return "";
  const iv = CryptoJS.lib.WordArray.random(16);
  const keyWA = CryptoJS.enc.Hex.parse(key);
  const encrypted = CryptoJS.AES.encrypt(text, keyWA, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return (
    iv.toString(CryptoJS.enc.Hex) +
    ":" +
    encrypted.ciphertext.toString(CryptoJS.enc.Hex)
  );
};
/**
 * Decrypts a ciphertext string produced by the encrypt() function above.
 * - Expects input in the format: iv:encryptedHex
 * - Uses the provided key (hex string) for decryption
 * - Returns the decrypted plain text, or an error message on failure
 *
 * @param {string} ciphertext - The encrypted string (iv:encryptedHex)
 * @param {string} key - The decryption key (hex string)
 * @returns {string} The decrypted plain text, or '[Failed to decrypt]' on error
 */
export const decrypt = (ciphertext, key) => {
  if (!ciphertext || !key) return "[Failed to decrypt]";
  const parts = ciphertext.split(":");
  if (parts.length !== 2) return "[Failed to decrypt]";
  try {
    const [ivHex, encryptedHex] = parts;
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const keyWA = CryptoJS.enc.Hex.parse(key);
    const encryptedWA = CryptoJS.enc.Hex.parse(encryptedHex);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedWA,
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, keyWA, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText || "[Failed to decrypt]";
  } catch (err) {
    console.error("Decrypt error:", err, ciphertext);
    return "[Failed to decrypt]";
  }
};