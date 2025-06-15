FROM node:18-alpine

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY nx.json ./

# Copy all packages
COPY packages/ ./packages/

# Install all dependencies
RUN npm install

# Build frontend
RUN npm run build --workspace=@intervume/ui-core

# Build backend  
RUN npm run build --workspace=@intervume/server-api

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy built frontend to nginx directory
RUN cp -r packages/ui/dist/* /var/lib/nginx/html/

# Copy startup script
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

# Expose port 80 (Activepieces style)
EXPOSE 80

# Start both services
CMD ["/start.sh"] 