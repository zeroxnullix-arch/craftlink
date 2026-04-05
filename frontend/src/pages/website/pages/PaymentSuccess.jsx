import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@services/api";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
useEffect(() => {
  toast.success("Payment successful!");
  navigate(`/viewcourse/${courseId}`);
}, []);

  return (
    <div>
      {loading ? "Processing payment..." : (
        <div>
          <h1>Payment Success!</h1>
          <button onClick={() => navigate(`/viewcourse/${courseId}`)}>
            Go to Course
          </button>
        </div>
      )}
    </div>
  );
};
export default PaymentSuccess;