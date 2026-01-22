const redis = require('redis');

const botName = process.env.BOT_NAME || 'Bot';
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379
  },
  username: process.env.REDIS_USER || 'admin',
  password: process.env.REDIS_PASSWORD || undefined
});

redisClient.on('error', err => console.log('Redis Client Error', err));

async function start() {
  await redisClient.connect();
  console.log(`${botName} bot started!`);
  
  setInterval(async () => {
    try {
      const currentScore = await redisClient.zScore('leaderboard', botName) || 0;
      
      if (currentScore < 1000) {
        const randomScore = Math.floor(Math.random() * 41) + 10;
        const newScore = await redisClient.zIncrBy('leaderboard', randomScore, botName);
        console.log(`${botName} scored ${randomScore} points! Total: ${newScore}`);
        
        if (newScore >= 1000) {
          console.log(`🏆 ${botName} reached 1000 points and WON!`);
        }
      }
    } catch (error) {
      console.error(`Error for ${botName}:`, error);
    }
  }, 10000);
}

start();