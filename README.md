# proxy-server

A simple proxy server

## example

```
node proxy_server.js --proxy-host=10.10.10.10
```

or

```
npm start -- --proxy-host=10.10.10.10
```

## Options

### sid

Type: `Session Id`

Default: `None`

The session id to use in the request header for authentication. Note you will need to authenticate via typical menthods to get one of these to use.

### jsid

Type: `Jsession Id`

Default: `None`

The Jsession id to use in the request header for authentication. Note you will need to authenticate via typical menthods to get one of these to use.

### port

Type: `Integer`

Default: `3004`

The port on which the proxy server will respond.

### proxy-host

Type: `String`

Default: `'10.238.40.232'`

The ip/hostname to proxy api request to.
