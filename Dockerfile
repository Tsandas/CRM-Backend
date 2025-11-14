FROM node:20-alpine
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "./src/server.js"]