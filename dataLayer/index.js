var mongoose = require('mongoose');
var users = require('./mongo/users');

var config = require('../config');
 
var connection_opts = {
        server: {
            poolSize: 4, auto_reconnect: true,
            socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}
        }
    }
    ;
/**
 *连接mongo
 */
connect();

function connect() {
    mongoose.connect(config.db_mongo, connection_opts, function (err) {
        if (err) {
            process.exit(1);
        } else {
            console.log('database', 'start success');
        }
    });
}
/**
 * 断开后，重新连接
 */
mongoose.connection.on('disconnected', function () {
    console.log('database', 'MongoDB disconnected!');
    connect();
});


exports.users = users;