import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = Number(process.env.PAYMOB_INTEGRATION_ID);
const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

console.log("=== PAYMOB CONFIGURATION ===");
console.log("API URL:", PAYMOB_API_URL);
console.log("Integration ID:", PAYMOB_INTEGRATION_ID);
console.log("Iframe ID:", PAYMOB_IFRAME_ID);
console.log("Has API Key:", !!PAYMOB_API_KEY);
console.log("API Key (first 50 chars):", PAYMOB_API_KEY?.substring(0, 50));
console.log("");

const testPayment = async () => {
  try {
    console.log("1. Testing auth token...");
    const authRes = await axios.post(`${PAYMOB_API_URL}/auth/tokens`, {
      api_key: PAYMOB_API_KEY,
    });
    console.log("✅ Auth successful!");
    const token = authRes.data.token;

    console.log("\n2. Creating order...");
    const orderRes = await axios.post(`${PAYMOB_API_URL}/ecommerce/orders`, {
      auth_token: token,
      delivery_needed: false,
      amount_cents: 50000, // 500 EGP
      currency: "EGP",
      items: [],
      metadata: { userId: "test123", courseId: "course456" },
    });
    console.log("✅ Order created!");
    console.log("Order ID:", orderRes.data.id);
    const orderId = orderRes.data.id;

    console.log("\n3. Creating payment key...");
    const paymentKeyRes = await axios.post(
      `${PAYMOB_API_URL}/acceptance/payment_keys`,
      {
        auth_token: token,
        amount_cents: 50000,
        expiration: 3600,
        order_id: orderId,
        currency: "EGP",
        integration_id: PAYMOB_INTEGRATION_ID,
        billing_data: {
          first_name: "Test",
          last_name: "User",
          email: "test@test.com",
          phone_number: "01000000000",
          country: "EG",
          city: "Cairo",
          street: "Test Street",
          building: "1",
          floor: "1",
          apartment: "1",
        },
        redirect_url: `http://localhost:5173/payment-success?orderId=${orderId}`,
      }
    );
    console.log("✅ Payment key created!");
    const paymentToken = paymentKeyRes.data.token;

    console.log("\n=== SUCCESS ===");
    console.log("Payment Token:", paymentToken);
    console.log(
      "Iframe URL:",
      `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`
    );
  } catch (error) {
    console.error("\n❌ ERROR:", error.response?.status, error.response?.statusText);
    console.error("Error Data:", JSON.stringify(error.response?.data, null, 2));
    console.error("Error Message:", error.message);
  }
};

testPayment();
