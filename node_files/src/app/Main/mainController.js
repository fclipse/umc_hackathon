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
 * [GET] /main/:roomIdx
 * 가져올 것들 : 방 주소, 방 거리, 예약 예정 날짜, 끝나는 날짜, 하루당 가격, 별점, 좋아요 여부
 */
exports.getFeed = async function(req, res){
    const roomIdx = req.params.roomIdx;
    // validation
    if(!roomIdx){
        return res.send(errResponse(baseResponse.ROOM_ROOMIDX_EMPTY));
    }
    if(roomIdx <= 0){
        return res.send(errResponse(baseResponse.ROOM_ROOMIDX_LENGTH));
    }

    // 결과 반환
    const printFeedResponse = await mainProvider.printFeed(roomIdx);
    return res.send(response(baseResponse.SUCCESS, printFeedResponse));
}


/**
 * API No. 1.2
 * API Name: 유저 피드 사진 조회 API
 * [GET] /main/images/:roomIdx
 */
exports.getRoomImage = async function(req, res){
    const roomIdx = req.params.roomIdx;

    // validation
    if(!roomIdx){
        return res.send(errResponse(baseResponse.ROOM_ROOMIDX_EMPTY));
    }
    if(roomIdx <= 0){
        return res.send(errResponse(baseResponse.ROOM_ROOMIDX_LENGTH));
    }

    const printRoomImageResponse = await mainProvider.printRoomImage(roomIdx);
    return res.send(printRoomImageResponse);
}

/**
 * API No. 1.3
 * API Name: 방 추가 API
 * [Post] /main/room
 */
exports.postRoom = async function(req, res){
    const {roomName, hostIdx, roomLocation, roomDistance, content, cost, roomDate, roomEndDate, maxGuestNum } = req.body;
    const createRoomParams = [roomName, hostIdx, roomLocation, roomDistance, content, cost, roomDate, roomEndDate, maxGuestNum];
    // validation
    if(!hostIdx){
        return res.send(errResponse(baseResponse.HOST_HOSTIDX_EMPTY));
    }
    if(hostIdx <= 0){
        return res.send(errResponse(baseResponse.HOST_HOSTIDX_LENGTH));
    }
    const createRoomResponse = await mainService.createRoom(createRoomParams);
    return res.send(createRoomResponse);
}