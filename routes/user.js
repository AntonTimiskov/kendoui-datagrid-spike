/*
 * GET users listing.
 */

var fs = require('fs');

exports.list = function(req, res){
    users = []

    users = [{ ID: 1, Country: 'Russia', Name: 'Alisa' }]

    res.send(JSON.stringify( users ));
};
