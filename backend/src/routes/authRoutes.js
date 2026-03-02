import express from "express";
import { signup, login, updateAvatar, getMe } from "../controllers/authController.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/avatar", protect, avatarUpload.single("avatar"), updateAvatar);

export default router;