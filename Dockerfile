FROM node:16.3.0-alpine as BUILD_IMAGE

# RUN npm install webpack -g

WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# # Production Stage
# FROM node:16.3.0-alpine AS PRODUCTION_STAGE
# WORKDIR /app
# COPY --from=BUILD_IMAGE /app/package*.json ./
# RUN npm install --production
# COPY --from=BUILD_IMAGE /app/build ./build

# EXPOSE 3000
# # RUN npm install -g serve

# # EXPOSE 3000
# # RUN serve -s build

# CMD ["npm", "start"]
