//requerimos Express
const express = require('express')
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

})

router.route('/imagenes/:id')
	.get((req,res)=>{
		//show
	})
	.put((req,res)=>{
		//update
	})
	.delete((req,res)=>{
		//delete
	})

	router.route('/imagenes/')
	.get((req,res)=>{
		//index

	})
	.post((req,res)=>{
		//create
	})

module.exports = router