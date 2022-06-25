// getPostUserLike 회원 조회 -> email, nickname, name을 가져옴.

async function getPostUserLike(connection, userIdx, postIdx) {
    const getPostUserLikeQuery = `
    SELECT Post.userIdx, Post.postIdx as postIdx,
       IF(likeCount is null, 0, likeCount) likeCount
    FROM Post
    LEFT JOIN (
        SELECT pl.postIdx, COUNT(userIdx) likeCount
        FROM PostLike as pl
        GROUP BY postIdx
    ) lc on lc.postIdx = Post.postIdx

WHERE Post.userIdx = ? AND Post.postIdx = ? AND Post.status = 'ACTIVE';
    `;
    const [getPostUserLikeRow] = await connection.query(getPostUserLikeQuery, [postIdx, userIdx]);
    return getPostUserLikeRow;
}

// Post 추가 쿼리
async function insertPost(connection, insertPostParams){
    const insertPostQuery=`
        INSERT INTO Post(userIdx, content)
        VALUES (?, ?);
    `;

    const insertPostRow = await connection.query(insertPostQuery, insertPostParams);
    return insertPostRow;
}

// Img 삽입 쿼리
async function insertPostImg(connection, insertPostImgParams){
    const insertPostImgQuery=`
        INSERT INTO PostImgUrl(postIdx, imgUrl)
        VALUES (?, ?);
    `;
    const insertPostImgRow = await connection.query(insertPostImgQuery, insertPostImgParams);
    return insertPostImgRow;
}

// 게시물 수정 쿼리
async function updatePost(connection, editPostParams){
    const updatePostQuery = `
        UPDATE Post 
        SET content = ? 
        WHERE postIdx = ?;
    `;
    const updatePostRow = await connection.query(updatePostQuery, editPostParams);
    return updatePostRow;
}

// 게시물 상태 조회 쿼리
async function postStatus(connection, postIdx){
    const postStatusQuery=`
        SELECT status
        FROM Post
        WHERE postIdx = ?
    `;
    const [postStatusRow] = await connection.query(postStatusQuery, postIdx);
    return postStatusRow[0];
}

// 2.4 게시물 삭제
async function updatePostStatus(connection, postIdx){
    const updatePostStatusQuery = `
    UPDATE Post 
    SET status = 'INACTIVE' 
    WHERE postIdx = ?;
    `;
    const updatePostStatusRow = connection.query(updatePostStatusQuery, postIdx);
    return updatePostStatusRow;
}

module.exports = {
    getPostUserLike,
    insertPost,
    insertPostImg,
    updatePost,
    updatePostStatus,
    postStatus
};