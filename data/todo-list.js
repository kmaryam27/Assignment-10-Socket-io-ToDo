let todoArray = [
    {
        "task_id":"a1",
        "task": "pray",
        "compeleted": "true"
      } ,

      {
        "task_id":"a2",
        "task": "study",
        "compeleted": "true"
      } ,

      {
        "task_id":"a3",
        "task": "music",
        "compeleted": "false"
      } 
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = todoArray;