import React from "react";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Grow Your Skills or Business?</h2>
        <p>
          Join our community and start learning or offering your professional
          services with ease. Take the next step in your career today!
        </p>
        <div className="cta-buttons">
          <button className="btn btn-instructor">Join as Instructor</button>
          <button className="btn btn-craftsman">Become a Craftsman</button>
        </div>
      </div>
      <div className="cta-illustration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </section>
  );
}
