var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
	console.log('server start....port=' + port);
});

//db 생성
mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");

});


var sosongbot = require('./models/sosongbot');

//데이터 등록
var data = [{
				"menu_nm": "HOME",
				"content": "안녕하세요.\n소송지원봇입니다.\n무엇을 도와드릴까요?\n아래의 메뉴에서 선택하시기 바랍니다.",
				"button": "사이버 소송 도우미, 지능형UHD"
				}, 
				{
				"menu_nm": "사이버 소송 도우미",
				"content": "사이버 소송도우미 입니다.\n원하시는 메뉴를 선택하시기 바랍니다.",
				"button": "소송 준비안내, 소송 절차안내, 소장 작성하기"
				}];

console.log('DB 생성')

for ( var i = 0 ; i < data.length; i++ ) {
		
	var sosongbotdata = new sosongbot({menu_nm:data[i].menu_nm, content:data[i].content, button:data[i].button});
		
    sosongbotdata.save(function(err){
    	if(err){
        	console.error(err);
            return;
        } else {
        	console.log('data insert success');
    	}
    });	
}


var router = require('./routes')(app, sosongbot);
