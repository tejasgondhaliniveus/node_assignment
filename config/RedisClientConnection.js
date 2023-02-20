class RedisClientConnection {
    redisPort = process.env.REDIS_PORT
    redisPassword = process.env.REDIS_PASSWORD
    redisHostMaster = process.env.REDIS_HOST_MASTER
    rediUsername= process.env.REDIS_USERNAME
}
module.exports = new RedisClientConnection();