const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

// require the helper functions from the database(db.js)
const { 
  getAllFromDatabase,
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase
} = require('./db');

// GET /api/meetings to get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting); // 201 Created
});

// DELETE /api/meetings to delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
  res.status(204).send(deleteAllFromDatabase('meetings'));  //204 - no content
});
