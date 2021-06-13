const minionsRouter = require('express').Router();

module.exports = minionsRouter;

// require the helper functions from the database(db.js)
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
const minion = getFromDatabaseById('minions', id);
if (minion) {
    req.minion = minion;
    next();
} else {
    res.status(404).send();
}
});

// GET /api/minions to get an array of all minions
minionsRouter.get('/', (req, res, next) => {
res.send(getAllFromDatabase('minions'));
});

// POST /api/minions to create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});
// 201 Created - The request has been fulfilled, resulting in the creation of a new resource

// GET /api/minions/:minionId to get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
    });

// PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinionInstance);
    });

// DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
    });
// 204 No Content - The server successfully processed the request, and is not returning any content.