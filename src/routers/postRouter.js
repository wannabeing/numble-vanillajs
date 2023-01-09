import express from "express";
import {
  handleGetCreate,
  handlePostCreate,
  handleGetDetail,
  handleDelPost,
  handleGetEdit,
  handlePatchEdit,
} from "../controllers/postController";

import {
  handleCreateComment,
  handleDelComment,
} from "../controllers/commentController";

const postRouter = express.Router();

// Request URL & Calling Controller
postRouter.route("/create").get(handleGetCreate).post(handlePostCreate);
postRouter.get("/:postId(\\d+)", handleGetDetail);
postRouter
  .route("/:postId(\\d+)/edit")
  .get(handleGetEdit)
  .patch(handlePatchEdit);
postRouter.delete("/:postId(\\d+)/delete", handleDelPost);

postRouter.post("/:postId(\\d+)/comment/create", handleCreateComment);
postRouter.delete(
  "/:postId(\\d+)/comment/:commentId(\\d+)/delete",
  handleDelComment
);

export default postRouter;
