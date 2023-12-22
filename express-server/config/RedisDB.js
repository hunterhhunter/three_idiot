async function connectingCloud() {
    const dotenv = require('dotenv')
    const redis = require('redis')

    dotenv.config()
    // env DB 환경변수 파일 가져오기

    // redis[s]://[[username]][:password]@[host][:port][/db-number]
    let redisClient = redis.createClient({
        url : `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
        legacyMode : true,
    });
    redisClient.on('connect', () => {
        console.info('Redis connected!');
    });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error', err);
    });
    redisClient.connect().then(); // redis v4 연결 (비동기)
    
    return redisClient;
}

async function getValue(key, redisCli) {
    try {
        const data = await redisCli.get(key)
        return data
    } catch(err) {
        return null;
    }
}

async function setValue(key, data, redisCli) {
    try {
        await redisCli.set(key, data)
    } catch(err) {
        return null;
    }
}

async function removeValue(key, redisCli) {
    const n = await redisCli.exists('username');
    if(n) await redisCli.del('username');
}

async function updateValue(key, data, redisCli) {
    try {
        redisCli.rename(key, data)
    } catch(err) {
        return null;
    }
}

module.exports = {connectingCloud, getValue, setValue, removeValue, updateValue}