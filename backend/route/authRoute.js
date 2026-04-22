import express from "express"
import { googleLogin, googleSignUp, login, logOut, resetPassword, sendOTP, signUp, verifyOTP, adminLogin } from "../controller/authController.js"
const authRouter = express.Router()
authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/admin-login",adminLogin)
authRouter.get("/logout",logOut)
authRouter.post("/sendotp",sendOTP)
authRouter.post("/verifyotp",verifyOTP)
authRouter.post("/resetpassword",resetPassword)
authRouter.post("/googlesignup",googleSignUp)
authRouter.post("/googlelogin",googleLogin)

export default authRouter