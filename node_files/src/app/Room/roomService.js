const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const roomProvider = require("./roomProvider");
const roomDao = require("./roomDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.editRoomDetail = async function(roomIdx, wifi, poo, bath, tv, kitchen){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const editRoomDetailParams = [ wifi, poo, bath, tv, kitchen, roomIdx];
        const editRoomDetailResult = await roomDao.updateRoomDetail(connection, editRoomDetailParams);
        return response(baseResponse.SUCCESS_UPDATE_FACILITY);
    }catch(err){
        logger.error(`APP - editRoomDetail Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}