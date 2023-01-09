import express from "express";
import { handleGetList } from "../controllers/postController";

const globalRouter = express.Router();

// Request URL & Calling Controller
globalRouter.get("/", handleGetList);

export default globalRouter;
