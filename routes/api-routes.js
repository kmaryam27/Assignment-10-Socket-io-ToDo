// ===============================================================================
// const RestfulAPI = require('./RestClass');
// const models = require('../models');

// module.exports = function (app) {
  
//   const task = new RestfulAPI('task', app, models.Task);
//   task.findAll();
//   task.create();

//   const user = new RestfulAPI('user', app, models.User);
//   user.find('id');
//   user.create();

//   const event = new RestfulAPI('event', app, models.Event);
//   event.findAll();
//   event.find('id');
//   event.find('date');
//   event.create();
// }
// ===============================================================================

const db = require('../model');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // Make a GET route for getting all todo list items
  app.get('/api/todolist', function(req, res) {
      db.ToDoList.find({}).then(function(dbtodolist){
        res.json(dbtodolist);
    })
    .catch(function(err){
        res.json(err);
    })
  });

  // Make a GET route for getting selected todo list items
  app.get('/api/selected/:id', function(req, res) {
    db.ToDoList.findOne({_id: req.params.id}).then(function(dbtodolist){
      res.json(dbtodolist);
  })
  .catch(function(err){
      res.json(err);
  })
});

  sampleTable = {
    task: 'study',
    compeleted: false
  }

  // Make a POST route for adding a new todo list item
  app.post('/api/addNewTask', function(req, res) {
    // Checks to make sure every property on the req.body is also on sampleTable
    for(let key in req.body) {
      if(!sampleTable.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Checks to make sure every property on the sampleTable is also on req.body
    for(let key in sampleTable) {
      if(!req.body.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    db.ToDoList.create(req.body)
        .then(function(dbtodolist) {
          res.json({dbtodolist});
        })
        .catch(function(err) {
          res.json({err: err});
        });
  });


  //Make a DELETE route for deleting a todo list item using the X button next to it
  app.delete('/api/removeTask', function(req, res){
      // Grab the selected parameter
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


  //Make a PUT route for updating a todo list item when it is checked or unchecked
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