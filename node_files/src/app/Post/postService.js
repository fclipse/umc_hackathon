const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const postProvider = require("./postProvider");
const postDao = require("./postDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const {connect} = require("http2");

// 게시물 새로 생성하기
exports.createPost = async function (userIdx, content, postImgUrls) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        // post 생성 및 내용 추가
        const insertPostParams = [userIdx, content];
        const postResult = await postDao.insertPost(connection, insertPostParams);

        // 생성된 post의 idx
        const postIdx = postResult[0].insertId;
        // imageUrl 삽입 -> 여기서 오류남
        for (postImgUrl of postImgUrls){
            const insertPostImgParams = [postIdx, postImgUrl];
            const postImgResult = await postDao.insertPostImg(connection, insertPostImgParams);
        }

        return response(baseResponse.SUCCESS, {addedPost: postIdx});

    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    finally{
        // db 연결 해제
        connection.release();
    }
};

// 게시물 내용 수정하기
exports.editPost = async function(postIdx, content){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const editPostParams = [content, postIdx];
        const editPostResult = await postDao.updatePost(connection, editPostParams);
        return response(baseResponse.SUCCESS);
    }catch(err){
        logger.error(`APP - editPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}

// 2.4 게시물 삭제
exports.editPostStatus = async function(postIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const postStatus = await postProvider.checkPostStatus(postIdx);
        console.log(postStatus);
        if(postStatus.status == 'INACTIVE'){
            return errResponse(baseResponse.POST_INACTIVE_POST);
        }
        const editPostStatusResult = await postDao.updatePostStatus(connection, postIdx);
        return response(baseResponse.SUCCESS);

    }catch(err){
        logger.error(`APP - editPostStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    finally {
        connection.release();
    }
}