const express = require('express')
const router = express.Router()
const request = require('request')
const help = require('../helper')

router.post('/login', function (req, res) {
	let user = null;

	if (req.body.user) {
		user = req.body.user;
	}

	if (!user.sex || !user.partner || !user.country || !user.token) {
		return res.status(400).json({ message: "Something went wrong!" });
	}

	const verifyCaptchaOptions = {
		uri: "https://www.google.com/recaptcha/api/siteverify",
		json: true,
		form: {
			secret: '6Ld4RnQUAAAAAPdZaBbHdginQWteAohILLt1OXuT',
			response: user.token
		}
	}

	request.post(verifyCaptchaOptions, function (err, response, body) {
		if (err) {
			return res.status(500).json({ message: "oops, something went wrong on our side" });
		}

		if (!body.success) {
			return res.status(500).json({ message: body["error-codes"].join(".") });
		}

		//Save the user to the database. At this point they have been verified.
		res.status(201).json({ success: true, user: user });
	});

})

router.get('/get_users', function (req, res) {
	let numberOfOnlineUsers = 0;
	let users = req.app.locals.onlineUsers;

	if (Object.keys(users).length) {
		for (const key in users) {
			if (users.hasOwnProperty(key)) {
				numberOfOnlineUsers += help.countArray(users[key]);
			}
		}
	}

	res.status(201).json({ onlineUsers: numberOfOnlineUsers })
})

router.get('/get_users_from_country', function (req, res) {
	let numberOfOnlineUsers = 0;
	let countryId = 'undefined';
	let users = req.app.locals.onlineUsers;

	if (req.query.countryId) {
		countryId = req.query.countryId;
	}

	if (users.hasOwnProperty(countryId) && users[countryId].length > 0) {
		numberOfOnlineUsers = help.countArray(users[countryId]);
	}

	res.status(201).json({ onlineUsers: numberOfOnlineUsers })
})

router.get('/get_males_and_females', function (req, res) {
	let males = 0;
	let females = 0;
	let countryId = 'undefined';
	let users = req.app.locals.onlineUsers;

	if (req.query.countryId) {
		countryId = req.query.countryId;
	}

	if (users.hasOwnProperty(countryId) && users[countryId].length > 0) {
		users[countryId].forEach(item => {
			if (item.sex == 'female') {
				females++;
			} else if (item.sex == 'male') {
				males++;
			}
		})
	}

	res.status(201).json({ males: males, females: females })
})

module.exports = router