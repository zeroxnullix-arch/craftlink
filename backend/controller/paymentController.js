// backend/controller/paymentController.js
import axios from "axios";
import Course from "../model/courseModel.js";

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = Number(process.env.PAYMOB_INTEGRATION_ID);
const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

/* ================== CREATE PAYMENT ================== */

const getAuthToken = async () => {
  const res = await axios.post(`${PAYMOB_API_URL}/auth/tokens`, {
    api_key: PAYMOB_API_KEY,
  });
  return res.data.token;
};

const createOrder = async (authToken, amount, userId, courseId) => {
  const res = await axios.post(`${PAYMOB_API_URL}/ecommerce/orders`, {
    auth_token: authToken,
    delivery_needed: false,
    amount_cents: amount * 100,
    currency: "EGP",
    items: [],
    metadata: { userId, courseId },
  });
  return res.data.id;
};

const createPaymentKey = async (authToken, orderId, amount) => {
  const res = await axios.post(`${PAYMOB_API_URL}/acceptance/payment_keys`, {
    auth_token: authToken,
    amount_cents: amount * 100,
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
  });
  return res.data.token;
};

// ================== CREATE PAYMENT (React iframe) ==================
export const createPayment = async (req, res) => {
  try {
    const { amount, userId, courseId } = req.body;

    const authToken = await getAuthToken();
    const orderId = await createOrder(authToken, amount, userId, courseId);
    const paymentKey = await createPaymentKey(authToken, orderId, amount);

    const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;

    // ✅ لو عايز تفعل الكورس فورًا بعد الدفع (React side)
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledCraftsmen: userId },
    });

    res.json({ success: true, iframeUrl });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
};

/* ================== PAYMENT CALLBACK / WEBHOOK ================== */
export const paymentCallback = async (req, res) => {
  try {
    const { success, obj } = req.body;

    if (!success) {
      return res.status(400).json({ message: "Payment failed" });
    }

    // ⚠️ تحقق من شكل obj حسب Paymob webhook
    const courseId = obj?.order?.metadata?.courseId || obj?.metadata?.courseId;
    const userId = obj?.order?.metadata?.userId || obj?.metadata?.userId;

    if (!courseId || !userId) {
      return res.status(400).json({ message: "Missing courseId or userId" });
    }

    // ✅ أضف المستخدم للكورس بعد الدفع
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledCraftsmen: userId },
    });

    res.status(200).json({ message: "Course unlocked" });
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
