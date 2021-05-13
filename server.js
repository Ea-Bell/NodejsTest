const express = require('express')
const app = express()
const methodOverride = require('method-override')
const MongoClient = require('mongodb').MongoClient
const router = require('express').Router();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use(methodOverride('_method'))

const port = 8080;
const uri = 'mongodb+srv://EaBell:ggKy7EjgOjrGaN5S@cluster0.plbij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//깃 테스트ddddddd
var db;
var dbconut;
var dbPost;

MongoClient.connect(uri, function (err, client) {
    db = client.db('todoapp');
    dbconut = db.collection('counter');
    dbPost = db.collection('post');

    //요기서 디비 커넥션만 확인
    if (err) return console.log(err);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//페이지 보여줌
app.get('/list', function (req, res) {
    dbPost.find().toArray(function (err, result) {
        // console.log(listPage 요청);
        res.render('list.ejs', { posts: result })
    });
});
app.get('/test', function(req, res){
    res.render('test.ejs');
})

app.get('/detail/:id', function (req, res) {
    dbPost.findOne({ _id: parseInt(req.params.id) }, function (err, result) {
        console.log(err);
        console.log(result);
        res.render('detail.ejs', { data: result })
    })
});

app.get('/edit/:id', function (req, res) {
    dbPost.findOne({ _id: parseInt(req.params.id) }, function (err, result) {
        res.render('edit.ejs', { post: result })
    });
});

app.get('/write', function (req, res) {
    res.render('write.ejs')
});

app.post('/add', function (req, res) {
    let noticeBoard;  //글번호 npm
    //디비에 게시물 갯수 insert함수
    dbconut.findOne({ name: '게시물갯수' }, function (err, result) {
        noticeBoard = result.totalpost;
        console.log(result.totalpost);
        res.send("전송완료");
    });

	
	console.log("query"+req.query.title +","+req.query.date);
	console.log("body"+req.body.title +","+req.body.date);
    //디비 insert 함수
    dbPost.insertOne({ _id: noticeBoard + 1, 할일: req.body.title||req.query.title, 날짜: req.body.date||req.query.date }, function (err, result) {
        dbconut.updateOne({ name: '게시물갯수' }, { $inc: { totalpost: 1 } }, function (err, result) {
            if (err) {
                return console.log(err);
            }
        });
        console.log('저장완료!');
        dbconut.updateOne
    });
});


//삭제요청
app.delete('/delete', function (req, res) {
    req.body._id = parseInt(req.body._id);
    dbPost.deleteOne(req.body, function (err, result) {
        res.status(200).send({ message: '성공했습니다.' });
    })
});

//서버 리슨 함수
app.listen(port, function () {
    console.log('listedning on ' + port);
});