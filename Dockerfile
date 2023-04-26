FROM node:18-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
ENV NODE_SERVER_PORT=3000
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]