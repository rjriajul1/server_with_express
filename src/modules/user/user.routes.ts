import express from "express";
// import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();


// app.use("/users", userRoutes)
//router -> controller -> service
router.post("/", userControllers.createUser);
router.get('/',  userControllers.getUser);
router.get('/:id', userControllers.getSingleUser);
router.delete('/:id', userControllers.deleteUser);
router.put('/:id', userControllers.updateUser);

export const userRoute = router;