var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser"); 
var mongoose = require('mongoose');    //引用mongoose模块

var mongodb = 'mongodb://localhost/root/data/db'
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/english', { useNewUrlParser: true }, function (err) {

  　　if (err) {

    　　　　console.log('Connection Error:' + err)

  　　} else {

    　　　　console.log('Connection success!')

  　　}

});
// var ObjectId = mongoose.Schema.Types.ObjectId;
var dbHelper = require('./db/dbHelper.js');

var BookModel = mongoose.model('book', dbHelper.getModel('book'));
var ChapterModel = mongoose.model('chapter', dbHelper.getModel('chapter'));
var SentenceModel = mongoose.model('sentence', dbHelper.getModel('sentence'));
// var TeamModel = mongoose.model('team', dbHelper.getModel('team'));
// var RecordTypeModel = mongoose.model('recordType', dbHelper.getModel('recordType'));
// var RecordModel = mongoose.model('record', dbHelper.getModel('record'));
// var RecordTeamModel = mongoose.model('recordTeam', dbHelper.getModel('recordTeam'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(express.static(path.join(__dirname, 'build')));

require('./root')(app, __dirname);
require('./book')(app, BookModel);
require('./chapter')(app, ChapterModel);
require('./sentence')(app, SentenceModel);
// require('./team/team')(app,TeamModel);
// require('./Record/record')(app,RecordModel);
// require('./Record/recordType')(app,RecordTypeModel);
// require('./Record/teamRecord')(app,RecordTeamModel,TeamModel);
// require('./Record/uploadRecords')(app, StudentModel, RecordModel);
var server = app.listen(3001, function () {
  console.log('Listening at http://');
});
