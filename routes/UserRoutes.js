const express=require('express');
const UserRouter = express.Router()
const UserController = require('../controllers/UserController')
const upload = require('../utility/FileUpload')

UserRouter.post('/create-user',UserController.createUser)
UserRouter.post('/upload-user-image',upload.single('upload_image'),UserController.uploadUserImages)
module.exports = UserRouter