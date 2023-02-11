FROM node:12

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN echo $NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install deps to build natively
RUN apt-get update && apt-get -y upgrade
RUN apt-get -y install nodejs \
    python \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean \
    && npm install \
    && rm -rf dist/ \
    && npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
