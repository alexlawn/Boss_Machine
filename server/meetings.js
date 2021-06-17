const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

// require the helper functions from the database(db.js)
const { 
  getAllFromDatabase,
  createMeeting,
  deleteAllFromDatabase
} = require('./db');

// GET /api/meetings to get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  res.status(201).send(newMeeting); // 201 Created
});

// DELETE /api/meetings to delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
  res.send(deleteAllFromDatabase('meetings'));
});
