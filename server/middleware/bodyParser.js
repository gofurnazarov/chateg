module.exports = function (req, res, next) {
	if (req) {
		var data = "";
		req.on('data', function (chunk) { data += chunk })
		req.on('end', function () {
			if (data) {
				req.body = JSON.parse(data);
			}
			next();
		})
	}
	else
	{
		next();
	}
}