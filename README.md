# libpostal

libpostal (https://github.com/openvenues/libpostal) is a C library for parsing and normalizing street addresses.

Suggested container resources:

- 4GB memory
- downloads ~2GB of training data


## Getting started

- Build locally

```
docker build -t libpostal .
```

- (OR) Get latest from hub.docker.com

```
docker pull pasupulaphani/libpostal
```

## Run tests

```
sh test.sh
```

### Get shell

```
docker run -it libpostal /bin/bash
```

-------------------------------------

# libpostal-zeromq

Expose libpostal via Zeromq/ZeroRpc

## Getting started

- Build locally

```
docker build -f Dockerfile.zeromq -t libpostal-zeromq .
```


### Get shell

```
docker run -v ${PWD}:/usr/zeromq/zeromq --publish 4242:4242 --entrypoint=/bin/bash  -it libpostal-zeromq
npm start
```

# Troubleshoot

Check if port is open

```
if ! nc -z 0.0.0.0 4242 2>&1 >/dev/null; then echo "NOT AVAILABLE"; fi
```
