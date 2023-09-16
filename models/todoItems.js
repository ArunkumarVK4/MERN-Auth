//import mongoose to create mongoose model
import mongoose from "mongoose"

//create Schema
const TodoItemSchema =  mongoose.Schema({
  item:{
    type:String,
    required: true
  },
})

//export this Schema
const ToDoModel = mongoose.model('todo', TodoItemSchema);

export default ToDoModel