const jwtMiddleware = require("../../../config/jwtMiddleware");
const hostProvider = require("../../app/Host/hostProvider");
const hostService = require("../../app/Host/hostService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API NO. 001
 * API NAME : 호스트의 세부정보를 받아오는 API
 * [GET] /host/detail/:hostIdx
 */
 exports.getHostById = async function (req, res) {
    /**
     * Query String: hostIdx
     */
    const hostIdx = req.params.hostIdx;

    if(!hostIdx) {
         return res.send(response(baseResponse.HOST_HOSTIDX_EMPTY));
    }
    
    if(hostIdx <= 0) {
         return res.send(response(baseResponse.HOST_HOSTIDX_LENGTH));
    }

    const hostIdxResult = await hostProvider.retrieveHostById(hostIdx);
    return res.send(response(baseResponse.SUCCESS, hostIdxResult));
}