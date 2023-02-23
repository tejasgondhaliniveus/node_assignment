const { check, validationResult, param } = require("express-validator");
const RedisKeyConstants = require("../config/RedisKeyConstants");
const UserAndTransactionsService = require("../services/UserAndTransactionsService");
const { set } = require("../utility/RedisClient");
const redisPort = require('../utility/RedisClient')

class UserAndTransactionsController {
    async createUserTransactions(req, res) {
        const responseResult = {};
        try {
            check('userId', 'User id is required').not().isEmpty()
            check('dateOfPurchased', 'dateOfPurchased is required').not().isEmpty()
            check('amount', 'spended amount is required').not().isEmpty()
            check('spendOnItem', 'spendOnItem is required').not().isEmpty()
            const validationError = validationResult(req)
            if (validationError.errors.length > 0) {
                responseResult.message = `User's transaction is not created`;
                responseResult.success = false;
                responseResult.validationError = validationError;
                return res.status(400).send(responseResult)
            }
            const newUserTransactionData = req.body;
            const result = await UserAndTransactionsService.createUserTransaction(newUserTransactionData);
            if (Object.keys(result).length > 0) {
                responseResult.message = `Successfully created new user's transaction`;
                responseResult.success = true;
                responseResult.result = result
                return res.status(200).send(responseResult)
            } else {
                responseResult.message = `User's transaction is not created`;
                responseResult.success = false;
                return res.status(400).send(responseResult)
            }

        } catch (error) {
            console.log('error in controller/UserAndTransactionsController/createUserTransactions ', error)
            responseResult.message = `Error in creating user transaction. Error message(${error})`;
            responseResult.success = false;
            return res.status(400).send(responseResult)
        }
    }

    async userTransactions(req, res) {
        const responseResult = {}
        try {
            const page = req.query.page || 1;
            const limit = 2;
            const skip = (page - 1) * limit;
            const findQuery = {};
            //date range filter
            let key = `${RedisKeyConstants.users_transactions}_${req.params.userId}_${req.query.page ? req.query.page : 1}_`;
            if (req.query.startDate && req.query.endDate) {
                findQuery.dateOfPurchased = {
                    "$gte": new Date(req.query.startDate),
                    "$lte": new Date(req.query.endDate),
                }
                key += `startdate${req.query.startDate}enddate${req.query.endDate}`
            } else if (req.query.startDate && !req.query.endDate) {
                findQuery.dateOfPurchased = {
                    "$gte": new Date(req.query.startDate)
                }
                key += `startdate${req.query.startDate}`
            } else if (req.query.endDate) {
                findQuery.dateOfPurchased = {
                    "$lte": new Date(req.query.endDate)
                }
                key += `enddate${req.query.endDate}`
            }
            //amount range filter
            if (req.query.greaterThan && req.query.lessThan) {
                findQuery.amount = {
                    "$gte": parseInt(req.query.greaterThan),
                    "$lte": parseInt(req.query.lessThan),
                }
                key += `greaterthan${req.query.greaterThan}lessthan${req.query.lessThan}`
            } else if (req.query.greaterThan && !req.query.lessThan) {
                findQuery.amount = {
                    "$gte": parseInt(req.query.greaterThan)
                }
                key += `greaterthan${req.query.greaterThan}`
            } else if (req.query.lessThan) {
                findQuery.amount = {
                    "$lte": parseInt(req.query.lessThan)
                }
                key += `lessthan${req.query.lessThan}`
            }
            findQuery.userId = req.params.userId;
            const totalRecords = await UserAndTransactionsService.getTotalRecords(findQuery)
            let result = await UserAndTransactionsService.listUserTransactions(findQuery, { createdAt: 1 }, limit, skip)
            if (Object.keys(result).length > 0) {
                responseResult.message = `Successfully fetched new user's transaction`;
                responseResult.success = true;
                responseResult.result = result
                responseResult.page = page
                responseResult.totalRecords = totalRecords
                set(key,responseResult,300)
                return res.status(200).send(responseResult)
            } else {
                responseResult.message = `Unable to fetch user's transaction`;
                responseResult.success = false;
                responseResult.page = page
                responseResult.totalRecords = totalRecords
                return res.status(400).send(responseResult)
            }
        } catch (error) {
            console.log('Error in UserAndTransactionsController/userTransactions', error)
            responseResult.message = `Error in fetching user transaction. Error message(${error})`;
            responseResult.success = false;
            responseResult.userTransactions = []
            return res.status(400).send(responseResult)
        }
    }
}
module.exports = new UserAndTransactionsController();