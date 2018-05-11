const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Task model
const Task = require('../../models/Task');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateTaskInput = require('../../validation/task');

// @route   GET api/task/test
// @desc    Tests task route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Tasks Works' }));

// @route   GET api/task
// @desc    Get tasks
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(404).json({ notaskFound: 'No tasks found' }));
});

// @route   GET api/task/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err =>
      res.status(404).json({ notaskFound: 'No task found with that ID' })
    );
});

// @route   POST api/tasks
// @desc    Create task
// @access  Private
router.post( '/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    });

    newTask.save().then(task => res.json(task));
  }
);

// @route   DELETE api/tasks/:id
// @desc    Delete post
// @access  Private
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Task.findById(req.params.id)
        .then(task => {
          // Check for post owner
          if (task.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          task.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ taskNotFound: 'No task found' }));
    });
  }
);

module.exports = router;