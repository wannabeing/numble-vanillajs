import fetch from "node-fetch";

const { API_BASEURL: baseUrl } = process.env;

// 🚀 댓글 생성하기
export const createCommentAPI = async (commentInfo) => {
  const requestUrl = `${baseUrl}/comment/${commentInfo.postId}`;
  const result = await (
    await fetch(requestUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: commentInfo.comment,
      }),
    })
  ).json();
  // 유효하지 않은 요청일 경우
  if (result.code !== 201) {
    return { code: false, data: { commentId: null } };
  }
  return result;
};
// 🚀 댓글 삭제하기
export const delCommentAPI = async (commentId) => {
  const requestUrl = `${baseUrl}/comment/${commentId}`;
  const result = await (
    await fetch(requestUrl, {
      method: "DELETE",
    })
  ).json();
  // 유효하지 않은 요청일 경우
  if (result.code !== 200) {
    return { code: false };
  }
  return result;
};
