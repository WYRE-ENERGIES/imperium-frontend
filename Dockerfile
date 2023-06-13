FROM node:16.3.0-alpine

# RUN npm install webpack -g

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

# ENV NODE_ENV=production
# ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start" ]
