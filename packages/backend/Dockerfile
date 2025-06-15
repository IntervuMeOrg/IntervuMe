FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/tsconfig.json ./packages/backend/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/backend ./packages/backend

EXPOSE 5000

# Use tsx for development instead of building
CMD ["npm", "run", "dev", "--workspace=@intervume/server-api"] 