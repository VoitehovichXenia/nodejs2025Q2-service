# STAGE 1: BUILDING
# Specify node image for builder
FROM node:22-alpine3.22 AS builder

# Set directory for application
WORKDIR /app

# Copy packages inside application dir
COPY package*.json .npmrc ./
RUN npm ci && npm cache clean --force

# Copy application code
COPY . .

# Start app
ENTRYPOINT ["npm", "run", "db:start:prod"]