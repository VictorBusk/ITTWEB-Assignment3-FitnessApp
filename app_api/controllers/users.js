const mongoose = require('mongoose');
const User = mongoose.model('User');

const listAll = function(req, res) {
    User.find({})
        .exec((err, users) => {
            if (!users) {
                res.status(404)
                    .json({"message": "users not found"});
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(users);
            }
        });
};

const create = function(req, res) {
    User.create({
        name: req.body.name
        }, (err, user) => {
        if (err) {
            res.status(400)
                .json(err);
        } else {
            res.status(201)
                .json(user);
        }
        });
};

const update = function (req, res) {
    const userId = req.params.userId;
    User.findById(userId)
        .exec((err, user) => {
            if (!user) {
                res.status(404)
                    .json({"message": "user not found"});
                return;
            } else if (err) {
                res.status(404)
                    .json(err);
                return;
            }
            user.name = req.body.name;
            user.save((err, user) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    res.status(201)
                        .json(user);
                }
            });
        });
};

const remove = function (req, res) {
    const userId = req.params.userId;
    if (userId) {
        User.findByIdAndRemove(userId)
            .exec((err, user) => {
                if (err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(204)
                        .json(null);
                }
            })
    } else {
        res.status(404)
            .json({"message": "user not found"});
    }
};

module.exports = {
    listAll,
    create,
    update,
    remove
};
