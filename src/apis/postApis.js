import fetch from "node-fetch";

const { API_BASEURL: apiBaseUrl } = process.env;

// 🚀 글 리스트 가져오기
export const getListAPI = async () => {
  const requestUrl = `${apiBaseUrl}/posts`;
  const result = await (await fetch(requestUrl)).json();

  return result;
};

// 🚀 글 상세정보 가져오기
export const getPostAPI = async (postId) => {
  const requestUrl = `${apiBaseUrl}/post/${postId}`;
  const result = await (await fetch(requestUrl)).json();
  // 유효하지 않은 요청일 경우
  if (result.success === false) {
    return { success: false, data: { post: null, comments: null } };
  }
  return result;
};
// 🚀 글 생성하기
export const createPostAPI = async (newPost) => {
  const requestUrl = `${apiBaseUrl}/post`;
  const result = await (
    await fetch(requestUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
  ).json();
  // 유효하지 않은 요청일 경우
  if (result.code !== 201) {
    return { code: false };
  }
  return result;
};

// 🚀 글 수정하기
export const editPostAPI = async (editInfo) => {
  const requestUrl = `${apiBaseUrl}/post/${editInfo.postId}`;
  const result = await (
    await fetch(requestUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editInfo.title,
        content: editInfo.content,
      }),
    })
  ).json();
  // 유효하지 않은 요청일 경우
  if (result.code !== 200) {
    return { code: false };
  }
  return result;
};

// 🚀 글 삭제하기
export const delPostAPI = async (postId) => {
  const requestUrl = `${apiBaseUrl}/post/${postId}`;
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

// 🚀 랜덤이미지 가져오기
export const getImgAPI = async () => {
  const baseUrl = "https://random.imagecdn.app/v1/image";
  const config = {
    width: 500,
    height: 500,
    category: "buildings",
    format: "json",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const result = await (await fetch(finalUrl)).json();
  // 유효하지 않은 요청일 경우
  if (!result.url) {
    return { url: null };
  }
  return result;
};
