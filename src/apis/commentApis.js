import fetch from "node-fetch";

const baseUrl = "http://43.201.103.199";

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
  return result;
};
