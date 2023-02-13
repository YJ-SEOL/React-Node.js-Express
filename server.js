// express 및 cors 모듈
// express는 Rest API 구축을 위한 것
// body-parser는 요청을 구문분석하고 req.body개체를 만드는데 도움.
// cors는 다양한 옵션으로 CORS를 활성화 할 수 있는 Express 미들웨어 제공
// 내장된 미들웨어 기능을 사용하여 app / views 폴더 에 HTML 파일, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + "/app/views/";

const app = express();

app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// 콘텐츠 유형 요청 구문 분석 - application/json
app.use(bodyParser.json());

// 콘텐츠 유형 요청 구문 분석 - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.model.index db 호출
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

// db.sequelize.sync();
app.get("/", function (req, res) {
    res.sendFile(path + "index.thml");
});

db.mongoose
    // .connect(db.url, {
    .connect(dbConfig.url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connect to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to yj-Seol application." });
// });

// router 경로
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const path = __dirname + "/app/views/";

// const app = express();

// app.use(express.static(path));

// var corsOptions = {
//     origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // const db = require("./app/models");

// // todo: 자꾸 에러뜸
// // db.sequelize.sync();
// // // drop the table if it already exists
// // db.sequelize.sync({ force: true }).then(() => {
// //   console.log("Drop and re-sync db.");
// // });

// app.get("*", function (req, res) {
//     res.sendFile(path + "index.html");
// });

// require("./app/routes/turorial.routes")(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });
