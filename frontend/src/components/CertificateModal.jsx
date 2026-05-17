import React from "react";
import { useTranslation } from "react-i18next";
import CraftLink from '../assets/CraftLink.svg'
const CertificateModal = ({ isOpen, onClose, certificate, courseFallback }) => {
  const { i18n, t } = useTranslation();

  if (!isOpen || !certificate) return null;

  const course = certificate.course || courseFallback;
  const instructorName = certificate.course?.creator?.name || courseFallback?.creator?.name || t("Certified Instructor");
  const userName = certificate.user?.name || t("Student");
  const issueDate = new Date(certificate.issueDate || certificate.createdAt).toLocaleDateString();

  return (
    <div
      className="certificate-modal-overlay"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.75)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        className="certificate-modal-container"
        style={{
          background: "#fff",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          position: "relative",
          color: "#333",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
          }}
        >
          ✕
        </button>

        {/* Certificate Print Area */}
        <div
          className="certificate-print-area"
          style={{
            border: "12px solid #0f172a",
            outline: "2px solid #d4af37",
            outlineOffset: "-6px",
            padding: "40px 50px",
            background: "#fdfdfb",
            textAlign: "center",
            position: "relative",
            borderRadius: "4px",
            boxShadow: "inset 0 0 50px rgba(15, 23, 42, 0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            aspectRatio: "297 / 210",
            minHeight: "520px",
            boxSizing: "border-box",
          }}
        >
          {/* Corner Ornaments */}
          <div className="cert-ornament cert-ornament-tl" style={{ position: "absolute", top: "10px", left: "10px", width: "30px", height: "30px", borderTop: "3px solid #d4af37", borderLeft: "3px solid #d4af37" }} />
          <div className="cert-ornament cert-ornament-tr" style={{ position: "absolute", top: "10px", right: "10px", width: "30px", height: "30px", borderTop: "3px solid #d4af37", borderRight: "3px solid #d4af37" }} />
          <div className="cert-ornament cert-ornament-bl" style={{ position: "absolute", bottom: "10px", left: "10px", width: "30px", height: "30px", borderBottom: "3px solid #d4af37", borderLeft: "3px solid #d4af37" }} />
          <div className="cert-ornament cert-ornament-br" style={{ position: "absolute", bottom: "10px", right: "10px", width: "30px", height: "30px", borderBottom: "3px solid #d4af37", borderRight: "3px solid #d4af37" }} />

          {/* Logo / Header */}
          <div className="cert-logo-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
              <span className="cert-logo-img" style={{ fontSize: "1.8rem" }}><img src={CraftLink} style={{ width: "30px", height: "30px", }} /></span>
              <span className="cert-logo-text" style={{ fontSize: "1.3rem", fontWeight: "bold", letterSpacing: "1px", color: "#0f172a" }}>
                CRAFT<span style={{ color: "#d4af37" }}>LINK</span>
              </span>
            </div>
            <div className="cert-subtitle" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "#94a3b8", fontWeight: "600" }}>
              {t("E-Learning Platform & Community")}
            </div>
          </div>

          {/* Certificate Title */}
          <div className="cert-title-container" style={{ margin: "10px 0" }}>
            <h1 className="cert-title" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>
              {t("Certificate of Completion")}
            </h1>
            <p className="cert-presented" style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
              {t("This is proudly presented to")}
            </p>
          </div>

          {/* Recipient Name */}
          <div className="cert-recipient-container" style={{ margin: "5px 0" }}>
            <h2 className="cert-student-name" style={{ fontSize: "2.1rem", fontWeight: "900", color: "#d4af37", margin: "0 0 4px 0", letterSpacing: "1px" }}>
              {userName}
            </h2>
            <div className="cert-divider" style={{ width: "100px", height: "2px", background: "linear-gradient(90deg, transparent, #0f172a, transparent)", margin: "0 auto 10px auto" }} />
            <p className="cert-course-text" style={{ fontSize: "0.95rem", color: "#475569", maxWidth: "560px", margin: "0 auto", lineHeight: "1.5" }}>
              {t("for successfully completing the specialized training course")}{" "}
              <strong className="cert-course-name" style={{ color: "#0f172a", display: "block", fontSize: "1.15rem", marginTop: "4px", fontWeight: "700" }}>
                "{course?.title}"
              </strong>
            </p>
          </div>

          {/* Signatures & Footer info */}
          <div className="cert-signatures-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "end", borderTop: "1px solid #e2e8f0", paddingTop: "15px", marginTop: "15px" }}>
            {/* Date of Issue */}
            <div style={{ textAlign: "center" }}>
              <span className="cert-sig-text" style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", color: "#0f172a", marginBottom: "4px" }}>
                {issueDate}
              </span>
              <span className="cert-sig-label" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8" }}>
                {t("Date of Issue")}
              </span>
            </div>

            {/* Central Seal */}
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="cert-seal-circle" style={{ width: "45px", height: "45px", background: "linear-gradient(135deg, #d4af37, #aa7c11)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 8px rgba(212, 175, 55, 0.3)", marginBottom: "4px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fff" />
                </svg>
              </div>
              <span className="cert-seal-label" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8", fontWeight: "bold" }}>
                {t("Official Seal")}
              </span>
            </div>

            {/* Certified Instructor */}
            <div style={{ textAlign: "center" }}>
              <span className="cert-sig-text" style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", color: "#0f172a", marginBottom: "4px" }}>
                {instructorName}
              </span>
              <span className="cert-sig-label" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8" }}>
                {t("Instructor")}
              </span>
            </div>
          </div>

          {/* Unique Verification Badge at very bottom corner */}
          <div className="cert-verification-id" style={{ position: "absolute", bottom: "22px", right: "30px", fontSize: "0.65rem", color: "#94a3b8", fontFamily: "monospace" }}>
            {t("Verification ID:")} <span style={{ color: "#0f172a", fontWeight: "bold" }}>{certificate.certificateId}</span>
          </div>
        </div>

        {/* Print and Close buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 24px",
              background: "#1a4e9a",
              color: "#fff",
              backgroundColor: "#1a4e9a",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🖨️ {t("Print Certificate")}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 24px",
              background: "#eee",
              color: "#333",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {t("Close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
