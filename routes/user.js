/*
 * GET users listing.
 */

var fs = require('fs');
var names = fs.readFileSync('data/names.txt').toString().split('\n')
var countries = fs.readFileSync('data/countries.txt').toString().split('\n')
var randName = function(){
    return names[parseInt(Math.random()*names.length)].split(' ')[0];
};
var randCountry = function(){
    return countries[parseInt(Math.random()*countries.length)];
};

exports.list = function(req, res) {
    var pageSize = parseInt(req.query.pageSize),
        skip = parseInt(req.query.skip),
        take = parseInt(req.query.take),
        page = parseInt(req.query.page),
        callback = req.query.callback,
        users = []

    for (var num = skip; num < skip + take; num++) {
        users.push(
            { id: num, country: randCountry(), name: randName() }
        );
    };
    res.send(callback+'('+JSON.stringify({
        results: users,
        total: 100000000,
        page: page
    })+');');
};
