
const port = 8080;
const uri = 'mongodb+srv://EaBell:7hSV2A1o9LI1YizP@cluster0.plbij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var db;
var dbconut;
var dbPost;
var dblist;

MongoClient.connect(uri, function (err, client) {
    // db = client.db('todoapp');
    // dbconut = db.collection('counter');
    // dbPost = db.collection('post');
    // dblist = db.collection('list');

    //요기서 디비 커넥션만 확인
    if (err) return console.log(err);
});

module.exports.mogoDb