
const { check, validationResult } = require("express-validator");
const UserService = require("../services/UserService");
const Utils = require("../utility/Utils");

class UserController {
    async createUser(req, res) {
        //write code to create user
        const responseResult = {}
        try {
            check('email', 'Please check the entered email').isEmail()
            check('email', 'Email is mandatory').not().isEmpty()
            check('name', 'Name is mandatory').not().isEmpty()
            const validationError = validationResult(req)
            if (validationError.errors.length > 0) {
                responseResult.message = 'User not created';
                responseResult.success = false;
                responseResult.validationError = validationError;
                return res.status(400).send(responseResult)
            }

            const newUserData = req.body;
            const result = await UserService.createUser(newUserData);
            if (Object.keys(result).length > 0) {
                responseResult.message = 'Successfully created new user';
                responseResult.success = true;
                responseResult.result = result
                return res.status(200).send(responseResult)
            } else {
                responseResult.message = 'User not created';
                responseResult.success = false;
                return res.status(400).send(responseResult)
            }
        } catch (error) {
            console.log('error in controller/UserController/createUser ', error)
            responseResult.message = `Error in creating user. Error message(${error})`;
            responseResult.success = false;
            return res.status(400).send(responseResult)
        }
    }
    async uploadUserImages(req,res){
        try{
            // console.log('req',req)
            const result = await Utils.uploadFileToCloudStorage(req.body,req.file)
            console.log('result===>',result)
            return result
            
        }catch(error){
            console.log('error in UserController/uploadUserImages==>',error)
        }
    }
}
module.exports = new UserController()