import express from "express";
import { authController } from "./auth.controllers";

const router = express.Router();

router.post("/login", authController.loginUser)

export const authRoutes = router;



