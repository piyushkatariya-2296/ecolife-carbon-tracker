# Step 1: Build React Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files and compile build
COPY . .
RUN npm run build

# Step 2: Set up Nginx server to serve the build
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (Cloud Run port)
EXPOSE 8080

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
