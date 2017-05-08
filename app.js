const bodyParser = require('body-parser')

//ORM para mongodb - conexion a mongodb
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fotos')

//creamos el schema de user
const UserSchema = mongoose.Schema({
	email: String,
	password: String
})

//ahora debemos compilar nuestro Schema en Model
var User = mongoose.model('User', UserSchema)


const express = require('express')
var app = express()

//archivos static
app.use(express.static('public'))

//middleware para pasar datos de formularios
app.use(bodyParser.json())
//middleware para que acepte formato json
app.use(bodyParser.urlencoded({ extended: true }))

//configuramos el motor de vista
app.set('view engine', 'pug')

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/login', (req, res)=>{
	User.find((err, doc)=>{
		console.log(doc)
		res.render('login')
	})
})

app.post('/users',(req, res)=>{
	//creamos modelo User
	let user = new  User({
		email: req.body.email,
		password: req.body.password
	})
	//guardamos user
	user.save(()=>{
		res.send("Recibimos tus datos")
	})
})

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!')
})