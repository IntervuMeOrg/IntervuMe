FROM node:18-bullseye

# Install additional tools for development
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    nano \
    postgresql-client \
    redis-tools \
    && rm -rf /var/lib/apt/lists/*

# Create workspace directory
WORKDIR /workspace

# Install global development tools
RUN npm install -g tsx nodemon

# Create non-root user (good practice for dev containers)
ARG USERNAME=vscode

# Conditionally create user and group
RUN if ! id -u $USERNAME >/dev/null 2>&1; then \
        useradd --create-home --shell /bin/bash $USERNAME; \
    fi \
    && chown -R $USERNAME:$USERNAME /workspace

# Switch to non-root user
USER $USERNAME
