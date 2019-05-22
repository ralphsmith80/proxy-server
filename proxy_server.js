var http = require('http'),
  httpProxy = require('http-proxy'),
  argv = require('yargs').usage(
    'Usage: $0 --sid [session-id] --jsid [JSESSIONID] --proxy-host [proxy-host] --p [port]'
  ).argv;

var sid = argv.sid,
  jsid = argv.jsid,
  proxyHost = argv['proxy-host'] || '10.238.40.232',
  port = argv.port || 3004;

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  if (sid) {
    proxyReq.setHeader('sid', sid);
  }
  if (jsid) {
    proxyReq.setHeader('cookie', 'JSESSIONID=' + jsid);
  }
  proxyReq.path = proxyReq.path.replace('/banking-services/api/', '');
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: 'http://' + proxyHost
  });
});

console.log('listening on port', port);
server.listen(port);
