const jwtMiddleware = require("../../../config/jwtMiddleware");
const roomProvider = require("../../app/Room/roomProvider");
const roomService = require("../../app/Room/roomService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 001
 * API Name : 방의 필수정보를 받아오는 API
 * [GET] /room/:roomIdx
 */
exports.getRoom = async function (req, res) {
    /**
    * Query String: roomIdx
    */
   const roomIdx = req.params.roomIdx;

   if (!roomIdx) {
        return res.send(response(baseResponse.ROOM_ROOMIDX_EMPTY));
   }
   if (roomIdx <= 0) {
        return res.send(response(baseResponse.ROOM_ROOMIDX_LENGTH));
   }

   const roomIdxResult = await roomProvider.retrieveRoomList(roomIdx);
   return res.send(response(baseResponse.SUCCESS, roomIdxResult));
}

/**
 * API NO. 002
 * API Name : 방의 시설정보를 받아오는 API
 * [GET] /room/detail/:roomIdx
 */
exports.getRoomDetail = async function (req, res) {
    /**
    * Query String: roomIdx
    */
     const roomIdx = req.params.roomIdx;

     if (!roomIdx) {
          return res.send(response(baseResponse.ROOM_ROOMIDX_EMPTY));
     }
     if (roomIdx <= 0) {
          return res.send(response(baseResponse.ROOM_ROOMIDX_LENGTH));
     }
  
     const roomIdxResult = await roomProvider.retrieveRoomDetailList(roomIdx);
     return res.send(response(baseResponse.SUCCESS, roomIdxResult));
}

/**
 * API NO. 003
 * API Name : 방의 시설정보를 수정하는 API
 * [PATCH] /room/detail/patch/:roomIdx
 */
exports.patchRoomDetail = async function (req, res) {
     /**
    * BODY
    * { wifi: 1,
    *   pool: 1,
    *   bath: 1,
    *   tv: 1,
    *   kitchen: 1,
    * }
    */
   const roomIdx = req.params.roomIdx;
   const {wifi, pool, bath, tv, kitchen} = req.body;
   if(wifi > 1) {
     return res.send(response(baseResponse.INCORRECT_FACILITY_STATUS));
   }
   if(pool > 1) {
     return res.send(response(baseResponse.INCORRECT_FACILITY_STATUS));
   }
   if(bath > 1) {
     return res.send(response(baseResponse.INCORRECT_FACILITY_STATUS));
   }
   if(tv > 1) {
     return res.send(response(baseResponse.INCORRECT_FACILITY_STATUS));
   }
   if(kitchen > 1) {
     return res.send(response(baseResponse.INCORRECT_FACILITY_STATUS));
   }

     if (!roomIdx) {
     return res.send(response(baseResponse.ROOM_ROOMIDX_EMPTY));
     }
     if (roomIdx <= 0) {
          return res.send(response(baseResponse.ROOM_ROOMIDX_LENGTH));
     }

     const editRoomDetailResponse = await roomService.editRoomDetail(roomIdx, wifi, pool, bath, tv, kitchen);
     return res.send(editRoomDetailResponse);
}