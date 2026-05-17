import React, { useState } from "react";
import {
  Header,
  Footer,
  AuthInput
} from "@components";
import {
  RiSearch2Line,
  LuSearchX,
} from "@icons";
import { useInputAnimation } from "../../../hooks/useInputAnimation";
import { useTranslation } from "react-i18next";
const helpSections = [
  {
    sectionTitle: "Account Management",
    topics: [
      {
        title: "Sign Up",
        content: [
          "Click 'Sign Up' at the top of the page.",
          "Fill in full name, email, password, and phone number if requested.",
          "Choose a strong password (uppercase, lowercase, numbers, symbols).",
          "Agree to Terms & Privacy Policy, then click 'Create Account'.",
          "Verify your email by clicking the link sent to your inbox.",
          "You can also sign up using Google or Facebook authentication."
        ]
      },
      {
        title: "Sign In",
        content: [
          "Click 'Sign In' and enter your email & password.",
          "Use 'Remember Me' to stay signed in.",
          "You can also sign in via Google or Facebook.",
          "If you experience login issues, contact support."
        ]
      },
      {
        title: "Reset / Forgot Password",
        content: [
          "Click 'Forgot Password' on the Sign In page.",
          "Enter your registered email to receive a password reset link.",
          "Follow instructions in the email to create a new password.",
          "Ensure your new password is strong and not used elsewhere."
        ]
      }
    ]
  },
  {
    sectionTitle: "Courses & Lectures",
    topics: [
      {
        title: "Create Course",
        content: [
          "Go to your instructor dashboard and click 'Create Course'.",
          "Add course title, detailed description, objectives, and category.",
          "Upload a course cover image for branding.",
          "Set price: free or paid. Paid courses require a payment setup.",
          "Publish the course or save as draft to edit later.",
          "You can update content, price, and title anytime from dashboard."
        ]
      },
      {
        title: "Create Lecture",
        content: [
          "Inside your course, click 'Add Lecture'.",
          "Enter lecture title, description, duration, and upload video/documents.",
          "You can also attach additional resources: PDFs, slides, or exercises.",
          "Save the lecture. Edit or reorder lectures anytime.",
          "Preview lecture before publishing to ensure quality."
        ]
      }
    ]
  },
  {
    sectionTitle: "Payments",
    topics: [
      {
        title: "Payment Methods",
        content: [
          "Use credit/debit card, PayPal, or other available methods.",
          "All transactions are encrypted and secure.",
          "Payment for courses unlocks access immediately.",
          "Payment for services secures the order and confirms appointment."
        ]
      },
      {
        title: "Refund Policy",
        content: [
          "Refunds are handled case-by-case: defective content, misleading description, or instructor policy violation.",
          "Keep transaction receipts for your records.",
          "Refunds may take 3-7 business days to process.",
          "Contact support for any refund-related inquiries."
        ]
      }
    ]
  },
  {
    sectionTitle: "Communication",
    topics: [
      {
        title: "Messages",
        content: [
          "Access messages via the Messages icon in dashboard.",
          "Click a conversation to read/reply to users.",
          "Send text, files, or links securely.",
          "Search messages by user name or keyword.",
          "Maintain professional communication at all times.",
          "Report abusive messages using the report button."
        ]
      }
    ]
  },
  {
    sectionTitle: "Account Security",
    topics: [
      {
        title: "Two-Factor Authentication",
        content: [
          "Enable 2FA for extra account security.",
          "Use Google Authenticator or SMS codes.",
          "Always back up your recovery codes safely.",
          "2FA protects against unauthorized access even if password is compromised."
        ]
      },
      {
        title: "Privacy Settings",
        content: [
          "Adjust who can see your profile, courses, and messages.",
          "Control notification preferences.",
          "Manage blocked users and report inappropriate activity."
        ]
      }
    ]
  }
];

// Highlight function
const highlightText = (text, highlight) => {

  if (!highlight) return text;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
};

const HelpCenter = () => {
  const { i18n, t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeSection, setActiveSection] = useState("All Sections");
  const { handleFocus, handleBlur } = useInputAnimation();
  const toggleTopic = (topicKey) => {
    setActiveTopic(activeTopic === topicKey ? null : topicKey);
  };

  // Filtered sections based on search
  const filteredSections = helpSections
    .map((section) => ({
      ...section,
      topics: section.topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.content.some((c) =>
            c.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    }))
    .filter((section) => section.topics.length > 0);

  const activeFilteredSection =
    activeSection === "All Sections"
      ? null
      : filteredSections.find((sec) => sec.sectionTitle === activeSection);

  const sectionsToRender =
    activeSection === "All Sections"
      ? filteredSections
      : activeFilteredSection
        ? [activeFilteredSection]
        : [];

  return (
    <>
      <div className="full-width">

        <Header />
      </div>
      <div className="modern-help-container">
        {/* Sidebar */}
        {/* Main Content */}
        <main className="help-main">
          <div className="wavy-help-center">

            <h1>{t("Help Center")}</h1>

            <AuthInput
              type="text"
              value={searchTerm}
              onChange={setSearchTerm}
              Icon={RiSearch2Line}
              label={t("Search")}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              className="search-input"
            />
            <ul>
              <li
                className={activeSection === "All Sections" ? "active" : ""}
                onClick={() => setActiveSection("All Sections")}
              >
                {t("All")}
              </li>
              {helpSections.map((section, idx) => (
                <li
                  key={idx}
                  className={activeSection === section.sectionTitle ? "active" : ""}
                  onClick={() => setActiveSection(section.sectionTitle)}
                >
                  {t(section.sectionTitle)}
                </li>
              ))}
            </ul>
          </div>
          <div className="help-section-container">
            {sectionsToRender.length === 0 ? (
              <dive className="no-results">
                <LuSearchX />
                <p>{t("No topics found.")}</p>
              </dive>
            ) : (
              sectionsToRender.map((section, idx) => (
                <div key={idx} className="help-section">
                  <h2>{t(section.sectionTitle)}</h2>
                  <div className="accordion-container">
                    {section.topics.map((topic, tIdx) => {
                      const topicKey = `${section.sectionTitle}-${tIdx}`;
                      return (
                        <div
                          key={topicKey}
                          className={`accordion-item ${activeTopic === topicKey ? "active" : ""
                            }`}
                        >
                          <div
                            className="accordion-header"
                            onClick={() => toggleTopic(topicKey)}
                          >
                            <h3>{t(highlightText(topic.title, searchTerm))}</h3>
                            <span>{activeTopic === topicKey ? "-" : "+"}</span>
                          </div>
                          <div className="accordion-content">
                            <ul>
                              {topic.content.map((item, i) => (
                                <li key={i}>{t(highlightText(item, searchTerm))}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;