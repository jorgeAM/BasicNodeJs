//requerimos Express
const express = require('express')
//exportamos modelo IMAGE
const Image = require('./models/image').Image
//creamos un objeto router
const router = express.Router()
//llamamos middleware para buscar imagene
const image_finder = require('./middlewares/find_image')

router.get('/', function (req, res) {
	res.render('app/home')
})

/* REST */
router.get('/imagenes/new',(req,res)=>{
	res.render('app/imagenes/new')
})


/*haremos que determinadas rutas usen un middleware*/
router.all('/imagenes/:id*', image_finder)


router.get('/imagenes/:id/edit',(req,res)=>{
	res.render('app/imagenes/edit')
})

router.route('/imagenes/:id')
	.get((req,res)=>{
		//show
		res.render('app/imagenes/show')
	})
	.put((req,res)=>{
		//update
		res.locals.image.title = req.body.title
		res.locals.image.save((err)=>{
			if (err){
				console.log(err)
				res.render('app/imagenes/'+req.params.id+'/edit')
			}
			res.render('app/imagenes/show')
		})
	})
	.delete((req,res)=>{
		//delete
		Image.findOneAndRemove({_id: req.params.id}, (err)=>{
			if (err){
				console.log(err)
				res.redirect('/app/imagenes/'+image._id)
			}
			res.redirect('/app/imagenes')
		})
	})


	router.route('/imagenes/')
	.get((req,res)=>{
		//index
		Image.find({},(err, images)=>{
			if (err){
				console.log(err)
				res.redirect('/app')
				return
			}
			res.render('app/imagenes/index', {images: images})
		})

	})
	.post((req,res)=>{
		//create
		var image = new Image({
			title: req.body.title
		})
		image.save((err,doc)=>{
			if (err){
				console.log(err)
			}
			res.redirect('/app/imagenes/'+image._id)
		})
	})

module.exports = router