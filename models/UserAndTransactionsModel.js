const { default: mongoose } = require("mongoose");

const userAndTransactionsSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    spendOnItem:{
        type:String,
        required:true
    },
    dateOfPurchased:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timestamps:true
});
const userTransactionsInstance = mongoose.model('users_transactions',userAndTransactionsSchema);
class UserAndTransactionModel {
    create(userTransaction){
        const userTransactionData = new userTransactionsInstance(userTransaction);
        return new Promise((resolve,reject)=>{
            userTransactionData.save().then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            })
        })
    }

    list(findQuery,sort,limit,skip){
        return new Promise((resolve,reject)=>{
            userTransactionsInstance.find(findQuery)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .lean()
            .then((result)=>{
                resolve(result)
            }).catch((error)=>{
                console.log('error in UserAndTransactionModel/list',error)
                reject(error)
            })
        })
    }

    getTotalRecords(findQuery){
        return new Promise((resolve,reject)=>{
            userTransactionsInstance.count(findQuery).exec().then((result)=>{
                resolve(result)
            }).catch((error)=>{
                reject(error)
            })
        })
    }
}
module.exports = new UserAndTransactionModel();