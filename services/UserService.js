const UserModel = require("../models/UserModel");
class UserService {
    createUser(data) {
        try {
            data.email = (data.email).toLowerCase()
            data.name = (data.name).toLowerCase()
            if (data.mobile) {
                data.mobile = parseInt(data.mobile)
            }
            return UserModel.create(data)
        }catch(error){
            console.log('Error in UserService/createUser',error)
            throw error
        }
        
    }
}
module.exports = new UserService();