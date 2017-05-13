//requerimos Express
const express = require('express')
//exportamos modelo IMAGE
const Image = require('./models/image').Image
//creamos un objeto router
const router = express.Router()

router.get('/', function (req, res) {
	res.render('app/home')
})

/* REST */
router.get('/imagenes/new',(req,res)=>{
	res.render('app/imagenes/new')
})

router.get('/imagenes/:id/edit',(req,res)=>{
	Image.findById(req.params.id, (err, image)=>{
		if (err){
			console.log(err)
		}
		res.render('app/imagenes/edit', {image: image})
	})
})

router.route('/imagenes/:id')
	.get((req,res)=>{
		//show
		Image.findById(req.params.id, (err, image)=>{
			if (err){
				console.log(err)
			}
			res.render('app/imagenes/show', {image: image})
		})
	})
	.put((req,res)=>{
		//update
		Image.findById(req.params.id, (err, image)=>{
			if (err){
				console.log(err)
			}
			image.title = req.body.title
			image.save((err)=>{
				if (err){
					console.log(err)
					res.render('app/imagenes/'+image._id, {image: image})
				}
				res.render('app/imagenes/show', {image: image})
			})
		})
	})
	.delete((req,res)=>{
		//delete
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