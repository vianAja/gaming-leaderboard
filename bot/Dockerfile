FROM node:18-alpine

WORKDIR /bot

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "bot.js"]