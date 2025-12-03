import express, {  Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.routes";
const app = express();

const port = config.port
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

// todos post 
app.post("/todos", async(req: Request, res: Response)=>{
  const {user_id, title} =  req.body;

  try{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1,$2) RETURNING *`, [user_id, title])
    res.status(201).json({
      success: true,
      message: "todos asign",
      data: result.rows[0]
    })
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// todos get 
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "todoes retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
});

// get all todos of a single user
app.get("/todos/user/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (Number.isNaN(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user id" });
  }

  try {
    const result = await pool.query(`SELECT * FROM todos WHERE user_id = $1 ORDER BY id`, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No todos found for this user" });
    }

    res.status(200).json({ success: true, message: "Todos fetched successfully", data: result.rows });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, details: err });
  }
});

// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Update todo
app.put("/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
      [title, completed, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.use((req,res)=> {
  res.status(400).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
