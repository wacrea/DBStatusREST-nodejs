/*
 *  This is a nodeJS script which works like a REST API. His job is to respond a status (in JSON) for a specific user (POST['user_id'])
 *  And check in a MySQL database, the value of a field : 0 (no), 1 (yes), 2 (not yet, wait and call me again)
 */

// Module dependencies
var express    = require('express');
var mysql      = require('mysql');
var url        = require('url');
var check      = require('validator').check;
var sanitize   = require('validator').sanitize;
 
/* MySQL settings */
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port     : '8889',
        database : 'nodejs_test',
    });
    
/* Init Express.js */
var app = express();

/* Handle /getStatus and return a JSON with the status from the MySQL DB */
app.get('/getStatus', function(req, res){

    // Get POST/GET parameters (we are looking for a user_id)
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query.user_id);

    // Init global variable that will contains the status
    global.resultdb;

    /* Check if query.user_id is an int */
    try {
        check(query.user_id, 'This is not a user_id').notNull().isInt();

        /* DB query */
        connection.query('SELECT connectStatus AS status FROM tabletest WHERE user_id = "'+query.user_id+'" LIMIT 1', function(err, rows, fields) {
            if (err) throw err;

            global.resultdb = rows[0].status;
            console.log('Status: ', rows[0].status);
        });

    } catch (e) {
        console.log(e.message);

        global.resultdb = 2;
    }

    res.send('Result :'+global.resultdb);
});
 
// Begin listening
app.listen(1213);
console.log("Express server listening on port 1213");