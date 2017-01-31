# libpostal-zeromq-docker

SpaCy zeromq

## Getting started

- Build locally

```
docker build -f Dockerfile.zeromq -t libpostal-zeromq .
```


### Get shell

```
docker run -v ${PWD}:/usr/libpostal --publish 4242:4242 --entrypoint=/bin/bash  -it libpostal-zeromq
```
