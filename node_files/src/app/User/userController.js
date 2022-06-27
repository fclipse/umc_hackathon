const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
// postProvider로 가는 변수 설정.
// userController에서 postProvider로 갈 수 있도록 설정할 수도 있음.
const postProvider = require("../../app/Post/postProvider");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, nickname} = req.body;
    // 형식적 validation
    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    return res.send(signUpResponse);
};



/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/*
    API No. 1.3
    API Name: 유저 피드 조회 API
    이름, 닉네임, 프로필사진, 소개글, 웹사이트, 피드 게시물 사진, 게시물수, 팔로워수, 팔로잉수
    [GET] /users/:userIdx
*/
exports.getUserFeed = async function (req, res) {
    /*
        Path Variable: userIdx
    */
    const userIdx = req.params.userIdx;

    // validation
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    }
    if (userIdx <= 0) {
        //return res.send(response(baseResponse.SUCCESS_1, userIdxResult));
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    const userInfo = await userProvider.retrieveUserInfo(userIdx);
    return res.send(response(baseResponse.SUCCESS, userIdxResult));
}

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

/**
 * API No. 1.4
 * API Name : 유저 삭제 API
 * [PATCH] /users:userIdx/status
 * **/
exports.patchUserStatus = async function(req, res){
    const userIdx = req.params.userIdx;

    if(!userIdx) return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if(userIdx < 1) return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));

    const patchUserStatusResponse = await userService.patchUserStatus(userIdx);
    return res.send(patchUserStatusResponse);
}


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation
    // const userEmail = req.params.email;
    // const userPassword = req.params.password;

    if(!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    if(email.length > 30) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    if(!password) return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};


//--------------------------------------------------------------------------------------------------

exports.postUsers = async function(req, res){
    const {userNickname, email, pwd} = req.body;
    const signinUsersParams = [userNickname, email, pwd];
    // validation
    if(!userNickname){
        return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));
    }else if(userNickname.length > 45){
        return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_LENGTH));
    }
    
    if(!email){
        return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    }else if(email.length > 45){
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    }
    
    if(!pwd){
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    }else if(pwd.length > 45){
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
    }

    // return
    const signinUsersResponse = await userService.signinUsers(signinUsersParams);
    // console.log();
    return res.send(response(baseResponse.SUCCESS, signinUsersResponse));
}