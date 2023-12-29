const express= require("express");

const router = express.Router();

const{createTodo} = require("../controller/createTodo")
const {getTodo,getTodoById} = require("../controller/getTodo");
const {updatedTodo} = require("../controller/updateTodo");
const {deleteTodo} = require("../controller/deleteTodo")

router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.get("/getBySingleUser/:id", getTodoById);
router.put("/updateTodo/:id",updatedTodo);
router.delete("/deleteTodo/:id",deleteTodo);


module.exports= router;