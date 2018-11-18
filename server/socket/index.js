const actions = require('./actions');

let start = function(io, app) {

	io.on('connection', function (socket) {
		
		socket.on('enter-chat', function (user) {
			let userData = user;
			userData.id = socket.id;
			socket.countryId = user.country.value;
			
			socket.emit('searching-partner');
			actions.insertIntoOnlineUsers(app, socket.countryId, userData)
			actions.insertIntoSearchingUsers(app, socket.countryId, userData)
			actions.findRandomPartner(app, socket, socket.countryId, socket.id, user.partner)
		})

		socket.on('find-partner', function (user) {
			let userData = user;
					userData.id = socket.id;
			
			socket.emit('searching-partner');
			actions.insertIntoSearchingUsers(app, socket.countryId, userData)
			actions.findRandomPartner(app, socket, socket.countryId, socket.id, user.partner)
		})

		socket.on('user-started-typing', function ({ id, sex }) {
			socket.broadcast.to(id).emit('user-started-typing', sex)
		})

		socket.on('user-stopped-typing', function (id) {
			socket.broadcast.to(id).emit('user-stopped-typing', id)
		})

		socket.on('send-message', function ({id, message, sex }) {
			socket.broadcast.to(id).emit('new-message', { message, sex })
		})

		socket.on('disconnect-partner', function(id) {
			socket.broadcast.to(id).emit('partner-disconnected')
		})

		socket.on('disconnect', (reason) => {
			socket.broadcast.to(socket.partnerId).emit('partner-disconnected')
			actions.removeFromOnlineUsers(app, socket.countryId, socket.id)
			actions.removeFromSearchingUsers(app, socket.countryId, socket.id)
		});
	})

}

module.exports = {
	start
}