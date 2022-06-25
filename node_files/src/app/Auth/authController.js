const authProvider = require("./authProvider");
const authService = require("./authService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const regexEmail = require("regex-email");
const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

/**
 * API 3.1
 * API Name: 로그인 API
 * [POST] /auth/login
 */
exports.login = async function(req, res){
    // body - email, pwd
    const {email, pwd} = req.body;

    // email validation
    if(!email){
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
    } else if(email.length > 255){
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
    }else if(!regexEmail){
        return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
    }

    // pwd validation, 비밀번호 표현 -> 정규표현식 사용
    if(!pwd){
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
    }else if(pwd.length < 8){
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
    }else if(!regexPwd){
        return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
    }

    const signInResponse = await authService.postSignIn(email, pwd);
    return res.send(signInResponse);
}