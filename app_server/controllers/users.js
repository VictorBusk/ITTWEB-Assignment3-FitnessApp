const mongoose = require('mongoose');
const User = mongoose.model('User');

const listAll = function(req, res) {
    User.find({})
        .exec((err, users) => {
            res.render('users', {
                title: 'Users',
                users: users
            });
        });
};

const create = function(req, res) {
    User.create({
        name: req.body.name
        }, (err, user) => {
            res.redirect('/users');
        });
};

const remove = function (req, res) {
    User.findByIdAndRemove(
        req.params.id,
        (err, user) => {
            res.redirect('/users');
        })
};

module.exports = {
    listAll,
    create,
    remove
};
