import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { useTranslation } from "react-i18next";
const PrivacyPolicy = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <div className="full-width">
        <Header />
      </div>
      <section className="privacy-policy">
        <div className="privacy-container">

          <h1>{t("Privacy Policy")}</h1>
          <p className="last-update">{t("Last Updated: March 2026")}</p>

          <p>
            {t("Welcome to CraftLink. Your privacy is extremely important to us. This Privacy Policy explains in detail how CraftLink collects, processes, uses, stores, and protects your personal information when you access or use our website, mobile applications, and related services.")}
          </p>

          <p>
            {t("CraftLink is a platform designed to connect customers with skilled artisans and service providers.In order to provide these services, certain information must be collected and processed.This document explains exactly what information we collect, why we collect it, how it is used, and what rights you have regarding your personal data.")}
          </p>

          <p>
            {t("By creating an account or using any part of the CraftLink platform, you acknowledge that you have read and understood this Privacy Policy and agree to the practices described in it.")}
          </p>

          <h2>1. {t("Information We Collect")}</h2>

          <p>
            {t("In order to operate effectively and provide a reliable service, CraftLink collects different categories of information from users. The information we collect may include personal information, service-related information, technical data, and usage data.")}
          </p>

          <h3>1.1 {t("Personal Information")}</h3>

          <p>
            {t("Personal information refers to information that can identify an individual directly or indirectly. When users register for a CraftLink account, they may be required to provide personal details that allow us to create and manage their accounts.")}
          </p>

          <p>
            {t("This information may include the user's full name, email address, phone number, and login credentials. In some cases, users may voluntarily provide additional profile information such as profile photos, descriptions, or professional details if they are registering as artisans.")}
          </p>

          <p>
            {t("We collect this information to ensure that each user account is unique, secure, and capable of interacting properly with other users on the platform.")}
          </p>

          <h3>1.2 {t("Account and Profile Information")}</h3>

          <p>
            {t("Users who create artisan profiles may provide additional professional information to showcase their services. This information helps customers understand the skills and experience of artisans before requesting a service.")}
          </p>

          <p>
            {t("Examples of this information may include service categories, work experience, service descriptions, previous work images, service areas, and availability schedules.")}
          </p>

          <p>
            {t("This data is displayed on the platform so customers can make informed decisions when selecting a service provider.")}
          </p>

          <h3>1.3 {t("Service Request Information")}</h3>

          <p>
            {t("When customers submit service requests, CraftLink collects certain information related to the service being requested. This information may include a description of the service, images related to the job, location details, and communication messages exchanged between customers and artisans.")}
          </p>

          <p>
            {t("These details are necessary to ensure that artisans clearly understand the customer's needs and can respond appropriately to service requests.")}
          </p>

          <h3>1.4 {t("Device and Technical Information")}</h3>

          <p>
            {t("When users access the CraftLink platform, certain technical information is automatically collected by our systems. This information helps us understand how the platform is being used and allows us to improve performance and security.")}
          </p>

          <p>
            {t("This technical data may include the user's IP address, device type, browser type, operating system, language preferences, pages visited, session duration, and interaction patterns within the platform.")}
          </p>

          <h3>1.5 {t("Usage Data")}</h3>

          <p>
            {t("Usage data includes information about how users interact with the platform. This may include actions such as browsing service categories, sending messages, creating service requests, leaving reviews, or updating profile information.")}
          </p>

          <p>
            {t("Analyzing this data helps us improve the user experience, optimize system performance, and identify areas where the platform can be enhanced.")}
          </p>

          <h2>2. {t("How We Use Your Information")}</h2>

          <p>
            {t("CraftLink uses collected information for multiple operational, functional, and security purposes.")}
          </p>

          <p>
            {t("The primary purpose of collecting user information is to provide the core functionality of the CraftLink platform. This includes connecting customers with artisans, enabling communication between users, and facilitating service requests.")}
          </p>

          <p>
            {t("In addition, we use user data to improve our services, enhance system performance, analyze user behavior, detect suspicious activity, and ensure compliance with applicable laws and regulations.")}
          </p>

          <h2>3. {t("Communication")}</h2>

          <p>
            {t("CraftLink may send users various types of communications related to their accounts and platform activity.")}
          </p>

          <p>
            {t("These communications may include account notifications, service request updates, security alerts, password reset instructions, customer support responses, and important platform announcements.")}
          </p>

          <p>
            {t("Some communications are essential for the operation of the platform and cannot be disabled. However, users may have the option to manage certain non-essential notifications through their account settings.")}
          </p>

          <h2>4. {t("Information Sharing")}</h2>

          <p>
            {t("CraftLink does not sell personal data to third parties. However, certain information may be shared in specific situations to ensure that the platform functions properly.")}
          </p>

          <h3>4.1 {t("Sharing Between Customers and Artisans")}</h3>

          <p>
            {t("In order for services to be completed successfully, certain information must be shared between customers and artisans.")}
          </p>

          <p>
            {t("This may include names, service descriptions, job locations, and communication messages related to the service request.")}
          </p>

          <h3>4.2 {t("Third-Party Service Providers")}</h3>

          <p>
            {t("CraftLink may work with trusted third-party companies that help us operate the platform. These providers may assist with cloud hosting, data storage, analytics, messaging services, or payment processing.")}
          </p>

          <p>
            {t("These service providers only have access to the information necessary to perform their specific functions and are obligated to protect user data.")}
          </p>

          <h2>5. {t("Data Security")}</h2>

          <p>
            {t("CraftLink takes the protection of user data seriously and implements multiple security measures designed to safeguard personal information.")}
          </p>

          <p>
            {t("These measures may include encrypted communications, secure servers, access controls, monitoring systems, and regular security reviews.")}
          </p>

          <p>
            {t("While we strive to protect all user information, it is important to understand that no online system can guarantee complete security.")}
          </p>

          <h2>6. {t("Data Retention")}</h2>

          <p>
            {t("CraftLink retains personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy.")}
          </p>

          <p>
            {t("Data may also be retained to comply with legal obligations, resolve disputes, enforce agreements, or maintain platform integrity.")}
          </p>

          <h2>7. {t("User Rights")}</h2>

          <p>
            {t("Users have certain rights regarding their personal information. These rights may include the ability to access, update, correct, or request deletion of their personal data.")}
          </p>

          <p>
            {t("Users may also request information about how their data is being used and stored.")}
          </p>

          <h2>8. {t("Cookies and Tracking Technologies")}</h2>

          <p>
            {t("CraftLink uses cookies and similar tracking technologies to enhance the functionality of the platform and improve the browsing experience.")}
          </p>

          <p>
            {t("Cookies allow the platform to remember user preferences, analyze traffic patterns, and provide personalized experiences for returning users.")}
          </p>

          <h2>9. {t("Third-Party Links")}</h2>

          <p>
            {t("The CraftLink platform may contain links to external websites or services that are not operated by us.")}
          </p>

          <p>
            {t("We are not responsible for the privacy practices of these third-party services.")}
          </p>

          <h2>10. {t("Children's Privacy")}</h2>

          <p>
            {t("CraftLink services are intended for adults and individuals who are legally able to enter into service agreements.")}
          </p>

          <p>
            {t("We do not knowingly collect personal information from children under the age of 18.")}
          </p>

          <h2>11. {t("Changes to This Privacy Policy")}</h2>

          <p>
            {t("CraftLink may update this Privacy Policy from time to time to reflect changes in technology, legal requirements, or platform features.")}
          </p>

          <p>
            {t("Any updates will be published on this page with an updated revision date.")}
          </p>

          <h2>12. {t("Contact Information")}</h2>

          <p>
            {t("If you have any questions regarding this Privacy Policy or how your information is handled, please contact our support team.")}
          </p>

          <p>{t("Email")}: support@craftlink.com</p>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;