const express=require('express');
const UserRouter = express.Router()
const UserController = require('../controllers/UserController')

UserRouter.post('/create-user',UserController.createUser)

module.exports = UserRouter