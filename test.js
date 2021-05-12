//라우터객체참조
var express = require('express')
    , http = require('http')
    , path = require('path');
var router = express.Router();
//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , static = require('serve-static');

//익스프레스 객체 생성
var app = express();
//테스트
//기본 속성 설정
app.set('port', process.env.PORT || 8080);
//body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(express.urlencoded({ extended: false }));
// body-parser를 이용해 application/json 파싱
app.use(express.josn())
app.use(static(path.join(__dirname, 'public')));

//Express 서버 시작
http.createServer(app).listen(app.get('port', function () {
    console.log('Express server listening on port ' + app.get())
}))
router.route('/process/login/:name').post(function (req, res) {
    console.log('/process/login/:name처리함.');
    var paramName = req.params.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<h1>Express서버에서응답한결과입니다.</h1>');
    res.write('<div><p>Paramname:' + paramName + '</p></div>');
    res.write('<div><p>Paramid:' + paramId + '</p></div>');
    res.write('<div><p>Parampassword:' + paramPassword + '</p></div>');
    res.write("<br><br><ahref='/public/login2.html'>로그인페이지로돌아가기</a>");
    res.end();
});

router.route('/process/users/:id').get(function (req, res) {
    console.log('/process/users/:id처리함.');
    //URL파라미터확인
    varparamId = req.params.id;
    console.log('/process/users와토큰%s를이용해처리함.', paramId);
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h1>Express서버에서응답한결과입니다.</h1>');
    res.write('<div><p>Paramid:' + paramId + '</p></div>');
    res.end();
});

varcookieParser = require('cookie-parser');
//cookie-parser설정
app.use(cookieParser());
router.route('/process/showCookie').get(function (req, res) {
    console.log('/process/showCookie호출됨.');
    res.send(req.cookies);
});
router.route('/process/setUserCookie').get(function (req, res) {
    console.log('/process/setUserCookie호출됨.');
    //쿠키설정
    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    });
    //redirect로응답
    res.redirect('/process/showCookie');
});


//라우터객체를app객체에등록
app.use('/', router);
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);



//순서와위치를잘확인해서작성할것
// app.all('*',function(req,res){
//     res.status(404).send('<h1>ERROR-페이지를찾을수없습니다.</h1>');
//     });
