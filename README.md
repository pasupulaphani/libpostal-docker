# libpostal

libpostal latest - v1.0.0 (https://github.com/openvenues/libpostal) is a C library for parsing and normalizing street addresses.

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

Expose libpostal via Zeromq/ZeroRpc. This calls NodeJS Libpostal bindings (node-postal) via zerorpc.

## Getting started

- Build locally

```
docker build -f Dockerfile.zeromq -t libpostal-zeromq .
```

- (OR) Get latest from hub.docker.com

```
docker pull pasupulaphani/libpostal-zeromq
```


### Start server

```
docker run --publish 4242:4242 -it libpostal-zeromq
```


### API

##### parse
```
$ zerorpc  tcp://0.0.0.0:4242 parse "the book club, london"

[{'component': 'house', 'value': 'the book club'},
 {'component': 'city', 'value': 'london'}]
```

##### expand
```
$ zerorpc  tcp://0.0.0.0:4242 expand "wardour st, uk"

['wardour street uk', 'wardour saint uk']
```


##### expandAndParse
```
$ zerorpc  tcp://0.0.0.0:4242 expandAndParse "wardour st, uk"

[{'country': 'uk', 'road': 'wardour st'},
 {'city': 'uk', 'road': 'wardour street'},
 {'house': 'wardour saint uk'}]
```


# Troubleshoot

***Get Shell***
```
docker run -v ${PWD}:/usr/zeromq -e PORT=4243 --publish 4243:4243 --entrypoint=/bin/bash  -it libpostal-zeromq
npm start
```


***Check if port is open***

```
if ! nc -z 0.0.0.0 4242 2>&1 >/dev/null; then echo "NOT AVAILABLE"; fi
```
