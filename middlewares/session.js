module.exports = (req, res, next)=>{
	if (!req.session.user_id){
		//si no hay sesión mandamos a login
		res.redirect('/login')
	}
	else{
		//si hay sesion mandamos al sgt middleware
		next()
	}
}