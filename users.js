var users = require('../dataLayer').users;
var Q = require('q');


exports.register = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(!username||!password){
        res.send({ 'message': 'error', 'data': 'username or password null!' });
        return;
    }
    users.findByName(username).then(function(entity){
        if(entity&&entity.length){
            res.send({ 'message': 'error', 'data': 'username exist!' });
            return;
        }
        users.create(username, password).then(function () {
            res.send({ 'message': 'ok', 'data': '' });
        }, function () {
            res.send({ 'message': 'error', 'data': '' });
        })
    })
    
}
exports.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    users.find(username,password).then(function(entity){
        if(entity&&entity.length){
            req.session.user_id = entity[0].user;
            res.send({'message':'ok','data':JSON.stringify(entity)})
            return;
        }
        res.send({'message':'error','data':'username or password error!'})
    },function(error){
        console.error(error);
        res.status(500).send('server error!');
    })
}
exports.findByName = function (name) {
	return users.findByName(name);
}
exports.updateRolesByName = function (name,roles) {
	return users.updateByName(name,{roles:roles});
}
exports.updatePwdByName = function (name,pwd) {
	return users.updateByName(name,{pwd:pwd});
}
exports.updateEnableByName = function (name,enable) {
	return users.updateByName(name,{enable:enable});
}


