var express = require('express'),
bodyParser = require('body-parser'),
logger = require('morgan'),
adx = require('./adxSvc');
liverail = require('./liveRailSvc');
pubmatic = require('./pubmaticSvc');


var app = express();

var PORT = 3017;
 
//app.set('port', process.env.PORT || config.port);
app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());

/*********************  ADXCHANGE  *************************/
app.get('/adx/reports/count', adx.count);
app.get('/adx/reports/find', adx.find);
//find all
app.get('/adx/reports', adx.find);
app.get('/adx/reports/:id', adx.findById);

/*********************  LIVERAIL  *************************/
app.get('/liverail/reports/count', liverail.count);
app.get('/liverail/reports/find', liverail.find);
//find all
app.get('/liverail/reports', liverail.find);
app.get('/liverail/reports/:id', liverail.findById);

/*********************  PUBMATIC  *************************/
app.get('/pubmatic/reports/count', pubmatic.count);
app.get('/pubmatic/reports/find', pubmatic.find);
//find all
app.get('/pubmatic/reports', pubmatic.find);
app.get('/pubmatic/reports/:id', pubmatic.findById);

 
app.listen(PORT);
console.log('Programmatic Report Service Listening on port '+PORT+'...');

