const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/Main/mainRoute')(app);
    // require('../src/app/Post/postRoute')(app);
    // require('../src/app/Auth/authRoute')(app);
    require('../src/app/Room/roomRoute')(app);
    require('../src/app/Host/hostRoute')(app);
    // require('../src/app/Board/boardRoute')(app);

    return app;
};