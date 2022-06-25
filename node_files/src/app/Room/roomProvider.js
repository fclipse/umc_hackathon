const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const roomDao = require("./roomDao");

// Provider

exports.retrieveRoomList = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomIdxResult = await roomDao.selectRoom(connection, roomIdx);
    
    connection.release();
    
    return roomIdxResult;
}

exports.retrieveRoomDetailList = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomIdxResult = await roomDao.selectRoomDetail(connection, roomIdx);
    
    connection.release();
    
    return roomIdxResult;
}