const express = require('express');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379
  },
  username: process.env.REDIS_USER || 'admin',
  password: process.env.REDIS_PASSWORD || undefined
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await redisClient.zRevRangeWithScores('leaderboard', 0, -1);
    const formattedLeaderboard = leaderboard.map((item, index) => ({
      rank: index + 1,
      player: item.value,
      score: item.score
    }));
    res.json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.post('/api/reset', async (req, res) => {
  try {
    await redisClient.del('leaderboard');
    res.json({ success: true, message: 'Leaderboard reset successfully' });
  } catch (error) {
    console.error('Error resetting leaderboard:', error);
    res.status(500).json({ error: 'Failed to reset leaderboard' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});