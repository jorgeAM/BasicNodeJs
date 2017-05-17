module.exports = (server, session)=>{
	const io = require('socket.io')(server)
	//redis
	const redis = require("redis")
	const client = redis.createClient()
	//evento susbribir
	client.subscribe('images')
	io.use((socket, next)=>{
		session(socket.request, socket.request.res, next)
	})

	client.on('message', (channel, message)=>{
		if (channel == 'images'){
			//envia mensaje a todos los sockes
			io.emit('new image', message)
		}
	})

	io.sockets.on('connection', (socket)=>{
		console.log(socket.request.session.user_id)
	})
}