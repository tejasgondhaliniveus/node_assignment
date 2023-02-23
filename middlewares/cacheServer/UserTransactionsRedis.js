const { get } = require('../../utility/RedisClient')
const redisKeysConstants = require('../../config/RedisKeyConstants')
class UserTransactionsRedis {
    async listUserTransactions(req, res, next) {
        try {
            let key = `${redisKeysConstants.users_transactions}_${req.params.userId}_${req.query.page ? req.query.page : 1}_`
            if (req.query.startDate && req.query.endDate) {
                key += `startdate${req.query.startDate}enddate${req.query.endDate}`
            } else if (req.query.startDate && !req.query.endDate) {
                key += `startdate${req.query.startDate}`
            } else if (req.query.endDate) {
                key += `enddate${req.query.endDate}`
            }
            //amount range filter
            if (req.query.greaterThan && req.query.lessThan) {
                key += `greaterthan${req.query.greaterThan}lessthan${req.query.lessThan}`
            } else if (req.query.greaterThan && !req.query.lessThan) {
                key += `greaterthan${req.query.greaterThan}`
            } else if (req.query.lessThan) {
                key += `lessthan${req.query.lessThan}`
            }
            const result = await get(key)
                if(result){
                    console.log('cache')
                    const responseResult = JSON.parse(result)
                    return res.status(200).send(responseResult)
                }else{
                    console.log('from here');
                    next()
                }
        } catch (error) {
            console.log('error while fetching user transactions from cache')
            next()
        }
    }
}
module.exports = new UserTransactionsRedis()