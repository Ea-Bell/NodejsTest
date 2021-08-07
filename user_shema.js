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

    console.log('UserSchema 정의함');
    return UserSchema;

};

//module.exports에 UserSchema객체 직접 할당
module.exports=Schema