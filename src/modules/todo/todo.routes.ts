import express from "express";
import { todoControlles } from "./todo.controller";

const router = express.Router()

router.post('/',todoControlles.todoPost);
router.get('/', todoControlles.allTodoGet);
router.get('/:id', todoControlles.getSingleTodo);
router.put('/:id', todoControlles.updateTodo);
router.delete('/:id', todoControlles.deleteTodo);


export const todoRoutes = router;