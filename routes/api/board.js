const router = require("express").Router()
  , Board = require("../../models/Board")
  , passport = require("passport");

// CREATE
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('USERI', req.user);

  const newBoard = new Board({
    name: req.body.name,
    description: req.body.description,
    userId: req.user._id
  });

  newBoard.save((board, err) => {
    if (!err) {
      return res.json(newBoard);
    }
    res.json(err);
  });


});

// READ ALL
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Board.find({}).sort({ createdAt: "descending" })
    .then(boards => {
      res.json(boards);
    })
    .catch(err => res.json(err));
});

// READ ONE
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Board.findById(req.params.id)
    .then(Board => res.json(Board))
    .catch(err =>
      res.status(404).json({ noBoardFound: 'No Board found with that ID' })
    );
});

// UPDATE ONE
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  // Get fields
  const updatedBoardData = {
    name: req.body.name,
    description: req.body.description
  };

  Board.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedBoardData },
    { new: true }
  ).then(updatedBoard => res.json(updatedBoard))
    .catch(e => res.json(err));
});

// DELETE ONE
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Board.findByIdAndRemove(req.params.id)
    .then(success => {
      res.json({ success: true, msg: "Removed" })
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;