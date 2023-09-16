import express from "express";
import { addItems, deleteItems, getItems, updateItems } from "../controllers/todoController.js";


const router = express.Router()

router.get("/api/items",getItems)
router.post("/api/item",addItems)
router.put("/api/item/:id",updateItems)
router.delete("/api/item/:id",deleteItems) 


export default router 