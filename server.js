const express = require('express')
const app = express()
const methodOverride = require('method-override')
const MongoClient = require('mongodb').MongoClient
const router = require('express').Router();

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
// app.use('/public', express.static('public'))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8080;
const uri = 'mongodb+srv://EaBell:7hSV2A1o9LI1YizP@cluster0.plbij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';



var db;
var dbconut;
var dbPost;
var dblist;

MongoClient.connect(uri, function (err, client) {
    db = client.db('todoapp');
    dbconut = db.collection('counter');
    dbPost = db.collection('post');
    dblist = db.collection('list');

    //요기서 디비 커넥션만 확인
    if (err) return console.log(err);
});

app.get('/', function (req, res) {
    res.render('write.ejs');
});

//페이지 보여줌
app.get('/list/:id', function (req, res) {
    dbPost.find().sort({ "score": -1 }).toArray(function (err, result) {
        // console.log(listPage 요청);

        res.render('list.ejs', { posts: result })
    });
});
app.get('/rank', function (req, res) {
    let topCount = 0;
    let Count = 3;
    dbPost.find().sort({ "score": -1 }).limit(10).toArray(function (err, result) {
        // console.log(listPage 요청);



        res.render('list3.ejs', { posts: result, topCount: topCount, Count: Count })
    });
});
//페이지 보여줌
// app.get('/list2/:id', function (req, res) {
//     let a = "test"
//     //컨텐츠 보여줄때
//     //페이지네이션은 조건이 3가지이다 
//     //1번째 1보다 작은경우 d<1 


//     //2번째 사잇값  1<d<max
//     //3번째 max값 
//     dbPost.find().toArray(function (err, result) {
//         // console.log(listPage 요청);
//         //페이지 컨텐츠 변수들
//         let currentPage = parseInt(req.params.id); //현재 위치	
//         let contentSize = result[currentPage];
//         let maxSize = result.length;  // maxSize
//         let maxContent = currentPage + 4; //보여주는 컨텐츠

//         // 페이지 블록 할당
//         let totlaPage = Math.ceil(maxSize / maxContent);
//         let startPage = ((currentPage - 1) / 10) * 10 + 1;
//         let endPage = startPage + maxContent - 1;


//         console.dir("result[0] " + result[5].name)
//         if (endPage > startPage) {
//             endPage = totlaPage
//         }

//         if (currentPage < 1) {
//             res.redirect('/list2/1');
//         }
//         else if (1 <= currentPage && currentPage <= maxSize)  //현재 블록과 마지막 블록 전까지만 하면됨.
//         {
//             res.render('list2.ejs', { posts: result, test: a, contentSize: contentSize, currentPage: currentPage, maxContent: maxContent, maxSize: maxSize, startPage: startPage, totlaPage: totlaPage })
//         } else if (currentPage > maxSize) {
//             console.log("maxSize찍음")
//             res.redirect('/list2/' + maxSize);
//         } else {
//             console.dir("현재 컨텐츠의 max: " + result.length);
//         }

//         // res.render('list2.ejs', { posts: result, test:a })
//     });
// });



app.post('/test1', function (req, res) {
    let noticeBoard;  //글번호 npm
    //디비에 게시물 갯수 insert함수


    function sleep(delay) {
        let start = new Date().getTime();


        while (new Date().getTime() < start + delay);
    }


    dbPost.find({}, function (err, result) {
        console.dir("find: ", result)
    });

    dbconut.findOne({ name: '게시물갯수' }, function (err, result) {
        let num;

        if (err) return console.log(err);


        //데이터 추가 입력필요할때 주석 없애고 쓰세용
        // for (num = 0; num < 3; num++) {
        noticeBoard = result.totalPost;
        let name = req.body.name || req.query.name;
        let score = parseInt(req.body.score) || parseInt(req.query.score);
        let date = new Date().toLocaleString();

        //디비 insert 함수

        dbPost.save({ _id: noticeBoard + 1, name: name, score: score, time: date, upsert: "true" }, function (err, result) {
            //console.dir("result:" + result);

            dbconut.updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
                if (err) {
                    return console.log(err);
                }
            });
            dbconut.updateOne
        });
        // }  
    });
    // sleep(1000);


    res.redirect('/cost');
});

var idCheck = function (name) {

}


app.get('/cost', function (req, res) {
    res.render('test.ejs');
})

app.get('/detail/:id', function (req, res) {
    dbPost.findOne({ _id: parseInt(req.params.id) }, function (err, result) {
        console.log(err);
        console.log(result);
        res.render('detail.ejs', { data: result });
    });
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
        if (err) return console.log(err);

        noticeBoard = result.totalPost;


        //익스프레스 객체 생성


        let name = req.body.name || req.query.name;
        let score = parseInt(req.body.score) || parseInt(req.query.score);
        console.log("query: " + req.query.name + "," + req.query.name);
        console.log("body: " + req.body.score + "," + req.body.score);
        let score2
        let random = Math.random();
        score2= Math.floor(random*10);
        console.log(score2)
        let time = new Date().toLocaleString();
        //디비 insert 함수
        dbPost.insertOne({ _id: noticeBoard + 1, name: name, score: score2, time: time }, function (err, result) {
            //console.dir("result:" + result);

            dbconut.updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
                if (err) {
                    return console.log(err);
                }
            });
            dbconut.updateOne
        });
    });
    res.redirect('/rank')
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
