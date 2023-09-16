import asyncHandler from "express-async-handler";
import ToDoModel from "../models/todoItems.js";
// get Items
const getItems = asyncHandler(async (req, res) => {
  try {
    const allTodoItems = await ToDoModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

// Add items
const addItems = asyncHandler(async (req, res) => {
  try {
    const newItem = new ToDoModel({
      item: req.body.item,
    });
    //save this item in database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

// update Items
const updateItems = asyncHandler(async (req, res) => {
  try {
    //find the item by its id and update it
    const updateItem = await ToDoModel.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      { new: "true" },
    );
    res.status(200).json(updateItem);
  } catch (err) {
    res.json(err);
  }
});

// Delete Items
const deleteItems = asyncHandler(async (req, res) => {
  try {
    //find the item by its id and delete it
    const deleteItem = await ToDoModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (err) {
    res.json(err);
  }
});

export { addItems, getItems, deleteItems, updateItems };
