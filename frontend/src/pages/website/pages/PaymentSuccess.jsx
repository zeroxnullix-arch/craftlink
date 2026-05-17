import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "@services/api";
import { toast } from "react-toastify";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("verifying"); // verifying, success, failed
  const [courseId, setCourseId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPaymentWithRetry = async () => {
      const orderId = searchParams.get("orderId");
      if (!orderId) {
        setStatus("failed");
        setError("Invalid payment session - missing orderId");
        toast.error("Invalid payment session");
        setTimeout(() => navigate("/"), 3000);
        return;
      }

      setLoading(true);
      setStatus("verifying");

      const maxAttempts = 6;
      const delayMs = 2500;
      let attempt = 0;
      let lastError = null;

      while (attempt < maxAttempts) {
        attempt += 1;
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        try {
          const res = await api.post(
            `/api/payment/verify-payment`,
            { orderId },
            { withCredentials: true }
          );

          if (res.data.success) {
            setCourseId(res.data.course);
            setStatus("success");
            toast.success("Payment successful! You now have access to the course.");
            setLoading(false);

            setTimeout(() => {
              navigate(`/viewcourse/${res.data.course}`);
            }, 2000);
            return;
          }

          lastError = res.data.message || "Payment verification failed";
          console.log(`Verify attempt ${attempt} failed:`, res.data);

          if (attempt === maxAttempts) {
            break;
          }
        } catch (err) {
          lastError = err.response?.data?.message || err.message || "Failed to verify payment";
          console.error(`Verify attempt ${attempt} error:`, err);
          if (attempt === maxAttempts) {
            break;
          }
        }
      }

      setStatus("failed");
      setError(lastError || "Payment verification failed after retrying.");
      toast.error("Payment verification failed: " + (lastError || "Unknown error"));
      setTimeout(() => {
        navigate("/");
      }, 4000);
      setLoading(false);
    };

    verifyPaymentWithRetry();
  }, [searchParams, navigate]);

  return (
    <>
      <div className="full-width">

        <Header />
      </div>
      <div className="pay-container">
        <div className="pay-card">

          {status === "verifying" && (
            <>
              <div className="pay-spinner"></div>
              <h2 className="pay-title">Processing Payment</h2>
              <p className="pay-text">Please wait while we verify your payment...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="pay-icon success">
                ✓
              </div>
              <h1 className="pay-title">Payment Successful!</h1>
              <p className="pay-text">
                Thank you for your purchase. You now have access to the course.
              </p>
              <p className="pay-small-text">Redirecting to course page...</p>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="pay-icon error">
                ✕
              </div>
              <h1 className="pay-title">Payment Failed</h1>
              <p className="pay-text">
                {error || "We couldn't verify your payment. Please try again."}
              </p>
              <p className="pay-small-text">Redirecting to home page...</p>
            </>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;