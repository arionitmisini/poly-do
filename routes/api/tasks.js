const router = require("express").Router()
  , Task = require("../../models/Task")
  , passport = require("passport")
  , objectId = require('mongoose').Types.ObjectId;

// CREATE
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('USERI', req.user);

  const newTask = new Task({
    name: req.body.name,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    boardId: req.body.boardId
  });

  newTask.save((task, err) => {
    if (!err) {
      return res.json(task);
    }
    res.json(err);
  });


});

// READ ALL
router.get('/:boardId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Task.find({ boardId: objectId(req.params.boardId) })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => res.json(err));
});

// READ ONE
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err =>
      res.status(404).json({ noTaskFound: 'No Task found with that ID' })
    );
});

// UPDATE ONE
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  // Get fields
  const updatedTaskData = {
    name: req.body.name,
    description: req.body.description,
    dueDate: new Date(req.body.dueDate),
    completed: req.body.completed,
    taskId: req.body.boardId
  };

  Task.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedTaskData },
    { new: true }
  ).then(updatedTask => res.json(updatedTask))
    .catch(e => res.json(err));
});

// DELETE ONE
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(success => {
      res.json({ success: true, msg: "Removed" })
    })
    .catch(err => res.status(404).json(err));
});
module.exports = router;