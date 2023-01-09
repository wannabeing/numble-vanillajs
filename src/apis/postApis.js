import fetch from "node-fetch";

const baseUrl = "http://43.201.103.199";

// 🚀 글 리스트 가져오기
export const getListAPI = async () => {
  const requestUrl = `${baseUrl}/posts`;
  const result = await (await fetch(requestUrl)).json();

  return result;
};

// 🚀 글 상세정보 가져오기
export const getPostAPI = async (postId) => {
  const requestUrl = `${baseUrl}/post/${postId}`;
  const result = await (await fetch(requestUrl)).json();
  return result;
};
// 🚀 글 생성하기
export const createPostAPI = async (newPost) => {
  const requestUrl = `${baseUrl}/post`;
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
  return result;
};

// 🚀 글 수정하기
export const editPostAPI = async (editInfo) => {
  const requestUrl = `${baseUrl}/post/${editInfo.postId}`;
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
  return result;
};

// 🚀 글 삭제하기
export const delPostAPI = async (postId) => {
  const requestUrl = `${baseUrl}/post/${postId}`;
  const result = await (
    await fetch(requestUrl, {
      method: "DELETE",
    })
  ).json();

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
  return result;
};
