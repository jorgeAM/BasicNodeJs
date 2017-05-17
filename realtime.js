module.exports = (server, session)=>{
	const io = require('socket.io')(server)
	io.use((socket, next)=>{
		session(socket.request, socket.request.res, next)
	})

	io.sockets.on('connection', (socket)=>{
		console.log(socket.request.session.user_id)
	})
}