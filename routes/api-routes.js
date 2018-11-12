/**
 * @author Maryam Keshavarz
 */
const db = require('../model');

module.exports = function(app) {

  /**
   * @description Make a GET route for getting all todo list items
   * @returns json array of all fields
   */
  app.get('/api/todolist', function(req, res) {
      db.ToDoList.find({}).then(function(dbtodolist){  
        res.json(dbtodolist);
    })
    .catch(function(err){
        res.json(err);
    })
  });

  /**
   * @description Make a GET route for getting selected todo list items
   *  @returns json of selected field
   */
  app.get('/api/selected/:id', function(req, res) {
    db.ToDoList.findOne({_id: req.params.id}).then(function(dbtodolist){
      res.json(dbtodolist);
  })
  .catch(function(err){
      res.json(err);
  })
});

  /**
   * @description Make a POST route for adding a new todo list item
   * @returns json of added field
   */
  app.post('/api/addNewTask', function(req, res) {

    db.ToDoList.create(req.body)
        .then(function(dbtodolist) {
          res.json({dbtodolist});
        })
        .catch(function(err) {
          res.json({err: err});
        });
  });


  /**
   * @description Make a DELETE route for deleting a todo list item
   * @returns json of all fields
   */
  app.delete('/api/removeTask', function(req, res){
      const chosen = req.body.task_id;

      db.ToDoList.remove({_id: chosen}).then(function(dbtodolist){
          db.ToDoList.find({}).then(function(dbtodolist){
            res.json(dbtodolist);
        })
        .catch(function(err){
            res.json(err);
        })
      })
      .catch(function(err){
        res.json(err);
    });
  });


  /**
   * @description Make a PUT route for updating a todo list item when it is checked or unchecked
   * @returns json of updated field
   */
  app.put('/api/updateTask', function (req, res) {
      db.ToDoList.findOneAndUpdate({_id: req.body.task_id}, {$set: {compeleted: req.body.compeleted}})
          .then(function (dbtodolist) {
              res.json(dbtodolist);
          })
          .catch(function(err) {
              res.json(err);
          });
  });

}