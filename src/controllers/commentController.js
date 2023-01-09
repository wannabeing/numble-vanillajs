import { createCommentAPI, delCommentAPI } from "../apis/commentApis";
import { isComplete } from "../utils/sharedFunc";
/* 
  📚 Call by postRouter
*/
// [✅ POST] 댓글 생성
export const handleCreateComment = async (req, res) => {
  if (req.method === "POST") {
    const { postId } = req.params;
    const { comment } = req.body;
    // 생성할 댓글 정보
    const commentInfo = {
      postId,
      comment,
    };
    const { code } = await createCommentAPI(commentInfo); // code: 201

    if (isComplete(code)) {
      return res.redirect(`/post/${postId}`);
    } else {
      return res.send("404");
    }
  }
  return res.send("NOPE-!");
};
// [❌ DELETE] 댓글 삭제
export const handleDelComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { code } = await delCommentAPI(commentId); // status: 200

  if (isComplete(code)) {
    return res.redirect(`/post/${postId}`);
  } else {
    return res.send("404");
  }
};
