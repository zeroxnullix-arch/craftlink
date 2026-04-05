import React from "react";
const PopUpTerms = ({ onClose, onAccept }) => {
  const termsData = [
    {
      title: "1. Platform Purpose",
      subTitle: "The platform connects :",
      items: [
        { text: "Instructors who publish training courses" },
        { text: "Craftsmen who learn skills to improve their career" },
        {
          text: "Clients who request practical services from trained craftsmen",
        },
      ],
      note: "We are not a hiring company; we only act as a bridge between parties.",
    },
    {
      title: "2. User Responsibilities",
      subTitle: "All users agree to :",
      items: [
        { text: "Provide accurate personal and professional information" },
        { text: "Use the platform ethically and legally" },
        { text: "Avoid posting harmful, false, or inappropriate content" },
        { text: "Not attempt to hack, disrupt, or misuse platform features" },
      ],
    },
    {
      title: "3. Instructor (Trainer) Obligations",
      subTitle: "Instructors must agree that :",
      items: [
        { text: "All uploaded courses must be original content" },
        { text: "Illegal or copied content is strictly prohibited" },
        {
          text: "Courses must provide real value and clear educational structure",
        },
        {
          text: "Refunds may apply if course violates platform quality standards",
        },
        { text: "Communication with trainees must remain professional" },
      ],
      note: "The platform may remove or suspend any course that violates guidelines.",
    },
    {
      title: "4. Craftsman / Trainee Responsibilities",
      subTitle: "Trainees agree to :",
      items: [
        { text: "Provide correct information when purchasing any course" },
        { text: "Not share course content outside the platform" },
        { text: "Not resell or redistribute training videos or materials" },
        {
          text: "Understand that skill improvement depends on their practice and commitment",
        },
      ],
      note: "The platform is not responsible for personal results or lack of progress.",
    },
    {
      title: "5. Client Responsibilities",
      subTitle: "Clients requesting services from craftsmen agree to :",
      items: [
        { text: "Provide accurate job details and requirements" },
        {
          text: "Pay agreed amounts directly through the platform (if available)",
        },
        { text: "Avoid fraud, scams, or unreasonable requests" },
        { text: "Maintain professional communication" },
      ],
      note: "The platform is not responsible for disputes between clients and craftsmen but may intervene when necessary.",
    },
    {
      title: "6. Payments and Refunds",
      subTitle: "By purchasing any course or service, you agree to :",
      items: [
        { text: "Pay the full required amount" },
        {
          text: "Understand that refunds are only available when :",
          subItems: [
            "The course is defective",
            "Content is misleading",
            "Instructor violates platform policies",
          ],
        },
      ],
      note: "The platform reserves the right to review refund requests case-by-case.",
    },
    {
      title: "7. Content Ownership",
      subTitle:
        "All course materials, videos, texts, and graphics are protected by copyright. Users are strictly prohibited from :",
      items: [
        { text: "Downloading" },
        { text: "Copying" },
        { text: "Sharing" },
        { text: "Re-uploading" },
        { text: "Selling" },
      ],
      note: "Any violation may result in permanent suspension and legal action.",
    },
    {
      title: "8. Platform Disclaimer",
      subTitle: "The platform does not guarantee :",
      items: [
        { text: "Employment for craftsmen" },
        { text: "Income generation" },
        { text: "Skill level improvement" },
        { text: "Accuracy of course content" },
        { text: "Success of any job request" },
      ],
      note: "Users participate at their own responsibility.",
    },
    {
      title: "9. Liability Limitation",
      subTitle: "We are not liable for :",
      items: [
        { text: "Personal losses or damages" },
        { text: "Business or financial issues" },
        { text: "Misuse of information" },
        { text: "Disputes between user types" },
      ],
      note: "We only provide the communication and learning environment.",
    },
    {
      title: "10. Changes to Terms",
      note: "We reserve the right to update or change these Terms of Use at any time without prior notice.",
    },
  ];
  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content">
          <div className="popup-terms">
            <h2>Terms of Use (CraftLink Platform)</h2>
            <span>Last Updated: [Today’s Date]</span>
            <p>
              Welcome to our platform for professional craft training and work
              opportunities (“the Platform”). By using this website or mobile
              application, you agree to the following Terms of Use.
            </p>
            <span>These terms apply to three types of users :</span>
            <ul>
              <li>Instructor (course creator / trainer)</li>
              <li>Craftsman / Trainee (course buyer / skill learner)</li>
              <li>Client (person requesting service from the craftsman)</li>
            </ul>
            {termsData.map((section, index) => (
              <div key={index} className="terms-section">
                <h3>{section.title}</h3>
                {section.subTitle && (
                  <p className="sub-title">{section.subTitle}</p>
                )}
                {section.items && (
                  <ul className="main-list">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        {item.text}
                        {item.subItems && (
                          <ul className="sub-list">
                            {item.subItems.map((sub, subIdx) => (
                              <li key={subIdx}>{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && <p className="note">{section.note}</p>}
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={onAccept}>
              <span>Accept</span>
            </button>
            <button onClick={onClose}>
              <span>Decline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpTerms;
