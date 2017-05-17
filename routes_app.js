//requerimos Express
const express = require('express')
//exportamos modelo IMAGE
const Image = require('./models/image').Image
//creamos un objeto router
const router = express.Router()
//paquete para mover imag
const mv = require('mv')
//REDIS
const redis = require("redis")
const client = redis.createClient()

//llamamos middleware para buscar imagene
const image_finder = require('./middlewares/find_image')

router.get('/', function (req, res) {
	Image.find()
	.populate('creator')
	.exec((err, images)=>{
		if (err){
			console.log(err)
		}
		res.render('app/home', {images: images})
	})
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
		console.log(req.body.title)
		res.locals.image.save((err)=>{
			if (err){
				console.log(err)
				res.render('app/imagenes/'+req.params.id+'/edit')
			}
			res.render('app/imagenes/show')
		})
	})
	.delete((req,res)=>{
		console.log(req.params.id)
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
		Image.find({creator: res.locals.user._id},(err, images)=>{
			if (err){
				console.log(images)
				console.log(err)
				res.redirect('/app')
				return
			}
			res.render('app/imagenes/index', {images: images})
		})

	})
	.post((req,res)=>{
		const extension = req.files.img.name.split('.').pop()
		//create
		var image = new Image({
			title: req.fields.title,
			creator: res.locals.user._id,
			extension: extension
		})
		image.save((err,doc)=>{
			if (err){
				console.log(image)
				console.log(err)
			}

			//variable JSON que contiene datos de img
			let imgJSON = {
				'id': image._id,
				'title': image.title,
				'extension': image.extension
			}

			//comunicacion
			client.publish('images', JSON.stringify(imgJSON))
			mv(req.files.img.path, 'public/images/'+image._id+'.'+extension,(err)=>{
				if (err){
					console.log(err)
				}
				console.log('Fichero copiado')
			})
			res.redirect('/app/imagenes/'+image._id)
		})
	})

module.exports = router