const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;


// require the helper functions from the database(db.js)

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
} = require('./db');

// GET /api/meetings to get an array of all meetings

// POST /api/meetings to create a new meeting and save it to the database

// DELETE /api/meetings to delete all meetings from the database