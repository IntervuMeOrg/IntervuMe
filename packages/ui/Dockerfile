FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/ui ./packages/ui

# Build UI
RUN npm run build --workspace=@intervume/ui-core

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=@intervume/ui-core"] 