async function selectHostbyId(connection, hostIdx) {
    const selectHostbyIdQuery = `
    SELECT hostName, introduction, language, hostProfileImgUrl, createdAt, hostStatus
    FROM Host
    WHERE hostIdx = ?;
      `;
  
      const [hostRows] = await connection.query(selectHostbyIdQuery, hostIdx);
      return hostRows;
  }
  
  module.exports = {
      selectHostbyId,
  }