const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const {response} = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");
const mainDao = require("./mainDao");


/**
 * API No. 1.1
 * API Name: 메인 화면 피드 출력 API
 * [GET] /main/:roomIdx
 * 가져올 것들 : 방 주소, 방 거리, 예약 예정 날짜, 끝나는 날짜, 하루당 가격, 별점, 좋아요 여부
 */
exports.printFeed = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const printFeedResult = await mainDao.selectFeed(connection, roomIdx);
    // 결과 없을때
    if (!printFeedResult){
      connection.release();
      return printFeedResult[0];
    }
    // db 접속 해제
    connection.release();
    return printFeedResult[0];
};


/**
 * API No. 1.2
 * API Name: 유저 피드 사진 조회 API
 * [GET] /main/images/:roomIdx
 */
 exports.printRoomImage = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    // 의미적 validation
    
    // status != 'ACTIVE'일때
    const roomStatus = await mainDao.selectRoom(connection, roomIdx);
    if(roomStatus[0].roomStatus == 'INACTIVE'){
        return errResponse(baseResponseStatus.ROOM_INACTIVE_ROOM);
    }
    if(roomStatus[0].roomStatus == 'DELETED'){
        return errResponse(baseResponseStatus.ROOM_DELETED_ROOM);
    }
    
    const printRoomImageResult = await mainDao.selectRoomImage(connection, roomIdx);
    // 결과 없을때
    if (!printRoomImageResult){
      connection.release();
      return errResponse(baseResponseStatus.ROOM_ROOMIMGURLS_EMPTY);
    }

    // db 접속 해제
    connection.release();
    return response(baseResponseStatus.SUCCESS, printRoomImageResult[0]);
};