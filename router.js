var userController = require('./controllers').users;


module.exports =function (app) {
	// app.use(function (req, res, next) {
		// var url = req.originalUrl;
		// console.log(url)
		// if(url == "/login"||url == "/register"||url == "/logout"||url == "/www"){
			// next();
			// return;
		// }
		// if(req.session.user_id){
			// userController.findByName(req.session.user_id).then(function(entity){
				// req.session.roles = entity.roles;
				// next();
			// })
		// }else{
			// res.send({'message':'no login'});
		// }
		
	// });
    app.post('/register', userController.register);

    app.post('/login',userController.login)

    app.get('/logout', function (req, res,next) {
        req.session.destroy(function(){
            res.send({'message':'ok','data':'logout'})
        })
    })
    app.get('/view', function (req, res,next) {
        userController.findByName(req.session.user_id).then(function(entity){
			res.send({'message':'ok','data':JSON.stringify(entity)}) 
		})
	})
	app.get('/roles', function (req, res,next) {
		userController.updateRolesByName(req.session.user_id,'admin').then(function(msg){
			res.send({'message':'ok','data':'roles'})
		},function(){
			res.send({'message':'error roles'})
		})
         
        
	})
}