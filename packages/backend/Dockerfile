FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/backend ./packages/backend

# Build backend
RUN npm run build --workspace=@intervume/server-api

EXPOSE 5000

CMD ["npm", "run", "start", "--workspace=@intervume/server-api"] 