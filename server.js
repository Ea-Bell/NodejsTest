const express = require('express')
const app = express()
const methodOverride = require('method-override')
const MongoClient = require('mongodb').MongoClient
const router = require('express').Router();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port = 8080;
const uri = 'mongodb+srv://EaBell:7hSV2A1o9LI1YizP@cluster0.plbij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
           

//깃 테스트
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
app.get('/test', function (req, res) {
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
    console.dir(req);
    let noticeBoard;  //글번호 npm
    //디비에 게시물 갯수 insert함수


    dbconut.findOne({ name: '게시물갯수' }, function (err, result) {
        if (err) return console.log(err);

        console.dir("게시물 갯수 result:" + result);
        noticeBoard = result.totalPost;
        res.send("전송완료");


        //익스프레스 객체 생성

        console.log("query: " + req.query.name + "," + req.query.name);
        console.log("body: " + req.body.score + "," + req.body.score);

        var name = req.body.name || req.query.name;
        var score = req.body.score || req.query.score;

        //디비 insert 함수
        dbPost.insertOne({ _id: noticeBoard + 1, name: name, score: parseInt(score) }, function (err, result) {
            //console.dir("result:" + result);

            dbconut.updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
                if (err) {
                    return console.log(err);
                }

            });

            console.log('insert 완료!');
            dbconut.updateOne
        });
    });
});


//변수 total=전체 페이지 개수, currentPage= 사용자 요청한 페이지 번호, content= 화면에 출려할 게시글 목록, size=한페이지에 보여줄 게시글 갯수
ArticlePage = function(totoal, currentPage, size, content){
if(total ==0){
	totalPage = 0;
	startPage= 0;
	endPage= 0;
}	else{
	totalPage= total/size;
	if(totla %size > 0){
		totalPage++;
	}
}
}

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
