import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://craftlink-production.up.railway.app";
const TEST_ORDER_ID = "501375152"; // From the logs

(async () => {
  try {
    console.log("Testing payment verification with fallback...");

    // First, try to login to get a token (you'll need to replace with actual credentials)
    console.log("Note: You'll need to login first to get a valid session cookie");
    console.log("Testing with orderId:", TEST_ORDER_ID);

    // This would normally require authentication, but let's see what happens
    const res = await axios.post(`${BASE_URL}/api/payment/verify-payment`, {
      orderId: TEST_ORDER_ID
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Verification result:", res.data);

  } catch (error) {
    console.error("Error:", error.response?.status, error.response?.data || error.message);
  }
})();