var mongoose = require('mongoose');
var Q = require('q');
 
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    user: { type: String },
    pwd: { type: String },
    roles:  { type: String },
    enable:  { type: Boolean,default:true },
    createAt: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', usersSchema);

exports.create = create;
exports.findByName = findByName;
exports.find = find;
exports.updateByName = updateByName;

function updateByName(name,options){
	var deferred = Q.defer();
	Users.update({ user: name }, {$set:options}, { multi: false }, function (err, docs) {
		if (err) {
			console.error(err);
			deferred.reject(err);
			return;
		};
		deferred.resolve(docs);
	});
	return deferred.promise;
}
function create(user,pwd){
    var deferred = Q.defer();
    var user = new Users({
        user:user,
        pwd:pwd
    });
    user.save(function(err) {
        if(err){
            deferred.reject();
            return;
        }
        deferred.resolve();
    });
    return deferred.promise;
}


function findByName(user){
    var deferred = Q.defer();
     var user = {
        user:user
    };
    Users.find(user).exec(function(err,docs) {
        if(err){
            deferred.reject();
            return;
        }
        deferred.resolve(docs);
    })
    return deferred.promise;
}


function find(user,pwd){
    var deferred = Q.defer();
    var user = {
        user:user,
        pwd:pwd
    };
    Users.find(user).exec(function(err,docs) {
        if(err){
            deferred.reject();
            return;
        }
        deferred.resolve(docs);
    })
    return deferred.promise;
}