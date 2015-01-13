#!/usr/bin/env node

var js2xmlparser = require("js2xmlparser");

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

//connection objects we will keep open during operation
var findConn;
var connectingFind = false;
var countConn;
var connectingCount = false;

var DB_URL = 'mongodb://localhost:27017/programmatic';
var PUBMATIC = "pubmatic";

var findCb = function(conErr, db, req, res) {
    if (conErr) { 
        return res.send('CONNECTION ERROR! '+conErr); 
    }
    var format = req.query.format || 'json';
    var collectionName = PUBMATIC;

    var key = req.query.key || 'all';
    var val = req.query.val || '';
    val = val.replace(/%3A/g, ':').replace(/%2E/g,'.').replace(/%2D/g,'-').replace(/%2F/g,'/');

    //get report type
    var reportType = req.query.reportType || 'getPublisherAdTagReport';
    
    var query = { };
    if(key !== 'all') {
        var regEx = new RegExp(val+".*",'i'); //a begins-with query
        query[key] = regEx;
    }

    query["reportType"] = reportType;
    
    console.log("searching: "+JSON.stringify(query));

    var skip = req.query.skip || 0; //defaults to index of 0
    var limit = req.query.limit || 20; //defaults to limit of 20

    var options = {};
    options.limit = limit;
    options.skip = skip;
    //options.sort = [['created','desc'], ['registerUserSocial','asc']];
    
    db.collection(collectionName, function(err, collection) {
        collection.find(query, {}, options).toArray(function(err, docs) {
            if(!err && docs) {
                console.log(docs.length+" docs found");
                if(format === 'xml') {
                    var xmlOptions = {callFunctions: false, declaration: {include: false}};
                    var docsXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n";
                    docsXml += "<results>\n";
                    for(var d = 0; d < docs.length; d++) {
                        var docObj = docs[d];
                        //console.log("xml converting "+(d+1)+" of "+docs.length+" docs");
                        docsXml += js2xmlparser( "result", JSON.stringify(docObj), xmlOptions ) + '\n';
                    }
                    
                    docsXml += "</results>\n";
                    //res.header('Content-Type', 'text/xml');
                    res.contentType('text/xml');
                    res.send(docsXml);
                }
                else {
                    res.send(docs);
                }
            }
            else {
                if(format === 'xml') {
                    res.contentType('text/xml');
                    res.send( "<error>" + err.message + "</error>");
                }
                else {
                    res.send( { error: err.message } );
                }
            }
        });
    });
}

var find = function(req, res) {
    //make service available to all IP addresses
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (findConn === undefined && !connectingFind) {
        connectingFind = true;
        //console.log("find creating mongodb connection.");
        MongoClient.connect(DB_URL, function(err, db) {
            if(err) { return findCb(err)};
            findConn = db;
            findCb(null, db, req, res, false);
        });  
    } else {
        setTimeout(
            function() {
                findCb(null, findConn, req, res, false);
            }, 
            1*1000
        ); 
    }
}

var countCb = function(conErr, db, req, res) {
    if (conErr) { 
        return res.send('CONNECTION ERROR! '+conErr); 
    }
    var format = req.query.format || 'json';
    var collectionName = PUBMATIC;

    var key = req.query.key || 'all';
    var val = req.query.val || '';
    val = val.replace(/%3A/g, ':').replace(/%2E/g,'.').replace(/%2D/g,'-').replace(/%2F/g,'/');

    //get report type
    var reportType = req.query.reportType || 'getPublisherAdTagReport';
    
    var query = { };
    if(key !== 'all') {
        var regEx = new RegExp(val+".*",'i'); //a begins-with query
        query[key] = regEx;
    }

    query["reportType"] = reportType;

    db.collection(collectionName, function(err, collection) {
        collection.count(query, function(err, count) {
            if(!err && count) {
                //console.log("count: "+count);
                var countObj = { "count": count};
                if(format === 'xml') {
                    var countXml = js2xmlparser( "result", countObj );
                    //res.header('Content-Type', 'text/xml');
                    res.contentType('text/xml');
                    res.send(countXml);
                }
                else {
                    res.send(countObj);
                }
            }
            else {
                var errMsg = "Error processing request.";
                if(err && err.message) {
                    errMsg = err.message;
                }
                if(format === 'xml') {
                    res.contentType('text/xml');
                    res.send( "<error>" + errMsg + "</error>");
                }
                else {
                    res.send( { error: errMsg } );
                }
            }
        });
    });
}

var count = function(req, res) {
    //make service available to all IP addresses
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (countConn === undefined && !connectingCount) {
        connectingCount = true;
        //console.log("count creating mongodb connection.");
        MongoClient.connect(DB_URL, function(err, db) {
            if(err) { return countCb(err)};
            countConn = db;
            countCb(null, db, req, res);
        });  
    } else {
        setTimeout(
            function() {
                countCb(null, countConn, req, res);
            }, 
            1*1000
        ); 
    }
}

 
var findByIdCb = function(conErr, db, req, res) {
    if (conErr) { 
        return res.send('CONNECTION ERROR! '+conErr); 
    }
    var format = req.query.format || 'json';

    //var pubCode = req.query.pubCode || 'GLM';
    //var collectionName = PUBMATIC + pubCode;
    var collectionName = PUBMATIC;

    var id = req.params.id;
    console.log('Retrieving Pubmatic report: ' + id);
    db.collection(collectionName, function(err, collection) {
        collection.findOne({_id: ObjectId(id)}, function(err, doc) {
            if(!err) {
                if(format === 'xml') {
                    res.contentType('text/xml');
                    if(!doc) {
                        res.send( "<error>Nothing found for ID: " + id + "</error>");
                    }
                    else {
                        var docXml = js2xmlparser( "report", JSON.stringify(doc) );
                        //res.header('Content-Type', 'text/xml');
                        
                        res.send(docXml);
                    }
                    
                }
                else {
                    if(!doc) {
                        res.send( "{error: \"Nothing found for ID: " + id + "\"}");
                    }
                    else {
                        res.send(doc);
                    }
                    
                }
            }
            else {
                if(format === 'xml') {
                    res.contentType('text/xml');
                    res.send( "<error>" + err.message + "</error>");
                }
                else {
                    res.send( { error: err.message } );
                }
            }
        });
    });
}

var findById = function(req, res) {
    //make service available to all IP addresses
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (findConn === undefined && !connectingFind) {
        connectingFind = true;
        //console.log("creating mongodb connection.");
        MongoClient.connect(DB_URL, function(err, db) {
            if(err) { return findByIdCb(err)};
            findConn = db;
            findByIdCb(null, db, req, res);
        });  
    } else {
        setTimeout(
            function() {
                findByIdCb(null, findConn, req, res);
            }, 
            1*1000
        ); 
    }
}

/*****************  export functions  ******************/
exports.find = find;
exports.count = count;
exports.findById = findById;

