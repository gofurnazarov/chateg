module.exports = function (req, res, next) {
	var data = "";
	req.on('data', function (chunk) { data += chunk })
	req.on('end', function () {
		if (data) {
			req.body = JSON.parse(data);
		}
		next();
	})
}