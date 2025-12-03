import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();


// app.use("/users", userRoutes)
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1,$2) RETURNING *`,
      [name, email]
    );
    // console.log(result.rows[0]);
    // res.send({ message: "data inserted" });
    res.status(201).json({
      success: true,
      message: "data inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

router.get('/',  async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "users retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
})

export const userRoute = router;