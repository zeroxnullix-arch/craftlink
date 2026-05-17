# CraftLink 🛠️ | كرافت لينك
> **Connecting Skills, Crafting Futures | ربط المهارات، صناعة المستقبل**

---

## 🌟 Overview | نظرة عامة

**CraftLink** is a state-of-the-art interactive e-learning and social community platform designed specifically for craftsmen, artisans, instructors, and trainees. The platform serves as a double-sided ecosystem that bridges the gap between traditional manual crafts and modern digital learning, enabling skilled professionals to monetize their craftsmanship while allowing clients and trainees to learn, obtain certified recognition, and interact in real time.

منصة **كرافت لينك** هي بيئة رقمية متكاملة تجمع بين التعليم الإلكتروني التفاعلي والتواصل المجتمعي، صُممت خصيصاً للحرفيين، المبتكرين، المدربين، والمتدربين. تهدف المنصة إلى سد الفجوة بين المهارات الحرفية التقليدية والتعليم الرقمي الحديث، مما يتيح للمدربين والمهنيين استثمار مهاراتهم، وللمتدربين والعملاء احتراف مهارات جديدة والحصول على شهادات موثقة تفتح لهم آفاقاً مهنية جديدة.

---

## 🚀 Core Features | الميزات الرئيسية

### 1. 🎓 Advanced E-Learning Ecosystem | نظام التعليم الإلكتروني المتكامل
* **Interactive Course Builder**: A complete suite for instructors to create courses with rich visual branding, categorization, pricing, and outlines.
* **Lecture & Playlist Manager**: Ability to upload and catalog sequential video lectures with high-fidelity streaming.
* **Progress Tracking**: Trainees can track their learning progression with granular completion checkboxes and live percentage metrics.
* **Student Review Hub**: Dynamic course rating system where students can write feedback and review artisan programs.

### 2. 🏆 Bespoke A4 Landscape Certificate Engine | نظام الشهادات الموثقة والطباعة الاحترافية
* **Modern Aesthetic Layout**: A stunning, premium template styled in deep slate (`#0f172a`) and gold (`#d4af37`) accents, complete with traditional corner ornaments, an official central seal, and elegant modern typography.
* **Pixel-Perfect A4 Landscape Printing**: Specifically optimized via custom CSS `@media print` queries. When print is initiated:
  * Restructures the workspace to exactly **297mm x 210mm (A4 Landscape dimensions)**.
  * Masks all surrounding HTML wrappers, menus, buttons, and headers, ensuring only the clean, isolated certificate is printed.
  * Enforces `-webkit-print-color-adjust: exact` to render background colors, ornaments, and gradients precisely as seen on the screen.
* **Unique Verification & Anti-Forgery**: Automatically generates a monospaced **Verification ID** in the lower corner of the border, providing a cryptographic link back to the system's database.

### 3. 💬 Real-Time Messenger Chat | نظام المحادثة والدردشة الفورية
* **Socket.io Direct Messaging**: Fast real-time chatting between clients, trainees, and craftsmen.
* **Inbox Management**: A centralized inbox with active session indicators, typing triggers, and chronological message storage.

### 4. 📱 Social Timeline Community | الجدول الزمني والمنتدى الاجتماعي
* **Facebook-Style Social Timeline**: Users can publish text posts and high-resolution images to share their craftsmanship milestones.
* **Cloud Storage & Base64 Uploads**: Multi-source image handling integrated directly with the **Cloudinary** secure CDN.
* **Likes & Nested Comments**: Organized engagement controls for trainees to discuss, react to, and celebrate professional work.
* **Slick Dark Mode Support**: Adaptive UI that shifts all container tokens automatically to dark theme templates.

### 5. 💳 Razorpay Secure Checkout | بوابة الدفع وإدارة الأرباح
* **Seamless Checkout Integration**: Secure checkout processing for trainees buying courses.
* **Fail-Safe Payment Webhooks**: Ensures courses are immediately unlocked upon successful payment transactions.
* **Artisan Wallet System**: Instructors track their lifetime earnings from course sales.
* **Withdrawal Portal**: Artisans can view balances and request payout disbursements.

---

## 🛠️ Technology Stack | التقنيات المستخدمة

### **Frontend (الواجهة الأمامية)**
* **React 19 & Vite**: Ultra-fast hot module replacement (HMR) and lightweight production bundles.
* **Tailwind CSS v4 & Custom CSS**: Utility-first styling combined with targeted, custom stylesheets for the certificate print layout.
* **Redux Toolkit & Redux Persist**: Robust, persisted state management for seamless navigation and cached user data.
* **Framer Motion & GSAP (GreenSock)**: Smooth micro-interactions, spring transitions, page load animations, and gorgeous design polish.
* **i18next & React-i18next**: Total bilingual support mapping translations seamlessly between English and Arabic.
* **Google Fonts Integration**: Dynamic custom font loading (**Outfit** for English; **El Messiri** for Arabic).

### **Backend (الواجهة الخلفية)**
* **Node.js & Express v5**: Scalable asynchronous REST APIs.
* **MongoDB & Mongoose ODM**: Multi-collection schema architecture managing complex relation graphs between Users, Courses, Posts, and Payments.
* **Socket.io**: WebSockets for low-latency chat sessions.
* **Cloudinary Node SDK & Multer**: Multipart file uploads and automated CDN asset hosting.
* **Nodemailer & Resend API**: Transactional mailers handling OTP account verification and password resets.
* **Razorpay Node SDK**: Secure transactions processing.

---

## 👥 Role-Based Access Control | نظام الصلاحيات والأدوار

The application uses an integrated secure numerical role system mapping permissions across the entire platform:

| Role ID | Role Name | Description (الوصف) |
|---|---|---|
| **`0`** | **Admin** | Manages platform status, monitors transactions, handles support, and approves withdrawals. |
| **`1`** | **Craftsman** | Skilled providers looking to share their manual crafts and interact with prospective hiring clients. |
| **`2`** | **Instructor** | Creators who build courses, publish training series, and manage withdrawals. |
| **`3`** | **Client / Trainee** | Users purchasing courses, earning verified certificates, and hiring craftsmen. |

---

## 📂 Project Architecture | بنية مجلدات المشروع

```
e:\CraftLink
├── backend/
│   ├── ai-service/             # Dedicated AI assistance components
│   ├── config/                 # Database connection & env configurations
│   ├── constants/              # System constants (e.g. Roles definitions)
│   ├── controller/             # Business Logic (Auth, Course, Payment, Post, Message, Withdraw)
│   ├── middleware/             # Role authorization, CORS & upload filters
│   ├── model/                  # Mongoose Schemas (User, Course, Lecture, Payment, Post, Message, Certificate)
│   ├── route/                  # Express Router endpoint bindings
│   ├── sockets/                # Socket.io chat handlers
│   └── utils/                  # Helper utilities (Email handlers, Cloudinary streams)
├── frontend/
│   ├── config/                 # API server bindings
│   ├── public/                 # Static brand assets
│   ├── src/
│   │   ├── assets/             # Brand logos, icons, and SVG illustrations
│   │   ├── components/         # Global reusable UI (CertificateModal, ScrollToTop, Loaders)
│   │   ├── customHooks/        # Custom React hooks (useCurrentUser, useGetPublishedCourse)
│   │   ├── locales/            # Localization dictionary files (ar/en JSON maps)
│   │   ├── pages/              # Platform Pages (Main Landing, TimeLine, Profile, Message, Withdraw, PlayCourse)
│   │   ├── redux/              # Redux slices, store configurations & persist setup
│   │   ├── styles/             # Design token frameworks & custom global CSS (global.css)
│   │   └── utils/              # Client side helper routines
│   └── vite.config.js          # Vite bundler parameters
```

---

## 🔑 Environment Variables Setup | إعدادات متغيرات البيئة

### 🖥️ Backend Setup (`backend/.env`)
Create a `.env` file inside the `backend` folder and populate it with the following configuration keys:

```env
# Server Config
PORT=8000
NODE_ENV=production

# Database
MONGODB_URL="your-mongodb-atlas-connection-string"

# JWT Authentication
JWT_SECRET="your-highly-secure-jwt-secret-string"

# Resend / Email Settings (SMTP OTP service)
USER_EMAIL="your-smtp-email@gmail.com"
USER_PASSWORD="your-smtp-app-password"
RESEND_API_KEY="re_your_resend_api_key_if_used"

# Cloudinary Storage
CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"

# Paymob/Razorpay Gateway credentials
PAYMOB_API_KEY="your-paymob-api-key"
PAYMOB_INTEGRATION_ID="your-paymob-integration-id"
PAYMOB_API_URL="https://accept.paymobsolutions.com/api"
PAYMOB_IFRAME_ID="your-iframe-id"

# Development Flags
BYPASS_OTP=false
```

### 🎨 Frontend Setup (`frontend/.env`)
Create a `.env` file inside the `frontend` folder:

```env
# Firebase credentials for client integration
VITE_FIREBASE_APIKEY="your-firebase-api-key"

# Optional: Override local dev server URL
# VITE_SERVER_URL="http://localhost:8000"
```

---

## 🚀 Installation & Running Guide | خطوات التثبيت والتشغيل

### Prerequisites
* Install **Node.js** (v18 or higher recommended)
* Install **MongoDB** (or have a MongoDB Atlas cloud URI ready)

### 1️⃣ Start the Backend Server
```bash
cd backend
npm install
npm run dev
```
*The backend server should connect to MongoDB and start listening on `http://localhost:8000`.*

### 2️⃣ Start the Frontend Client
```bash
cd frontend
npm install
npm run dev
```
*The React development client will launch and serve on `http://localhost:5173`.*

---

## 🖨️ Pixel-Perfect Certificate Print System Details | تفاصيل نظام الطباعة المطور للشهادات

The platform provides a state-of-the-art printable certificate built on responsive HTML elements coupled with precision print stylesheets in [global.css](file:///e:/CraftLink/frontend/src/styles/global.css).

```css
/* How the print architecture isolates and resizes the certificate card */
@media print {
  @page {
    size: A4 landscape;
    margin: 0;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    overflow: hidden !important;
  }

  /* Hide everything except the certificate modal overlay container */
  body * {
    visibility: hidden !important;
  }
  .certificate-modal-overlay,
  .certificate-modal-overlay * {
    visibility: visible !important;
  }

  /* Force exactly A4 Landscape dimensions */
  .certificate-print-area {
    width: 297mm !important;
    height: 210mm !important;
    border: 18px solid #0f172a !important;
    outline: 3px solid #d4af37 !important;
    outline-offset: -9px !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

### Highlights of the Print Engine:
1. **Perfect Centering**: Uses translate transforms and absolute centering to position the certificate right in the middle of the physical paper.
2. **Dynamic Scaling**: Scale-independent layout parameters keep typography, logos, digital signature lines, and the official gold seal correctly proportioned on both digital screens and physical paper.
3. **Arabic & English Typography Integration**: Utilizes beautiful local font faces tailored for the respective language, maintaining layout integrity without text truncation.
4. **Verification Stamp**: A designated `monospace` Verification ID is perfectly embedded inside the bottom-right border frame to ensure authenticity.

---

## 🔗 Major API Endpoints | مسارات الـ API الرئيسية

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` - Create a new user profile.
* `POST /api/auth/login` - Sign in and receive secure session cookie.
* `POST /api/auth/verify-otp` - Verify email OTP.
* `POST /api/auth/reset-password` - Trigger reset sequence.

### 📚 Course Management (`/api/course`)
* `POST /api/course` - Create a new course (Instructor/Craftsman).
* `GET /api/course` - List all published courses.
* `GET /api/course/:courseId` - Retrieve detailed course parameters with lecture outline.
* `POST /api/course/lecture/:courseId` - Add a new lecture to a course.

### 💳 Payments (`/api/payment`)
* `POST /api/payment/checkout` - Initialize Razorpay/Paymob checkout order.
* `POST /api/payment/webhook` - Transaction validation callback from the gateway.

### 📱 Timeline Community (`/api/post`)
* `POST /api/post` - Create a text/multimedia post.
* `GET /api/post` - Fetch all posts for the global timeline feed.
* `PATCH /api/post/:postId/like` - Toggle like/unlike react on a post.
* `POST /api/post/:postId/comment` - Leave a comment.

### 💬 Chat Messenger (`/api/message`)
* `GET /api/message/conversations` - Fetch list of active message threads.
* `GET /api/message/:userId` - Fetch complete message history with a specific professional.

---

## 📄 License | الترخيص

This project is licensed under the **ISC License**. Developed as a specialized, premium platform for craft enablement.

صُنع بكل حب لتمكين الحرفيين والمدربين، وربط المهارات بالمستقبل! 🛠️✨
