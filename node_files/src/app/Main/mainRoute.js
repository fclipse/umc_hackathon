module.exports = function(app){
    const main = require('./mainController');

    // 1.0 테스트 API
    app.get('/main/test', main.mainTest);

    // 1.1 메인 화면 피드 출력 API
    app.get('/main/:roomIdx', main.getFeed);    
    
    // 1.2 피드 사진 조회 API
    app.get('/main/images/:roomIdx', main.getRoomImage);

    // 1.3 방 추가 API
    app.post('main/room', main.postRoom);

    // 1.4 방 설명 변경 API
    app.patch('/main/patch/:roomIdx', main.patchRoomContent);
};