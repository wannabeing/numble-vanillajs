import { createCommentAPI, delCommentAPI } from "../apis/commentApis";
import { getPostAPI } from "../apis/postApis";
import { isComplete } from "../utils/utils";

/* 
  ð Call by postRouter
*/

// [â POST] ëê¸ ìì±
export const handleCreateComment = async (req, res) => {
  const { postId } = req.params; // post ID
  const { comment } = req.body; // ìë¡ ìì±í  ëê¸

  const {
    data: { comments },
  } = await getPostAPI(postId); // ëê¸ ê°ì ë³ì
  if (!comments) {
    return res.sendStatus(404);
  }

  // ëê¸ ê°ì´ nullì¼ ê²½ì°
  if (comment === null) {
    return res.sendStatus(404);
  }
  // ìì±í  ëê¸ ì ë³´
  const commentInfo = {
    postId: Number(postId),
    comment,
  };

  // ëê¸ ìì± API í¸ì¶ ë° ê²°ê³¼ ë°í [code : 201], [commentId: ìë¡ ìì±í ëê¸ ID]
  const {
    code,
    data: { commentId },
  } = await createCommentAPI(commentInfo);

  // API í¸ì¶ì´ ì ìì ì´ì§ ìì ê²½ì°
  if (!isComplete(code)) {
    return res.sendStatus(400);
  }
  // FRONTë¡ ê²°ê³¼ ë°í [status: 201], [commentId: ìë¡ ìì±í ëê¸ ID], [commentsLength: ìì¸ ê¸ì ëê¸ ê°ì]
  return res.status(201).json({ commentId, commentsLength: comments.length });
};

// [â DELETE] ëê¸ ì­ì 
export const handleDelComment = async (req, res) => {
  const { postId, commentId } = req.params; // postID, commentID
  const { code } = await delCommentAPI(commentId); // ê¸ ìì± API í¸ì¶ ë° ê²°ê³¼ ë°í [code : 200]

  // API í¸ì¶ì´ ì ìì ì´ì§ ìì ê²½ì°
  if (!isComplete(code)) {
    return res.sendStatus(404);
  }
  // FRONTë¡ ê²°ê³¼ ë°í [status: 200]
  return res.sendStatus(200);
};
