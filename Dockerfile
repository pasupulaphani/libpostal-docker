# Inherit from Heroku's stack
FROM heroku/cedar:14

MAINTAINER Phaninder "hello@phaninder.com"

ENV DEBIAN_FRONTEND     noninteractive
ENV LIBPOSTAL_DIR       /opt/libpostal
ENV LIBPOSTAL_DATA_DIR  /opt/libpostal_data


########################################
# libpostal
########################################
RUN echo "deb http://cz.archive.ubuntu.com/ubuntu trusty main" > /etc/apt/sources.list

RUN apt-get update && apt-get -qq update && apt-get install -y --force-yes \
  libsnappy-dev \
  autoconf \
  automake \
  libtool \
  pkg-config \
  git

RUN git clone https://github.com/openvenues/libpostal $LIBPOSTAL_DIR
WORKDIR $LIBPOSTAL_DIR
RUN git checkout parser-data
COPY ./build_libpostal.sh .
RUN ./build_libpostal.sh
##############

WORKDIR $LIBPOSTAL_DIR

CMD ["./src/libpostal"]
