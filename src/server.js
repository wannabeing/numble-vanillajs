import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import "dotenv/config"; // dotenv 사용

// Import Routers
import globalRouter from "./routers/globalRouter";
import postRouter from "./routers/postRouter";

const server = express(); // Server

server.disable("x-powered-by"); // Express로 서버를 만들었다는 것을 Header에서 숨기기
server.use(morgan("dev")); // Logger 미들웨어
server.use(methodOverride("_method")); // Form에서 patch, delete 사용하기 위한 라이브러리
server.use(express.urlencoded({ extended: true })); // Form 데이터 인식 및 변환 미들웨어
server.use(express.json()); // Front -> Server 비동기 통신시, 데이터를 JSON화 하기
server.set("view engine", "pug"); // PUG로 뷰 엔진 SET
server.set("views", process.cwd() + "/src/views"); // 뷰 엔진의 경로 SET

// 프론트엔드 static 폴더 SET
server.use("/static", express.static("assets")); // 사용자에게는 static, 실제는 assets

// Routers SET
server.use("/", globalRouter);
server.use("/post", postRouter);
// ❌ 404 Error SET
server.use((_, res) => {
  return res.render("404", {
    titleName: "404 에러",
  });
});

const { SERVER_IP, PORT } = process.env;
// Server Listening
server.listen(PORT ? PORT : 4000, () => {
  if (SERVER_IP) {
    console.log(`✅ Server : http://${SERVER_IP}`);
  } else {
    console.log(`✅ Server : http://localhost:4000`);
  }
});
