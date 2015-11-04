var express = require('express');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var routes = require('./routes');
var config = require('./config.json');
var fs = require('fs');
var init = require('./lib/init');


if (!config.appName || !config.port || !config.dataDir || !config.tmpDir) {
  console.error('please fill out config.json');
  process.exit(1);
}

init.reloadAllGroups();
init.ensureBaseFolders();
init.checkForBadFolders();

if (!fs.existsSync(config.dataDir)) {
  console.error('dataDir', config.dataDir, 'does not exist');
}


if (!fs.existsSync(config.tmpDir)) {
  console.error('tmpDir', config.tmpDir, 'does not exist');
}

var app = express();
app.locals.title = config.appName;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({
  dest: config.tmpDir
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

module.exports = app;


