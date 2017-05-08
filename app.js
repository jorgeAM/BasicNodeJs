var express = require('express')
var app = express()

//archivos static
app.use(express.static('public'))

//configuramos el motor de vista
app.set('view engine', 'pug')

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/login', (req, res)=>{
  res.render('login')
})

app.listen(3000, ()=>{
  console.log('Example app listening on port 3000!')
})