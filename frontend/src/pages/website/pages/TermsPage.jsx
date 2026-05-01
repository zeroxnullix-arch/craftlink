import React from "react";
import {
  Header,
  Footer,
} from "@components";
import { useTranslation } from "react-i18next";
const TermsPage = () => {
 const { i18n, t } = useTranslation();
  const termsData = [
    {
      title: "1. Platform Purpose",
      subTitle: "CraftLink is designed to provide a reliable, secure, and professional environment by connecting the following parties:",
      items: [
        { text: "Instructors: Individuals who create, design, and publish training courses on the platform to teach skills and knowledge in a structured way." },
        { text: "Craftsmen / Trainees: Individuals seeking to improve their practical skills by learning from instructors’ courses or by acquiring direct services." },
        { text: "Clients: Individuals or companies requesting specific practical services from trained craftsmen through the platform." },
      ],
      note: "CraftLink strictly functions as an intermediary platform and does not act as an employer, staffing agency, or guarantee employment outcomes. The platform only facilitates connections, communications, and transactions between parties.",
    },
    {
      title: "2. User Responsibilities",
      subTitle: "All users of CraftLink are expected to adhere to the following responsibilities to maintain trust, fairness, and legality on the platform:",
      items: [
        { text: "Provide accurate and complete personal and professional information when creating accounts, including legal name, email, phone number, and any professional credentials relevant to the platform." },
        { text: "Maintain ethical and lawful use of the platform, avoiding any activities that violate local, national, or international laws." },
        { text: "Avoid posting, sharing, or transmitting content that is harmful, offensive, discriminatory, illegal, or otherwise inappropriate." },
        { text: "Not attempt to access accounts, systems, or content of other users without explicit permission (i.e., hacking, phishing, or exploiting system vulnerabilities)." },
        { text: "Respect other users’ privacy and personal information; any misuse may result in suspension or permanent banning." },
      ],
    },
    {
      title: "3. Instructor (Trainer) Obligations",
      subTitle: "Instructors creating courses on CraftLink must comply with the following:",
      items: [
        { text: "Ensure all course content is original, authentic, and not copied from other sources unless permission is granted." },
        { text: "Do not publish illegal content, adult content, or copyrighted material without authorization." },
        { text: "Provide clear learning objectives, structured lessons, and practical examples where applicable." },
        { text: "Maintain professional communication with trainees, responding politely and promptly to questions or concerns." },
        { text: "Offer refunds or corrections if a course fails to meet platform quality standards, according to CraftLink’s review policies." },
      ],
      note: "CraftLink reserves the right to remove courses that violate these standards, issue warnings, or suspend instructors temporarily or permanently.",
    },
    {
      title: "4. Craftsman / Trainee Responsibilities",
      subTitle: "Users learning skills or purchasing courses must understand and agree to the following responsibilities:",
      items: [
        { text: "Provide accurate information during registration and course purchases." },
        { text: "Do not distribute course content outside the platform or share login credentials with others." },
        { text: "Do not resell or redistribute any training videos, texts, or materials provided by instructors." },
        { text: "Understand that skill improvement depends on their own practice, effort, and commitment to applying knowledge learned." },
        { text: "Give fair feedback and ratings to instructors, avoiding false or malicious reviews." },
      ],
      note: "CraftLink does not guarantee personal progress or skill mastery. Users assume responsibility for their own learning outcomes.",
    },
    {
      title: "5. Client Responsibilities",
      subTitle: "Clients requesting services from craftsmen agree to:",
      items: [
        { text: "Provide detailed and accurate descriptions of requested work, including project scope, deadlines, and special requirements." },
        { text: "Pay agreed amounts fairly, using the platform’s secure payment methods whenever available." },
        { text: "Communicate professionally, politely, and clearly with craftsmen to avoid misunderstandings." },
        { text: "Avoid fraudulent requests, scams, or attempts to manipulate the service provider." },
      ],
      note: "CraftLink is not responsible for disputes arising between clients and craftsmen. However, we may intervene in cases of clear violation of policies or fraud.",
    },
    {
      title: "6. Payments and Refunds",
      subTitle: "Financial transactions must comply with the following rules:",
      items: [
        { text: "Users must pay the full amount for courses or services before access is granted." },
        { text: "Refunds are only considered in cases where:" ,
          subItems: [
            "The course is defective, misleading, or incomplete",
            "The instructor provides false information or violates platform policies",
            "The client receives a service significantly different from the agreed terms"
          ]
        },
        { text: "Partial refunds may be offered at CraftLink’s discretion after review." },
      ],
      note: "All refund requests are reviewed individually. CraftLink has the right to approve, partially approve, or deny refunds based on evidence and fairness.",
    },
    {
      title: "7. Content Ownership and Intellectual Property",
      subTitle: "All intellectual property (IP) rules include:",
      items: [
        { text: "All course materials, videos, texts, graphics, and images uploaded to CraftLink remain property of the creator or rights holder." },
        { text: "Users are strictly prohibited from downloading, copying, sharing, re-uploading, or selling content without explicit permission." },
        { text: "Violations of IP rights may result in permanent suspension, legal action, or reporting to relevant authorities." },
        { text: "CraftLink may use aggregated, anonymized data for analytics, marketing, or internal reporting without identifying individual users." },
      ],
      note: "Respecting copyright and intellectual property is mandatory for all users.",
    },
    {
      title: "8. Platform Disclaimer",
      subTitle: "CraftLink provides services as a facilitator only and does not guarantee:",
      items: [
        { text: "Employment opportunities or job placement for any user" },
        { text: "Income generation from learning or services" },
        { text: "Improvement of skill levels or professional capabilities" },
        { text: "Accuracy, completeness, or relevance of course or service content" },
        { text: "Satisfaction or success of any service request" },
      ],
      note: "Users participate at their own risk, and CraftLink is not liable for personal or financial outcomes.",
    },
    {
      title: "9. Liability Limitation",
      subTitle: "CraftLink is not liable for:",
      items: [
        { text: "Personal losses, injuries, or damages experienced while using the platform" },
        { text: "Financial or business-related losses from transactions on the platform" },
        { text: "Misuse of information exchanged through the platform" },
        { text: "Disputes between different user types (Instructor, Trainee, Client)" },
      ],
      note: "CraftLink only provides an environment for communication, learning, and service facilitation.",
    },
    {
      title: "10. Changes to Terms",
      subTitle: "CraftLink may update these Terms of Use at any time:",
      items: [
        { text: "Changes may include new rules, modifications, or clarifications." },
        { text: "Users are responsible for regularly reviewing the Terms of Use." },
        { text: "Continued use of the platform after updates constitutes agreement to new terms." },
      ],
      note: "CraftLink may notify users of significant changes via email or platform notifications.",
    },
  ];

  return (
    <>
    <div className="full-width">
        <Header/>
    </div>
    <section className="terms-page">
      <div className="terms-container">

        <h1>{t("CraftLink Terms of Use")}</h1>
        <span className="last-update">{t("Last Updated: March 13, 2026")}</span>

        <p>
          {t("Welcome to CraftLink, a platform connecting Instructors, Craftsmen / Trainees, and Clients. These Terms of Use explain in extreme detail the rules, responsibilities, rights, and limitations of each user type on the platform. By using CraftLink, you agree to comply fully with these Terms.")}
        </p>

        {termsData.map((section, index) => (
          <div key={index} className="terms-section">
            <h3>{t(section.title)}</h3>
            {section.subTitle && <p className="sub-title">{t(section.subTitle)}</p>}
            {section.items && (
              <ul className="main-list">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    {t(item.text)}
                    {item.subItems && (
                      <ul className="sub-list">
                        {item.subItems.map((sub, subIdx) => (
                          <li key={subIdx}>{t(sub)}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {section.note && <p className="note">{t(section.note)}</p>}
          </div>
        ))}

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default TermsPage;