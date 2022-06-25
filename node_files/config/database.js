const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'webdb1.c1x7tvsfk83m.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'Type1324gh*',
    database: 'rds_1'
});

module.exports = {
    pool: pool
};