//exportamos modelo IMAGE
const Image = require('../models/image').Image

module.exports = (req, res, next)=>{
	Image.findById(req.params.id)
	.populate('creator')
	.exec((err,image)=>{
		if (image != null){
			res.locals.image =  image
			next()
		}
		else{
			console.log(err)
			res.redirect('/app')
		}

	}) 
}