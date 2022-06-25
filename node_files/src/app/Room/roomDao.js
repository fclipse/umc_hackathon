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
    SELECT roomName, wifi, pool, bath, tv, kitchen
    FROM Facility
        LEFT JOIN (
            SELECT Room.roomIdx, roomName, roomStatus, Room.hostIdx
            FROM Room
            WHERE roomStatus = 'ACTIVE'
            group by roomIdx) ri on ri.roomIdx = Facility.roomIdx
    WHERE Facility.roomIdx = 1;
                  `;
    const [roomRows] = await connection.query(selectRoomDetailListQuery, roomIdx);
    return roomRows;
  }

async function updateRoomDetail(connection, editRoomDetailParams){
  const updateRoomDetailQuery = `
  UPDATE Facility
  SET wifi = ?, pool = ?, bath = ?, tv = ?, kitchen = ?
  WHERE roomidx = ?
  `
  const updateRoomDetailRow = await connection.query(updateRoomDetailQuery, editRoomDetailParams);
  return updateRoomDetailRow;
}

module.exports = {
    selectRoom,
    selectRoomDetail,
    updateRoomDetail,
}
