const express = require("express");
const router = express.Router();
router.post("/paymob-webhook", async (req, res) => {
  const data = req.body;
  if (data.success === true) {
    const orderId = data.order.id;
    const userId = data.metadata?.userId;
    const courseId = data.metadata?.courseId;
  }
  res.sendStatus(200);
});

module.exports = router;
