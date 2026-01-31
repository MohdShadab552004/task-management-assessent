const { getCache, setCache } = require('../config/redis');

const CACHE_DURATION = 300; // 5 minutes

const cacheMiddleware = (keyPrefix) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Generate cache key based on URL and query params
        const cacheKey = `${keyPrefix}:${req.originalUrl}`;

        try {
            const cachedData = await getCache(cacheKey);

            if (cachedData) {
                console.log(`Cache hit: ${cacheKey}`);
                return res.json(cachedData);
            }

            console.log(`Cache miss: ${cacheKey}`);

            // Store original json method
            const originalJson = res.json.bind(res);

            // Override json to cache the response
            res.json = async (data) => {
                // Only cache successful responses
                if (res.statusCode === 200 && data.success) {
                    await setCache(cacheKey, data, CACHE_DURATION);
                }
                return originalJson(data);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

module.exports = cacheMiddleware;
