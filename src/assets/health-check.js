/* eslint-disable no-var, prefer-template, func-names, prefer-arrow-callback */

/*
 * The health check expects the response's status code to be 200
 * Some apps set their status code to something else, which would
 * cause the health check to always fail.
 *
 * The health check gets sent to this server, which checks if
 * the app is responding to requests, and then sets the correct
 * status code for the health check.
 *
 * This uses the same version of node that the app is using,
 * so it needs to support Node 0.10.
 */

var http = require('http');

var log = function log(message) {
  console.log('[HealthCheck] ' + message);
};


var server = http.createServer(function (request, response) {
  var timeout;

  var appRequest = http.get('http://127.0.0.1:8081', function () {
    response.statusCode = 200;
    response.end('Success');
    clearTimeout(timeout);
  }).on('error', function () {
    response.statusCode = 500;
    response.end('Failed');
    clearTimeout(timeout);
  });

  timeout = setTimeout(function () {
    log('Request to app timed out after 3 seconds');
    appRequest.abort();
  }, 3000);
});


try {
  server.listen(8039);
} catch (e) {
  // Port is being used, likely from another health-check server running
  log('Port being used');
}
