module.exports = function (moduleOptions) {
	const { app } = require('../server/app.js')
	const routes = require('../server/api/index.js')

  app.use((req, res, next) => {
		routes(req, res, next)
  })

	if (process.env.node_env !== 'development') {
		this.addServerMiddleware(app)
	}
}
