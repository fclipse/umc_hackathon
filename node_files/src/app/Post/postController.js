const jwtMiddleware = require("../../../config/jwtMiddleware");
const postProvider = require("../../app/Post/postProvider");
const postService = require("../../app/Post/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// Post 부분 API
/**
 * API NO 2.0
 * posts test
 * [GET] /posts/test
 */
 exports.postsTest = async function(req, res){
    return res.send(baseResponse.SUCCESS);
}


/**
 * API No. 2
 * API Name : 게시물 좋아요 확인 API
 * [GET] /posts/like/:userIdx/:postIdx
 */
exports.getLike = async function (req, res) {

    // const {userIdx, postIdx} = req.params;
    const {postIdx, userIdx} = req.params;
    // 의미적 validation
    if(!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    if(!postIdx) return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));

    if(userIdx <= 0) return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    if(postIdx <= 0) return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));

    const getLikeResponse = await postProvider.getPostLike(userIdx, postIdx);
    return res.send(response(baseResponse.SUCCESS, getLikeResponse));
    // return res.send(baseResponse.SUCCESS);
};

/**
 * API NO. 2.2
 * API Name : 게시물 생성 API
 * [Post] /posts
 */
 exports.postPosts = async function (req, res){
    const {userIdx, content, postImgUrls} = req.body;

    if(!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    else if(postImgUrls.length <= 0) return res.send(errResponse(baseResponse.POST_POSTIMGURLS_EMPTY));

    if(userIdx <= 0) return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    else if(content.length > 450) return res.send(errResponse(baseResponse.POST_CONTENT_LENGTH));

    const createPostResponse = await postService.createPost(
        userIdx,
        content,
        postImgUrls
    );

    return res.send(createPostResponse);
}

/** API NO. 2.3
 * API NAME: 게시물 수정 API
 * [PATCH] /posts/:postIdx
 */
exports.patchPosts = async function(req, res){
    const postIdx = req.params.postIdx;
    const {content} = req.body;
    if(!postIdx) return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
    else if(!content) return res.send(errResponse(baseResponse.POST_CONTENT_EMPTY))
    
    if(postIdx <= 0) return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
    else if(content.length >= 450) return res.send(errResponse(baseResponse.POST_CONTENT_LENGTH));

    const editPostResponse = await postService.editPost(postIdx, content);
    return res.send(editPostResponse);
}

/**
 * API NO.2.4 
 * API NAME: 게시물 삭제 API
 * [PATCH] /posts/:postIdx/status
 */
exports.patchPostStatus = async function(req, res){
    const postIdx = req.params.postIdx;
    // validation
    if(!postIdx) return res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
    else if(postIdx <= 0) return res.send(errResponse(baseResponse.POST_POSTIDX_LENGTH));
    
    const editPostStatusResponse = await postService.editPostStatus(postIdx);
    return res.send(editPostStatusResponse);
}

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
 exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};