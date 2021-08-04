const express = require('express')
const app = express()
const methodOverride = require('method-override')
const MongoClient = require('mongodb').MongoClient
const router = require('express').Router();
let page= require('./router.js');
let Mongo = require('./Mongodb.js');

app.use(page);

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
// app.use('/public', express.static('public'))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// var db;
// var dbconut;
// var dbPost;
// var dblist;

// MongoClient.connect(uri, function (err, client) {
//     // db = client.db('todoapp');
//     // dbconut = db.collection('counter');
//     // dbPost = db.collection('post');
//     // dblist = db.collection('list');

//     //요기서 디비 커넥션만 확인
//     if (err) return console.log(err);
// });



//서버 리슨 함수
app.listen(port, function () {
    console.log('listedning on ' + port);
});
