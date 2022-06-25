module.exports = function(app){
    const host = require('./hostController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 필수정보 가져오기 API
    app.get('/host/detail/:hostIdx', host.getHostById);

};
