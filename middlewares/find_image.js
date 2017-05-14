//exportamos modelo IMAGE
const Image = require('../models/image').Image
//llamar middleware de permisos
const owner_check = require('./image_permission')

module.exports = (req, res, next)=>{
	Image.findById(req.params.id)
	.populate('creator')
	.exec((err,image)=>{
		if (image != null && owner_check(image, req, res)){
			res.locals.image =  image
			next()
		}
		else{
			console.log(err)
			res.redirect('/app')
		}

	}) 
}