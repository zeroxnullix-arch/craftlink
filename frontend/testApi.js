import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import * as tough from "tough-cookie";

const jar = new tough.CookieJar();
const client = wrapper(
    axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
        jar,
    })
);
const randomNum = Math.floor(Math.random() * 100000);
const testUser = {
    name: "Test User",
    email: `testuser${randomNum}@example.com`,
    password: "12345678",
    role: 1,
};
const run = async (label, config) => {
    try {
        const res = await client(config);
        console.log(`\n[✅ ${label}]`);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(`\n[❌ ${label}]`);
        if (err.response) console.log(err.response.status, err.response.data);
        else console.log(err.message);
    }
};
const testEndpoints = async () => {
    await run("SIGNUP", {
        method: "post",
        url: "/api/auth/signup",
        data: testUser,
    });
    await run("LOGIN", {
        method: "post",
        url: "/api/auth/login",
        data: { email: testUser.email, password: testUser.password },
    });
    await run("SEND OTP", {
        method: "post",
        url: "/api/auth/sendotp",
        data: { email: testUser.email },
    });
    await run("VERIFY OTP (BYPASS)", {
        method: "post",
        url: "/api/auth/verifyotp",
        data: { email: testUser.email, otp: "0000" },
    });
    await run("RESET PASSWORD", {
        method: "post",
        url: "/api/auth/resetpassword",
        data: { email: testUser.email, password: "newpass123" },
    });
    const currentUser = await run("GET CURRENT USER", {
        method: "get",
        url: "/api/user/getcurrentuser",
    });
    const currentUserId = currentUser?._id;
    await run("UPDATE PROFILE", {
        method: "patch",
        url: "/api/user/profile",
        data: { description: "Updated description" },
    });
    await run("CHANGE PASSWORD", {
        method: "patch",
        url: "/api/user/changepassword",
        data: { currentPassword: "newpass123", newPassword: "finalpass123" },
    });
    const course = await run("CREATE COURSE", {
        method: "post",
        url: "/api/course/create",
        data: {
            title: "Test Course",
            description: "This is a test course",
            category: "Plumber",
            level: "Beginner",
            price: 100,
        },
    });
    const courseId = course?._id;
    await run("GET PUBLISHED COURSES", {
        method: "get",
        url: "/api/course/getpublished",
    });
    await run("GET CREATOR COURSES", {
        method: "get",
        url: "/api/course/getcreator",
    });
    if (courseId) {
        await run("EDIT COURSE", {
            method: "post",
            url: `/api/course/editcourse/${courseId}`,
            data: { title: "Updated Test Course" },
        });
        await run("CREATE LECTURE", {
            method: "post",
            url: `/api/course/createlecture/${courseId}`,
            data: {
                lectureTitle: "Lecture 1",
                description: "Lecture description",
                videoUrl: "https://example.com/video.mp4",
                isPreviewFree: false,
            },
        });
        await run("GET COURSE LECTURES", {
            method: "get",
            url: `/api/course/courselecture/${courseId}`,
        });
        await run("PUBLISH COURSE", {
            method: "patch",
            url: `/api/course/publish/${courseId}`,
            data: { isPublished: true },
        });
        await run("CREATE PAYMENT", {
            method: "post",
            url: "/api/payment/create-payment",
            data: {
                amount: 500,
                userId: currentUserId,
                courseId: courseId,
            },
        });
    }
    await run("LOGOUT", { method: "get", url: "/api/auth/logout" });
};

testEndpoints();
