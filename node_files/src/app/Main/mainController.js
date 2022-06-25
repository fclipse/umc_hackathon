const jwtMiddleware = require("../../../config/jwtMiddleware");
const mainProvider = require("../../app/Main/mainProvider");
const mainService = require("../../app/Main/mainService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1.0
 * API Name: Test API
 * [GET] /main/test
 */
exports.mainTest = async function(req, res){
    return res.send(baseResponse.SUCCESS);
}

/**
 * API No. 1.1
 * API Name: 메인 화면 피드 출력 API
 * [GET] /main/:postIdx
 */
exports.getFeed = async function(req, res){
    const roomIdx = req.params.roomIdx;
    // validation
    if(!roomIdx){
        return res.send(errResponse(baseResponse.))
    }
}