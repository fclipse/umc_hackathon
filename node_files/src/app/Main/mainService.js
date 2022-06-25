const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mainProvider = require("./mainProvider");
const mainDao = require("./mainDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


/**
 * API No. 1.3
 * API Name: 방 추가 API
 * [Post] /main/room
 */
exports.createRoom = async function (createRoomParams) {
    const hostIdx = createRoomParams[1];
    // console.log(createRoomParams);
    // console.log(createRoomParams.hostIdx, hostIdx);
    // 이거 여기에 정의 안해주면 finally구문에서 오류남.
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        // 호스트 계정이 존재하는지 확인
        const hostIdxRows = await mainProvider.hostIdxCheck(hostIdx);
        // console.log(hostIdxRows[0].hostIdx);
        // console.log(hostIdxRows[0].hostStatus);
        
        if (hostIdxRows.length < 1){
            return errResponse(baseResponse.HOST_HOSTACCOUNT_UNEXIST);
        }else if(hostIdxRows[0].hostStatus == 'INACTIVE'){
            return errResponse(baseResponse.HOST_HOSTSTATUS_INACTIVE);
        }else if(hostIdxRows[0].hostStatus == 'DELETED'){
            return errResponse(baseResponse.HOST_HOSTSTATUS_DELETED);
        }
        // params 넘겨주고 결과 받아옴.
        const roomIdx = await mainDao.insertRoom(connection, createRoomParams);
        // const roomIdx = insertRoomResult[0].roomIdx;
        // return response(baseResponse.SUCCESS, {'추가된 방/호스트 id' : {roomIdx, hostIdx}});
        return response(baseResponse.SUCCESS, {'Added roomIdx' : roomIdx});
    } catch (err) {
        logger.error(`App - createRoom Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
};
/**
 * API No. 1.4
 * API Name: 방 설명 수정 API
 * [Post] /main/patch/:roomIdx
 */
exports.editRoomContent = async function(roomIdx, content){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const roomStatus = await mainDao.selectRoom(connection, roomIdx);
        if(roomStatus.length < 1){
            return errResponse(baseResponse.ROOM_UNEXIST_ROOM);
        }else if(roomStatus[0].roomStatus == 'INACTIVE'){
            return errResponse(baseResponse.ROOM_INACTIVE_ROOM);
        }else if(roomStatus[0].roomStatus == 'DELETED'){
            return errResponse(baseResponse.ROOM_DELETED_ROOM);
        }
        const updateRoomContentResult = await mainDao.updateRoomContent(connection, roomIdx, content);
        return response(baseResponse.SUCCESS);
    }catch(err){
        logger.error(`App - editRoomContent Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}