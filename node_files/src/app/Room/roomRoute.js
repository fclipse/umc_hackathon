module.exports = function(app){
    const room = require('./roomController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 필수정보 가져오기 API
    app.get('/room/:roomIdx', room.getRoom);

    // 2. 시설정보 가져오기 API
    app.get('/room/detail/:roomIdx', room.getRoomDetail);

    // 3. API
};
