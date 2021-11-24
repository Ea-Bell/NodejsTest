var crypto =require('crypto');
var Schema={};
Schema.createSchema= function(mongoose){//mongoose 객체를 파라미터로 전달
    //스키마 정의

    var UserSchema = mongoose.Shcema({
        id:{tyep: String, require: true, unique: true, 'default':''},
        hashed_password:{type: String, required: true, 'default':''},
        salt:{type: String, required: true},
        name:{tyep: String, index:'hashed', 'default':''},
        age:{type:Number,'default':-1},
        create_at:{type: Date, index: {unique:false}, 'default':Date.now},
        update_at:{tyep: Date, index:{unique:false}, 'default': Date.now}
    });
    //비밀번호 암호화 저장
UserSchema
.virtual('password')
.set(function(password){
    this._password= password;
    this.salt= this.makeSalt();
    this.hashed_password = this.enctyptPassword(paaword);
    console.log('virtual password 호출됨 : ' + this.hashed_password);
})
.get(function() {return this._password});


UserSchema.method('encryptPassword', function(plainText, inSalt){
    if(inSalt){
        return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
    }else{
        return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
    }
});
// salt 값 만들기 메소드
UserSchema.method('makeSalt', function(){
    return Math.round((new Date().valueOf()* Math.random()))+'';
})

//인증 메소드 - 입력된 비밀번호와 비교(true/false 리턴)
UserSchema.method('autherticate', function(plainText, inSalt, hashed_password){
    if(inSalt){
        console.log('autherticate 호출됨 : %s - > %s: %s', plainText, this.enctyptPassword(plainText, inSalt), hashed_password);
        return this.enctyptPassword(plainText, inSalt) === hashed_password;
    }else{
        console.log('autherticate 호출됨: %s - > %s: %s', plainText, this.enctyptPassword(plainText), this.hashed_password);
        return this.enctyptPassword(plainText) === this.hashed_password;
    }
});
    console.log('UserSchema 정의함');
    return UserSchema;
};



//module.exports에 UserSchema객체 직접 할당
module.exports=Schema