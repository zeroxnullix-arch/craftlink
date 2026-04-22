import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYMOB_API_URL = process.env.PAYMOB_API_URL;
const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;

(async () => {
  try {
    const auth = await axios.post(`${PAYMOB_API_URL}/auth/tokens`, {
      api_key: PAYMOB_API_KEY,
    });
    const token = auth.data.token;
    const orderId = "501375152";
    const res = await axios.get(`${PAYMOB_API_URL}/ecommerce/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error(error.response ? error.response.status : error.message);
    console.error(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
  }
})();
