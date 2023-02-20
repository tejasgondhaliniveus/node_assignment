const express=require('express');
const UserAndTransactionsController = require('../controllers/UserAndTransactionsController');
const UserTransactionRouter = express.Router()
const cache = require('../middlewares/cacheServer/UserTransactionsRedis')

UserTransactionRouter.post('/create-user-transaction',UserAndTransactionsController.createUserTransactions)
UserTransactionRouter.get('/user-transactions/:userId',cache.listUserTransactions,UserAndTransactionsController.userTransactions)

module.exports = UserTransactionRouter;