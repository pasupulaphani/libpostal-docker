FROM pasupulaphani/libpostal:latest

MAINTAINER Phaninder <pasupulaphani@gmail.com>

ENV BASE_DIR          /usr/zeromq
ENV PORT              4242
ENV NODE_ENGINE       7.10.0
ENV NODE_PATH         /usr/local


########################################
# ZeroMQ
########################################
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y git build-essential libtool autoconf automake pkg-config unzip libkrb5-dev
RUN cd /tmp && git clone git://github.com/jedisct1/libsodium.git && cd libsodium && git checkout e2a30a && ./autogen.sh && ./configure && make check && make install && ldconfig
RUN cd /tmp && git clone --depth 1 git://github.com/zeromq/libzmq.git && cd libzmq && ./autogen.sh && ./configure && make
# RUN cd /tmp/libzmq && make check
RUN cd /tmp/libzmq && make install && ldconfig
RUN rm /tmp/* -rf

####################


########################################
# nodejs
########################################
ENV PATH $NODE_PATH/bin/:$PATH

# Create some needed directories
RUN mkdir -p $NODE_PATH /app/.profile.d

# Install node
RUN curl -s https://s3pository.heroku.com/node/v$NODE_ENGINE/node-v$NODE_ENGINE-linux-x64.tar.gz | tar --strip-components=1 -xz -C $NODE_PATH

# Export the node path in .profile.d
RUN echo "export PATH=\"$NODE_PATH/bin:\$PATH\"" > /app/.profile.d/nodejs.sh
##############


RUN mkdir -p $BASE_DIR
WORKDIR $BASE_DIR
ADD . $BASE_DIR

# Install dependencies: Node bindings for ZeroMQ
WORKDIR $BASE_DIR/zeromq
RUN if [ -d node_modules ]; then rm -rf node_modules; fi
RUN npm install

VOLUME $BASE_DIR

EXPOSE $PORT
CMD ["npm", "start"]
