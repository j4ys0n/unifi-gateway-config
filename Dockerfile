FROM ubuntu:bionic

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    make \
    curl \
    python \
    software-properties-common \
    build-essential \
    libc6-dev \
    g++-multilib \
    automake \
    libssl1.0-dev \
    libsasl2-dev \
    libsasl2-modules \
    librdkafka-dev vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
ENV NODE_VERSION 11.12.0
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN ln -sf /usr/local/nvm/versions/node/v$NODE_VERSION/bin/node /usr/bin/nodejs
RUN ln -sf /usr/local/nvm/versions/node/v$NODE_VERSION/bin/node /usr/bin/node
RUN ln -sf /usr/local/nvm/versions/node/v$NODE_VERSION/bin/npm /usr/bin/npm

WORKDIR /unifi-gateway-config

COPY package.json .
COPY package-lock.json .

RUN npm install --no-save

COPY lib ./lib
COPY tsconfig.json .
RUN npm run build

ENV ENV=prod

CMD ["node", "--max_old_space_size=8192", "./dist/index.js"]
