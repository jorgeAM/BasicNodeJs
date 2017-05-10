//requerimos Express
const express = require('express')
//creamos un objeto router
const router = express.Router()

router.get('/', function (req, res) {
	res.render('app/home')
})

module.exports = router