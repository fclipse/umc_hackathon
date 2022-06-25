module.exports = function(app){
    const auth = require('./authController');
    
    // 3.1 일반 로그인 API
    app.post('/auth/login', auth.login);
};