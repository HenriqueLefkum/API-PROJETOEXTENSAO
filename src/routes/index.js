const { Router } = require('express')

const usersRoutes = require('./users.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use(usersRoutes)



module.exports = routes