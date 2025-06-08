# STAGE 1: BUILDING
# Specify node image for builder
FROM node:22-alpine3.22 AS builder

# Set directory for application
WORKDIR /app

# Copy packages inside application dir
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm ci

# Copy application code
COPY . .

# Generate Prisma client & build an app
RUN npx prisma generate && npm run build

# STAGE 2: PRODUCTION
# Specify node image
FROM node:22-alpine3.22

# Set directory for application
WORKDIR /app

# Copy packages inside application dir
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm ci --omit=dev

# Copy application code from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Start app in a dev mode
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]