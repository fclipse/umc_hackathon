const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const hostDao = require('./hostDao');

// Provider

exports.retrieveHostById = async function (hostIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const hostIdxResult = await hostDao.selectHostbyId(connection, hostIdx);
    
    connection.release();
    
    return hostIdxResult;
}