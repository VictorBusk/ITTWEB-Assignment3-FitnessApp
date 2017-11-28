const mongoose = require('mongoose');

const home = function(req, res) {
    res.render("index", {title: 'Angular'});
};

module.exports = {
    home
};
