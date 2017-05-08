const bodyParser = require('body-parser')
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
  res.render('login')
})

app.post('/users',(req, res)=>{
	console.log(req.body.email)
	console.log(req.body.password)
	res.send("Recibimos tus datos")
})

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!')
})