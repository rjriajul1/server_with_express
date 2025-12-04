import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();

const port = config.port;
// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing db
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

// users CRUD
app.use("/users", userRoute);

// todos CRUD
app.use("/todos", todoRoutes);


// auth routes

app.use("/auth", authRoutes);

// get all todos of a single user
// app.get("/todos/user/:userId", async (req: Request, res: Response) => {
//   const userId = Number(req.params.userId);

//   if (Number.isNaN(userId)) {
//     return res.status(400).json({ success: false, message: "Invalid user id" });
//   }

//   try {
//     const result = await pool.query(
//       `SELECT * FROM todos WHERE user_id = $1 ORDER BY id`,
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No todos found for this user" });
//     }

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Todos fetched successfully",
//         data: result.rows,
//       });
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ success: false, message: err.message, details: err });
//   }
// });


app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
