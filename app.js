const bodyParser = require('body-parser')
//llamamos al modelo User
const User = require('./models/user').User
//requerimos Express
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
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		//virtual
		password_confirmation: req.body.password_confirmation
	})
	console.log(user.password)
	console.log(user.password_confirmation)
	//guardamos user
	user.save((err)=>{
		if(err){
			console.log(String(err))
		}
		res.send("Recibimos tus datos")
	})
})

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!')
})