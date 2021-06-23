const RestProxy = require('sp-rest-proxy');
const settings = {
  port: 8082,
};

const restProxy = new RestProxy(settings);
restProxy.serve();
