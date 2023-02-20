const UserTransactionModel = require('../models/UserAndTransactionsModel')

class UserAndTransactionService {
    createUserTransaction(data) {
        try {
            data.spendOnItem = data.spendOnItem.toString().toLowerCase()
            data.dateOfPurchased = new Date(data.dateOfPurchased)
            data.amount = parseInt(data.amount)
            return UserTransactionModel.create(data)
        }catch(error){
            console.log('Error in UserAndTransactionService/createUserTransaction',error)
            throw error
        }
    }
    listUserTransactions(findQuery,sort,limit,skip){
        return UserTransactionModel.list(findQuery,sort,limit,skip)
    }
    getTotalRecords(findQuery){
        return UserTransactionModel.getTotalRecords(findQuery)
    }
}
module.exports = new UserAndTransactionService()