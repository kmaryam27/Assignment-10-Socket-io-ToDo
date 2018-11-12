/**********insert mongoose to use it */
const mongoose = require('mongoose');


/**********Save a reference to the Schema constructor*/
var Schema = mongoose.Schema;

/**********Using the Schema constructor, create a new UserSchema object*/
var ToDoListSchema = new Schema({
    
    task: {
      type: String,
      required: "Task is Required for to do list"
    },
    compeleted: Boolean
  });

/**********creates our model from the above schema, using Mongoose's model method*/
var ToDoList = mongoose.model("ToDoList", ToDoListSchema);

/**********Export the Inventory model*/
module.exports = ToDoList;
