const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:false
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timestamps:true
});
const userInstance = mongoose.model('users',userSchema);
class UserModel {
    create(user){
        const userData = new userInstance(user);
        return new Promise((resolve,reject)=>{
            userData.save().then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            })
        })
    }
}
module.exports = new UserModel();