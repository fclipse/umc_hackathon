const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const postDao = require("./postDao");

// 통일성 위해 userIdx로 고쳐줌
exports.getPostLike = async function (userIdx, postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getPostLikeResult = await postDao.getPostUserLike(connection, userIdx, postIdx);
    
    if (!getPostLikeResult){
      connection.release();
      return getPostLikeResult[0];
    }
    // db 접속 해제
    connection.release();
    return getPostLikeResult[0];
};


// 게시물 상태 확인
exports.checkPostStatus = async function (postIdx){
  const connection = await pool.getConnection(async (conn) => conn);
  const checkPostStatusResult = await postDao.postStatus(connection, postIdx);
  
  connection.release();
  return checkPostStatusResult;  // 이거 왜 안먹음? -> dao에서 설정 잘해주기. 함수 헷갈림.
}