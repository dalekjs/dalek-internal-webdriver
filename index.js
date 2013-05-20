// int. libs
var WebDriver = require('./lib/webdriver');
var Driver = require('./lib/driver')(WebDriver);

// include webdriver commands
require('./lib/commands/session')(Driver);
require('./lib/commands/timeout')(Driver);
require('./lib/commands/window')(Driver);
require('./lib/commands/url')(Driver);
require('./lib/commands/execute')(Driver);
require('./lib/commands/screenshot')(Driver);
require('./lib/commands/ime')(Driver);
require('./lib/commands/frame')(Driver);
require('./lib/commands/cookie')(Driver);
require('./lib/commands/element')(Driver);
require('./lib/commands/interaction')(Driver);
require('./lib/commands/storage')(Driver);
require('./lib/commands/page')(Driver);

module.exports = WebDriver;
