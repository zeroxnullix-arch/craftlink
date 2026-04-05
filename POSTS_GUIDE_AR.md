# نظام نشر البوستات - دليل التشغيل

## 📋 الميزات

✅ **إنشاء البوستات**: انشر نصوص وصور  
✅ **الإعجابات**: أعجب بالبوستات الأخرى  
✅ **التعليقات**: اترك تعليقاتك على البوستات  
✅ **حذف البوستات**: احذف بوستاتك الخاصة  
✅ **Dark Mode**: دعم الوضع الليلي  

---

## 🚀 البدء السريع

### 1️⃣ تفعيل Backend

تأكد من أن `backend/index.js` يحتوي على:

```javascript
import postRouter from "./route/postRoute.js";

// أضفها إلى التطبيق:
app.use("/api/post", postRouter);
```

### 2️⃣ المسارات المتاحة

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| POST | `/api/post` | إنشاء بوست جديد |
| GET | `/api/post` | الحصول على جميع البوستات |
| GET | `/api/post/user/:userId` | الحصول على بوستات مستخدم محدد |
| PATCH | `/api/post/:postId` | تعديل البوست |
| DELETE | `/api/post/:postId` | حذف البوست |
| PATCH | `/api/post/:postId/like` | الإعجاب/عدم الإعجاب بالبوست |
| POST | `/api/post/:postId/comment` | إضافة تعليق |
| DELETE | `/api/post/:postId/comment/:commentId` | حذف تعليق |

---

## 📁 البنية

### Backend
```
backend/
├── model/
│   └── postModel.js          # نموذج البيانات
├── controller/
│   └── postController.js     # منطق العمليات
├── route/
│   └── postRoute.js          # المسارات
└── index.js                  # تسجيل المسارات
```

### Frontend
```
frontend/src/pages/admin/pages/
├── TimeLine.jsx                    # الصفحة الرئيسية
└── components/
    ├── CreatePost.jsx              # مكون إنشاء البوست
    ├── CreatePost.css              # أنماط إنشاء البوست
    ├── PostCard.jsx                # مكون عرض البوست
    └── PostCard.css                # أنماط البوست
```

---

## 💾 نموذج البيانات

```javascript
{
  author: ObjectId,              // مرجع للمستخدم
  content: String,               // محتوى البوست
  images: [String],              // قائمة الصور
  likes: [ObjectId],             // قائمة معرفات المستخدمين الذين أعجبهم
  comments: [                    // التعليقات
    {
      userId: ObjectId,
      userName: String,
      userPhoto: String,
      text: String,
      createdAt: Date
    }
  ],
  shares: Number,                // عدد المشاركات
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 التصميم

يستخدم النظام تصميماً مشابهاً لـ Facebook مع:
- **Dark Mode Support**: تغيير تلقائي حسب الإعدادات
- **Responsive Design**: يعمل على جميع الأجهزة
- **Real-time Updates**: تحديث فوري للبوستات والتعليقات

---

## 🔧 التخصيص

### تغيير الألوان/التصميم

عدّل في `CreatePost.css` و `PostCard.css`:

```css
/* اللون الأساسي */
.post-btn {
  background: #007bff; /* غيّره حسب رغبتك */
}

/* اللون في الوضع الليلي */
.dark .create-post-card {
  background: #2a2a2a; /* غيّره */
  color: #fff;
}
```

### تعطيل ميزات معينة

في `PostCard.jsx`، يمكنك تعطيل الأزرار التي تريدها:

```javascript
{/* اخف 💬 Comment */}
{/* <button className="post-action">💬 Comment</button> */}

{/* اخف ↗️ Share */}
{/* <button className="post-action">↗️ Share</button> */}
```

---

## 📸 رفع الصور

حالياً يتم حفظ الصور كـ Base64 في قاعدة البيانات. للحصول على أداء أفضل:

**استخدم Cloudinary:**

1. سجل حساباً في [cloudinary.com](https://cloudinary.com)
2. أضف المتغيرات في `.env`:
   ```
   REACT_APP_CLOUDINARY_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_PRESET=your_preset
   ```
3. اقبل الكود في `CreatePost.jsx` (انظر الدالة `uploadImagesToCloudinary`)

---

## 🐛 حل المشاكل

### البوستات لا تظهر
- تأكد من تشغيل Backend على `http://localhost:8000`
- تحقق من تسجيل `postRouter` في `backend/index.js`

### الصور لا تُرفع
- استخدم Base64 (الافتراضي)
- أو اتبع خطوات Cloudinary أعلاه

### الحذف لا يعمل
- تأكد من أنك صاحب البوست
- تحقق من `authMiddleware` في Backend

---

## 📝 مثال استخدام API

### إنشاء بوست
```bash
POST /api/post
Headers: { Authorization: "Bearer token" }
Body: {
  "content": "مرحباً بالجميع! 👋",
  "images": []
}
```

### الإعجاب بالبوست
```bash
PATCH /api/post/postId/like
Headers: { Authorization: "Bearer token" }
```

### إضافة تعليق
```bash
POST /api/post/postId/comment
Headers: { Authorization: "Bearer token" }
Body: {
  "text": "تعليق رائع!"
}
```

---

## 🎯 الخطوات التالية

رقم المهام المقترح:

- [ ] اختبار النظام بالكامل
- [ ] إضافة تحقق من الصيغة (Validation)
- [ ] إضافة ميزة البحث عن البوستات
- [ ] إضافة التصنيفات والهاشتاجات (#)
- [ ] إضافة ميزة الإشارة (@mention)
- [ ] إضافة notifications للإعجابات والتعليقات
- [ ] إضافة pagination للبوستات

---

**تم الإنشاء بواسطة:** GitHub Copilot  
**التاريخ:** مارس 2026
