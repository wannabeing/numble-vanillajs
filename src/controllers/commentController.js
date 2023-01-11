import { createCommentAPI, delCommentAPI } from "../apis/commentApis";
import { isComplete } from "../utils/utils";

/* 
  📚 Call by postRouter
*/

// [✅ POST] 댓글 생성
export const handleCreateComment = async (req, res) => {
  const { postId } = req.params; // post ID
  const { comment } = req.body; // 새로 생성할 댓글

  // 댓글 값이 null일 경우
  if (comment === null) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 생성할 댓글 정보
  const commentInfo = {
    postId,
    comment,
  };
  // 글 생성 API 호출 및 결과 반환 [code : 201]
  const { code } = await createCommentAPI(commentInfo);
  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 렌더링
  return res.redirect(`/post/${postId}`);
};
// [❌ DELETE] 댓글 삭제
export const handleDelComment = async (req, res) => {
  const { postId, commentId } = req.params; // postID, commentID
  const { code } = await delCommentAPI(commentId); // 글 생성 API 호출 및 결과 반환 [code : 200]

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 렌더링
  return res.redirect(`/post/${postId}`);
};
