# Multi-stage build for production

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./

# Stage 3: Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/server ./server

# Copy frontend build
COPY --from=frontend-build /app/client/build ./client/build

# Create uploads directory
RUN mkdir -p ./server/uploads

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
WORKDIR /app/server
CMD ["node", "server.js"]
