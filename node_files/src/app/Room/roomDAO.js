// 방의 필수정보를 조회합니다
async function selectRoom(connection, roomIdx) {
    const selectRoomListQuery = `
    SELECT roomIdx, roomName, roomLocation, content, maxGuestNum, Room.hostIdx, hostName
    FROM Room
        LEFT JOIN (
            SELECT hostIdx, Host.hostStatus, hostName
            FROM Host
            WHERE Host.hostStatus = 'ACTIVE'
            group by hostIdx) h on h.hostIdx = Room.roomIdx
    WHERE Room.roomIdx = ?;
                  `;
    const [roomRows] = await connection.query(selectRoomListQuery, roomIdx);
    return roomRows;
  }

async function selectRoomDetail(connection, roomIdx) {
    const selectRoomDetailListQuery = `

                  `;
    const [roomRows] = await connection.query(selectRoomDetailListQuery, roomIdx);
    return roomRows;
  }

module.exports = {
    selectRoom,
    selectRoomDetail,

}