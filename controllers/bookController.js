const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Book
            .find(req.query) 
            .sort({author: 1}) //sort by author in ascending order
            .then(dbModel => res.json(dbModel)) //for every returned result, send the json as the result
            .catch(err => res.status(422).json(err)); //if error, throw 422
    },
    findById: function(req, res) {
        db.Book
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Book
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Book
            .findOneAndUpdate({_id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Book
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};