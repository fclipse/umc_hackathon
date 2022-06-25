module.exports = function(app){
    const main = require('./mainController');

    // 1.0 테스트 API
    app.get('/main/test', main.mainTest);

    // 1.1 메인 화면 피드 출력 API
    app.get('/main/:roomIdx', main.getFeed);    

    // 2.2 게시물 생성 API
    

    // 2.3 게시물 수정 API
    

    // 2.4 게시물 삭제 API
    
};