//llamamos al modelo User
const User = require('../models/user').User

module.exports = (req, res, next)=>{
	if (!req.session.user_id){
		//si no hay sesión mandamos a login
		res.redirect('/login')
	}
	else{
		User.findById(req.session.user_id,(err, user)=>{
			if (err){
				console.log(err)
			}
			else {
				//atributo propia de res
				res.locals = {user: user}
				//si hay sesion mandamos al sgt middleware
				next()
			}
		})
	}
}