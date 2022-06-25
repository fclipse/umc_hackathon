// 포트 설정 및 초기 시작 파일.
const express = require('./config/express');
const {logger} = require('./config/winston');

const port = 3000;
express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);