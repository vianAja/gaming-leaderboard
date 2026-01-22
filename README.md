# Gaming Leaderboard with Redis

A real-time gaming leaderboard system with automated bot players competing to reach 1000 points first!

## Features

✅ Real-time leaderboard with auto-refresh every 2 seconds  
✅ 3 bot players (Phoenix, Dragon, Shadow) adding random scores (10-50) every 10 seconds  
✅ Redis-based storage on Docker host  
✅ Game ends when someone reaches 1000 points  
✅ Reset functionality to start new game  
✅ Beautiful UI with custom color palette (#F63049, #D02752, #8A244B, #111F35)

## Project Structure

```
gaming-leaderboard/
├── docker-compose.yml
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── public/
│       └── index.html
└── bot/
    ├── Dockerfile
    ├── package.json
    └── bot.js
```

## Setup Instructions

### 1. Create Directory Structure

```bash
mkdir -p gaming-leaderboard/app/public
mkdir -p gaming-leaderboard/bot
cd gaming-leaderboard
```

### 2. Create Files

Copy each file from the artifacts into their respective locations:

**Root directory:**
- `docker-compose.yml`

**app/ directory:**
- `Dockerfile` (App Dockerfile)
- `package.json` (App package.json)
- `server.js` (App Server)

**app/public/ directory:**
- `index.html` (App Frontend)

**bot/ directory:**
- `Dockerfile` (Bot Dockerfile)
- `package.json` (Bot package.json)
- `bot.js` (Bot Script)

### 3. Run the Application

```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## How It Works

1. **Redis Container**: Stores the leaderboard data in a sorted set
2. **App Container**: Serves the web interface and API endpoints
3. **Bot Containers (3x)**: Simulate players by adding random scores every 10 seconds
   - Phoenix (Bot 1)
   - Dragon (Bot 2)
   - Shadow (Bot 3)

## Game Rules

- Each bot adds a random score between 10-50 points every 10 seconds
- The leaderboard automatically refreshes every 2 seconds
- First player to reach 1000 points wins!
- Winners are highlighted with a special badge and animation
- Click "Reset Scores" to start a new game

## API Endpoints

- `GET /api/leaderboard` - Fetch current leaderboard standings
- `POST /api/reset` - Reset all scores and start new game

## Stopping the Application

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Viewing Logs

```bash
# View all logs
docker-compose logs

# View specific container logs
docker-compose logs app
docker-compose logs bot1
docker-compose logs redis

# Follow logs in real-time
docker-compose logs -f
```

## Customization

### Change Bot Names
Edit `docker-compose.yml` and modify the `BOT_NAME` environment variable for each bot.

### Change Score Range
Edit `bot/bot.js` and modify this line:
```javascript
const randomScore = Math.floor(Math.random() * 41) + 10; // 10-50 range
```

### Change Winning Score
Edit `app/public/index.html` and `bot/bot.js`, replace `1000` with your desired score.

### Change Refresh Rate
Edit `app/public/index.html`:
```javascript
refreshInterval = setInterval(fetchLeaderboard, 2000); // 2000ms = 2 seconds
```

## Troubleshooting

**Port already in use:**
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

**Redis connection issues:**
```bash
# Check Redis container status
docker-compose ps
docker-compose logs redis
```

**Rebuild after changes:**
```bash
docker-compose down
docker-compose up --build
```

## Color Palette

- Primary Red: `#F63049`
- Secondary Red: `#D02752`
- Purple: `#8A244B`
- Dark Blue: `#111F35`

Enjoy the game! 🎮🏆