import fetch from "node-fetch";

const { API_BASEURL: baseUrl } = process.env;

// π λκΈ μμ±νκΈ°
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
  // μ ν¨νμ§ μμ μμ²­μΌ κ²½μ°
  if (result.code !== 201) {
    return { code: false, data: { commentId: null } };
  }
  return result;
};
// π λκΈ μ­μ νκΈ°
export const delCommentAPI = async (commentId) => {
  const requestUrl = `${baseUrl}/comment/${commentId}`;
  const result = await (
    await fetch(requestUrl, {
      method: "DELETE",
    })
  ).json();
  // μ ν¨νμ§ μμ μμ²­μΌ κ²½μ°
  if (result.code !== 200) {
    return { code: false };
  }
  return result;
};
