const {pool} = require("../../../config/database");
const authProvider = require("./authProvider");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const crypto = require('crypto');
// jwt
const jwt = require('jsonwebtoken');
const secret_config = require('../../../config/secret');

// 로그인 과정
exports.postSignIn = async function (email, pwd){
    try{
        const emailRows = await userProvider.emailCheck(email);

        if(emailRows.length < 1){
            return errResponse(baseResponse.SIGNIN_EMAIL_LENGTH);
        }
        
        // 비밀번호 암호화
        const hashedPassword = crypto
            .createHash("sha512")
            .update(pwd)
            .digest("hex");
        // password 확인
        const passwordRows = await userProvider.passwordCheck(email);
        if(passwordRows[0].pwd != hashedPassword){
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }
        // user status 확인
        const userAccountRows = await userProvider.accountCheck(email);
        if(userAccountRows[0].status == 'INACTIVE'){
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        }else if(userAccountRows[0].status == 'DELETED'){
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        // jwt 발급  
        let token = jwt.sign(
            // payload(내용)
            {
                userIdx: userAccountRows[0].userIdx,
            },
            // 비밀키
            secret_config.jwtsecret,
            // 유효기간 설정, 1년
            {
                expiresIn: "365d",
                subject: 'User',
            }
        )
        return response(baseResponse.SUCCESS, {'jwt':token});
    }catch(err){
        console.log(`APP - postSignIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}