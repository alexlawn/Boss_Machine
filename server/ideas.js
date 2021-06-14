const ideasRouter = require('express').Router();

module.exports = ideasRouter;

// require the helper functions from the database(db.js)
const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// require the helper function from checkMillionDollarIdea.js
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId ', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// GET /api/ideas to get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
    });

// POST /api/ideas to create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea); // 201 Created
});

// GET /api/ideas/:ideaId to get a single idea by id  
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
    });

// PUT /api/ideas/:ideaId to update a single idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdeaInstance);
    });

// DELETE /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204); // 204 No Content
    } else {
        res.status(500); // Internal Server Error
    }
    res.send();
    });
