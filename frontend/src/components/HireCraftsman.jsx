import React from "react";
export default function HireCraftsman() {
  const categories = [
    "Plumbing",
    "Carpentry",
    "Electrical",
    "Painting",
    "Masonry",
    "Roofing",
    "HVAC",
    "Landscaping",
  ];
  return (
    <section className="hire-craftsman-section">
      <div className="content">
        <h2>Need a Skilled Craftsman?</h2>
        <p>
          Find verified and trained professionals ready to help you with your
          next project.
        </p>
        <div className="categories">
          {categories.map((cat) => (
            <span key={cat} className="category">
              #{cat}
            </span>
          ))}
        </div>
        <button className="cta-button">Find a Craftsman</button>
      </div>
    </section>
  );
}
