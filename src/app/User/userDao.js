// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 유저 status 조회
async function selectUserIdx(connection, userIdx){
  const selectUserIdxQuery = `
    SELECT userIdx, status
    FROM User
    WHERE userIdx = ?
  `;
  const selectUserIdxRow = await connection.query(selectUserIdxQuery, userIdx);
  return selectUserIdxRow;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email
                FROM User 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userInfo 회원 조회 -> email, nickname, name을 가져옴.
async function selectUserInfo(connection, userIdx) {
  const selectUserInfoQuery = `
                 SELECT email, nickname, name
                 FROM User 
                 WHERE userIdx = ?;
                 `;
                 // query문에 값을 변숫값을 넣어줘야 할때는 query와 같이 값을 보내주고, query문에는 ? 으로 표시.
                 // db에 보내줄 변수값이 여러개일때는 배열로 보내줌.
  const [userInfoRow] = await connection.query(selectUserInfoQuery, userIdx);
  // 이런 부가적인 정보가 나오므로 변수에 대괄호를 쳐서 결괏값만을 할당해주는 것.(첫 번째 값만 사용)
  // 추가로 userRow에는 결괏값이 배열로 저장됨.
  return userInfoRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(email, password, nickname)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, email) {
  const selectUserPasswordQuery = `
        SELECT userIdx, pwd
        FROM User 
        WHERE email = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      email
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userIdx
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

// 유저 정보 업데이트..?
async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE User 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

// 유저 삭제
async function updateUserStatus(connection, idx){
  // const 
  const updateUserStatusQuery = `
  UPDATE User
  SET Status = ?
  WHERE userIdx = ? AND status = 'ACTIVE'
  `
  const updateUserStatusRow = await connection.query(updateUserStatusQuery, ['DELETED', idx]);
  return updateUserStatusRow[0];
}

module.exports = {
  selectUser,
  selectUserIdx,
  selectUserEmail,
  selectUserInfo,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  updateUserStatus,
};