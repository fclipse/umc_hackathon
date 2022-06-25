/**
 * API No. 1.1
 * API Name: 메인 화면 피드 출력 API
 * [GET] /main/:roomIdx
 * 가져올 것들 : 방 주소, 방 거리, 예약 예정 날짜, 끝나는 날짜, 하루당 가격, 별점, 좋아요 여부
 */
async function selectFeed(connection, roomIdx) {
    const selectFeedQuery = `
        SELECT roomLocation, roomDistance, roomDate, roomEndDate, cost, roomRating, roomLike
        FROM Room
        WHERE roomIdx = ? AND roomStatus = 'ACTIVE';
    `;
    const [feedRows] = await connection.query(selectFeedQuery, roomIdx);
    return feedRows;
}

/**
 * API No. 1.11
 * API Name: 숙소 상태 확인 API
 * [GET] /main/check/:roomIdx
 */
 async function selectRoom(connection, roomIdx) {
    const selectRoomQuery = `
        SELECT roomStatus
        FROM Room
        WHERE roomIdx = ?;
    `;
    const [selectRoomRows] = await connection.query(selectRoomQuery, roomIdx);
    return selectRoomRows;
}

/**
 * API No. 1.12
 * API Name: roomIdx 조회 API
 * [GET] /main/exist/:roomIdx
 */


/**
 * API No. 1.2
 * API Name: 유저 피드 사진 조회 API
 * [GET] /main/images/:roomIdx
 */
 async function selectRoomImage(connection, roomIdx) {
    const selectRoomImageQuery = `  
        SELECT roomImgUrl
        FROM RoomImgUrl
        WHERE roomIdx = ?
        GROUP BY roomImgUrlIdx;
    `;
    
    const [RoomImageRows] = await connection.query(selectRoomImageQuery, roomIdx);
    // console.log(RoomImageRows);
    return RoomImageRows;
}

module.exports={
    selectFeed,
    selectRoom,
    selectRoomImage,
};