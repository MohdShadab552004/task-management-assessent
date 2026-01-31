const { createClient } = require('redis');

let redisClient = null;

const connectRedis = async () => {
    try {
        redisClient = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
            },
            username: "default",
            password: process.env.REDIS_PASSWORD,
        });


        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        redisClient.on('connect', () => {
            console.log('Redis Client Connected');
        });

        await redisClient.connect();
        return redisClient;
    } catch (error) {
        console.error('Redis connection error:', error, error.message);
        return null;
    }
};

const getRedisClient = () => redisClient;

// Cache helpers
const setCache = async (key, data, expireSeconds = 300) => {
    try {
        if (redisClient && redisClient.isOpen) {
            await redisClient.setEx(key, expireSeconds, JSON.stringify(data));
        }
    } catch (error) {
        console.error('Redis set error:', error.message);
    }
};

const getCache = async (key) => {
    try {
        if (redisClient && redisClient.isOpen) {
            const data = await redisClient.get(key);
            return data ? JSON.parse(data) : null;
        }
        return null;
    } catch (error) {
        console.error('Redis get error:', error.message);
        return null;
    }
};

const deleteCache = async (key) => {
    try {
        if (redisClient && redisClient.isOpen) {
            await redisClient.del(key);
        }
    } catch (error) {
        console.error('Redis delete error:', error.message);
    }
};

const clearCachePattern = async (pattern) => {
    try {
        if (redisClient && redisClient.isOpen) {
            const keys = await redisClient.keys(pattern);
            if (keys.length > 0) {
                await redisClient.del(keys);
            }
        }
    } catch (error) {
        console.error('Redis clear pattern error:', error.message);
    }
};

module.exports = {
    connectRedis,
    getRedisClient,
    setCache,
    getCache,
    deleteCache,
    clearCachePattern
};
