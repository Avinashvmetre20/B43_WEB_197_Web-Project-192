const redis = require('redis');

let client;

const connectRedis = async () => {
    if (!client) {
        client = redis.createClient({ url: process.env.REDIS_URL });

        client.on('error', (err) => console.error('Redis Client Error', err));

        try {
            await client.connect();
            console.log('Connected to Redis');
        } catch (err) {
            console.error('Failed to connect to Redis:', err.message);
        }
    }

    return client;
};

module.exports = { connectRedis };
