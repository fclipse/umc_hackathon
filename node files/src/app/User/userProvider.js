const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
// TODO : 만약 table 없을 경우에도 errResponse return 부분 추가. 혹은 table 수정.                                     

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

// 통일성 위해 userIdx로 고쳐줌
exports.retrieveUserInfo = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userInfoResult = await userDao.selectUserInfo(connection, userIdx);
  // FIXME userResult 없을시 의미적 validation처리 해줘야..?
  // if (!userResult){

  //   return userResult[0];
  // }
  // db에 접속했을 때는 항상 연결을 해제해줘야함.
  connection.release();
// dao에서 seleftUserID 함수에서 userRow결괏값이 배열로 나오기 때문.
// 그런데 우리는 조회만 하므로 배열값이 필요x -> 첫 번째 값만 반환.
  return userInfoResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      email
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};