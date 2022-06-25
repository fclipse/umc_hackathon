module.exports = function(app){
    const main = require('./mainController');

    // 1.0 테스트 API
    app.get('/main/test', main.mainTest);

    // 2. 게시물 좋아요 조회 API
    

    // 2.2 게시물 생성 API
    

    // 2.3 게시물 수정 API
    

    // 2.4 게시물 삭제 API
    
};