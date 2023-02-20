const redis = require('redis');
const { redisPort, redisHostMaster, redisPassword, rediUsername } = require('../config/RedisClientConnection')
const url = `redis://${rediUsername}:${redisPassword}@${redisHostMaster}:${redisPort}` // redis[s]://[[username][:password]@][host][:port][/db-number]:
const redisClient = redis.createClient(
    url
);
redisClient.connect()
    .then(() => {
        console.log('Redis-cache server connected...')
    }).catch((error) => {
        console.log('Error while connecting Redis-cache', error)
    })
class RedisClient {
    /*
    constructor() {
        const url = `redis://${rediUsername}:${redisPassword}@${redisHostMaster}:${redisPort}` // redis[s]://[[username][:password]@][host][:port][/db-number]:
        const redisClient = redis.createClient(
            url
        );
        console.log('redis url', url)
        redisClient.connect()
            .then(() => {
                console.log('Redis-cache server connected...')
            }).catch((error) => {
                console.log('Error while connecting Redis-cache', error)
            })
        this.redisClient = redisClient;
    }
    */

    async get(key) {
        try {
            const fetchData= await redisClient.get(key)
            return fetchData       
        } catch (error) {
            console.log('retry error=>', retryError)
            await redisClient.connect();
            const fetchData = await redisClient.get(key);
            return fetchData
        }
    }
    async set(key, value, ttl) {
        ttl = ttl ? ttl : 10000 //in ms
        try {
            redisClient.set(key, JSON.stringify(value), ttl)
        } catch (error) {
            await redisClient.connect();
            redisClient.set(key, JSON.stringify(value), ttl)
            console.log('Error in creating record in redis server', error)
        }
    }
    async delete(keyPattern) {
        redisClient.keys(keyPattern).then((result) => {
            if (result.length > 0) {
                for (const item of result) {
                    redisClient.del(item)
                }
            }
        }).catch(async (retryError) => {
            try {
                console.log('retry error=>', retryError)
                await redisClient.connect();
                const result = redisClient.keys(keyPattern)
                if (result.length > 0) {
                    for (const item of result) {
                        redisClient.del(item)
                    }
                }
            } catch (error) {
                console.log('Error in fetching key from redis server', error)
                return []
            }
        })
    }

}
module.exports = new RedisClient()