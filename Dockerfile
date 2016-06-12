# Inherit from Heroku's stack
FROM heroku/cedar:14

MAINTAINER Pearlshare "support@pearlshare.com"

ENV DEBIAN_FRONTEND     noninteractive
ENV LIBPOSTAL_DIR       /opt/libpostal
ENV LIBPOSTAL_DATA_DIR  /opt/libpostal_data

########################################
# utils
########################################
RUN apt-get update && apt-get -qq update && apt-get install -y --force-yes \
  curl \
  vim \
  git
##############


########################################
# libpostal
########################################

# libpostal dependencies(libsnappy-dev) source repo
RUN echo "deb http://cz.archive.ubuntu.com/ubuntu trusty main" > /etc/apt/sources.list

RUN apt-get update && apt-get -qq update && apt-get install -y --force-yes \
  libsnappy-dev \
  autoconf \
  automake \
  libtool \
  pkg-config

RUN git clone https://github.com/openvenues/libpostal $LIBPOSTAL_DIR
WORKDIR $LIBPOSTAL_DIR
COPY ./build_libpostal.sh .
RUN ./build_libpostal.sh
##############
