#!/usr/bin/env bash
./bootstrap.sh
mkdir -p $LIBPOSTAL_DATA_DIR
./configure --datadir=$LIBPOSTAL_DATA_DIR
make
make install
ldconfig
