//API para paso de datos
const bodyParser = require('body-parser')
//llamamos al modelo User
const User = require('./models/user').User
//API para sesiones de express
const session = require('express-session')
//requerimos router
const router_app = require('./routes_app')
//middleware de session
const session_middleware = require('./middlewares/session')
//API para conectar con reddis
const RedisStore = require('connect-redis')(session);
//servidor http
const http = require('http')
//importamos modulo creado para usar SocketIO
const realtime = require('./realtime')
//API methodOverride
const methodOverride = require('method-override')

//requerimos Express
const express = require('express')

const formidable = require('express-formidable')
const app = express()
//creamos un servidor http para  la app de express
const server = http.Server(app)
realtime(server, session({
	store: new RedisStore(),
	secret: 'my secret key'
}))

//archivos static
app.use(express.static('public'))

//middleware para pasar datos de formularios
app.use(bodyParser.json())
//middleware para que acepte formato json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//middleware para sesiones
app.use(session({
	store: new RedisStore(),
	secret: 'my secret key'
}))

//configuramos el motor de vista
app.set('view engine', 'pug')

app.get('/', (req, res)=>{
  console.log(req.session.user_id)
  res.render('index')
})

app.get('/login', (req, res)=>{
	res.render('login')
})

app.post('/sessions',(req, res)=>{
	User.findOne({
		email: req.body.email, 
		password: req.body.password
	}, (err,user)=>{
		if (err){
			console.log(err)
		}
		req.session.user_id = user._id
		res.redirect('/app')
	})	
})

app.get('/signup', (req, res)=>{
	res.render('signup')
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
	//guardamos user usando promise
	user.save().then((us)=>{
		res.send("Guardamos el usuario sin problemas!")
	}, (err)=>{
		console.log(String(err))
		res.send("Hubo problemas!")
	})
})

//pasamos para ver si hay usuario con sesión iniciada
app.use('/app', session_middleware)
//montamos router
app.use('/app', formidable({
	keepExtensions: true
}), router_app)

server.listen(3000, ()=>{
  console.log('Example app listening on port 3000!')
})