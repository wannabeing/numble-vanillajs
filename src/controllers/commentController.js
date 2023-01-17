import { createCommentAPI, delCommentAPI } from "../apis/commentApis";
import { getPostAPI } from "../apis/postApis";
import { isComplete } from "../utils/utils";

/* 
  📚 Call by postRouter
*/

// [✅ POST] 댓글 생성
export const handleCreateComment = async (req, res) => {
  const { postId } = req.params; // post ID
  const { comment } = req.body; // 새로 생성할 댓글

  const {
    data: { comments },
  } = await getPostAPI(postId); // 댓글 개수 변수
  if (!comments) {
    return res.sendStatus(404);
  }

  // 댓글 값이 null일 경우
  if (comment === null) {
    return res.sendStatus(404);
  }
  // 생성할 댓글 정보
  const commentInfo = {
    postId: Number(postId),
    comment,
  };

  // 댓글 생성 API 호출 및 결과 반환 [code : 201], [commentId: 새로 생성한 댓글 ID]
  const {
    code,
    data: { commentId },
  } = await createCommentAPI(commentInfo);

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.sendStatus(400);
  }
  // FRONT로 결과 반환 [status: 201], [commentId: 새로 생성한 댓글 ID], [commentsLength: 상세 글의 댓글 개수]
  return res.status(201).json({ commentId, commentsLength: comments.length });
};

// [❌ DELETE] 댓글 삭제
export const handleDelComment = async (req, res) => {
  const { postId, commentId } = req.params; // postID, commentID
  const { code } = await delCommentAPI(commentId); // 글 생성 API 호출 및 결과 반환 [code : 200]

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.sendStatus(404);
  }
  // FRONT로 결과 반환 [status: 200]
  return res.sendStatus(200);
};
