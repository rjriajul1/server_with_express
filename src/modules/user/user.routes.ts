import express from "express";
// import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();


// app.use("/users", userRoutes)
//router -> controller -> service
router.post("/", userControllers.createUser);
router.get('/', auth("admin"), userControllers.getUser);
router.get('/:id',auth("admin", "user"), userControllers.getSingleUser);
router.delete('/:id', userControllers.deleteUser);
router.put('/:id', userControllers.updateUser);

export const userRoute = router;