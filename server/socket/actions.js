const insertIntoOnlineUsers = function (app, countryId, userData) {
	if (app.locals.onlineUsers.hasOwnProperty(countryId)) {
		app.locals.onlineUsers[countryId].push(userData)
	} else {
		app.locals.onlineUsers[countryId] = [userData];
	}
}

const removeFromOnlineUsers = function (app, countryId, id) {
	if (countryId) {
		app.locals.onlineUsers[countryId].forEach((user, index) => {
			if (user.id == id) {
				app.locals.onlineUsers[countryId].splice(index, 1);
			}
		})
	}
}

const insertIntoSearchingUsers = function (app, countryId, userData) {
	if (app.locals.searchingUsers.hasOwnProperty(countryId)) {
		app.locals.searchingUsers[countryId].push(userData)
	} else {
		app.locals.searchingUsers[countryId] = [userData];
	}
}

const removeFromSearchingUsers = function (app, countryId, id) {
	if (countryId) {
		app.locals.searchingUsers[countryId].forEach((user, index) => {
			if (user.id == id) {
				app.locals.searchingUsers[countryId].splice(index, 1);
			}
		})
	}
}

const findRandomPartner = function(app, socket, countryId, id, partner) {
	socket.emit('searching-partner')

	this.repeatTimes = 0;
	this.startSearching = function() {

		let userPartners = app.locals.searchingUsers[countryId].filter(user => {
			return partner.includes(user.sex) && user.id != id
		})

		if (!userPartners.length) {
			return false
		} else {
			// Generate random partner index
			let randomPartnerIndex = parseInt(Math.random() * (userPartners.length -1));
			let randomPartnerId = userPartners[randomPartnerIndex].id;
			socket.partnerId = randomPartnerId;

			// Connect users
			socket.emit('partner-found', randomPartnerId)
			socket.partnerId = randomPartnerId;
			socket.broadcast.to(randomPartnerId).emit('partner-found', id)

			// Remove both users from searching users list after connected 
			removeFromSearchingUsers(app, countryId, id)
			removeFromSearchingUsers(app, countryId, userPartners[randomPartnerIndex].id)

			return true
		}
	}

	
	
	const searching = setInterval(() => {
		let userConnected = checkUserConnected(app, countryId, id);
		if (userConnected) {
			clearInterval(searching);

			return false;
		}
		
		this.repeatTimes += 1;
		let result = this.startSearching();
		
		if (result) {
			clearInterval(searching);
		}
		
		if (this.repeatTimes >= 3 ) {
			clearInterval(searching);
			socket.emit('partner-zero')
			removeFromSearchingUsers(app, countryId, id)
		}

	}, 3000)
}

const checkUserConnected = function (app, countryId, id) {
	for (const user of app.locals.searchingUsers[countryId]) {
		if (user.id == id) {
			return false;
		}
	}
	
	return true;
}

module.exports = {
	insertIntoOnlineUsers,
	removeFromOnlineUsers,
	insertIntoSearchingUsers,
	removeFromSearchingUsers,
	findRandomPartner,
}