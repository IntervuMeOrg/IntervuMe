FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/ui ./packages/ui

EXPOSE 3000

# Use dev command instead of building
CMD ["npm", "run", "dev", "--workspace=@intervume/ui-core"] 