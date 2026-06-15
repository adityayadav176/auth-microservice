import { Router } from "express";
import { changeName, forgetPassword, loginUser, logoutUser, registerUser, sendForgetPasswordOtp, sendVerifyAccountOtp, verifyAccount } from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.middleware.js"
import { loginRateLimit } from "../rateLimiting/loginLimiter.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = Router();

router.post(
    "/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

router.post("/login", loginRateLimit, loginUser);
router.post("/sendEmailVerificationOtp",verifyUser, sendVerifyAccountOtp);
router.post("/VerifyEmail",verifyUser, verifyAccount);
router.post("/SendPasswordResetOtp",verifyUser, sendForgetPasswordOtp);
router.post("/forgetPassword",verifyUser, forgetPassword);
router.post("/changeName",verifyUser, changeName);
router.post("/logout",verifyUser, logoutUser);

export default router