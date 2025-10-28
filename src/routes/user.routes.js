import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/listing", userController.getListUsers);
router.post("/login", userController.login);
router.post("/signup", userController.signUp);

export default router;