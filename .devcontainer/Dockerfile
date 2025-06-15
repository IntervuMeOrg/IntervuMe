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
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && chown -R $USERNAME:$USERNAME /workspace

USER $USERNAME 