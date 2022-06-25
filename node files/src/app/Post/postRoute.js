module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 2.0 테스트 API
    app.get('/posts/test', post.postsTest);

    // 2. 게시물 좋아요 조회 API
    app.get('/posts/like/:userIdx/:postIdx', post.getLike);

    // 2.2 게시물 생성 API
    app.post('/posts', post.postPosts);

    // 2.3 게시물 수정 API
    app.patch('/posts/:postIdx', post.patchPosts);

    // 2.4 게시물 삭제 API
    app.patch('/posts/:postIdx/status', post.patchPostStatus);
};