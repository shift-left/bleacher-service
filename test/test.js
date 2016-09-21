
var Config = require('config');
var Bluecat = require('bluecat');

var api = Bluecat.Api('bleacher');

service = new Bluecat.ServiceSync(api, Config.server.host);
service.setProxy(Config.proxy);
exports.bleacher = service;
