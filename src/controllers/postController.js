import {
  createPostAPI,
  delPostAPI,
  getImgAPI,
  getPostAPI,
  getListAPI,
  editPostAPI,
} from "../apis/postApis";
import { isComplete, sortDesc, displayedAt } from "../utils/utils";

/* 
  📚 Call by globalRouter
*/

// [🌐 GET] 글 리스트 보기
export const handleGetList = async (req, res) => {
  const {
    code,
    data: { posts },
  } = await getListAPI(); // API 호출 및 결과 반환 [isComplete: 200], [posts: 글 리스트]

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 글 리스트 생성일 수정
  for (let i = 0; i < posts.length; i++) {
    posts[i].createdAt = displayedAt(posts[i].createdAt);
  }
  // 글 리스트 내림차순 정렬
  const sortPosts = sortDesc(posts, "createdAt", "desc");
  // 렌더링
  return res.render("post/home", {
    titleName: "HOME",
    posts: sortPosts,
    isHome: true,
  });
};

/* 
  📚 Call by postRouter
*/

// [🌐 GET] 글 상세보기
export const handleGetDetail = async (req, res) => {
  const { postId } = req.params; // post ID
  const {
    success,
    data: { post, comments },
  } = await getPostAPI(postId); // API 호출 및 결과 반환 [success: true], [post: 글 상세정보], [comments: 댓글 리스트]

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(success)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 상세 글 생성일 수정
  post.createdAt = displayedAt(post.createdAt);
  // 상세 글 렌더링
  return res.render("post/detail", {
    titleName: post.title,
    post,
    comments,
  });
};

// [🌐 GET] 글 생성
export const handleGetCreate = (req, res) => {
  return res.render("post/create", {
    titleName: "CREATE",
  });
};

// [✅ POST] 글 생성
export const handlePostCreate = async (req, res) => {
  const { title, content } = req.body; // 폼 데이터 [title: 글 제목], [content: 글 내용]
  const { url: image } = await getImgAPI(); // API 호출 및 결과 반환 [image: 랜덤 이미지 주소값]

  // 글 제목, 내용 둘 중 하나라도 null일 경우
  if (title === null || content === null) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 새로 생성할 글
  const newPost = {
    title,
    content,
    image,
  };
  // 글 생성 API 호출 및 결과 반환 [code : 201]
  const { code } = await createPostAPI(newPost);
  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "중복된 글입니다.",
    });
  }
  // 렌더링
  return res.redirect("/");
};
// [🌐 GET] 글 수정
export const handleGetEdit = async (req, res) => {
  const { postId } = req.params; // post ID
  const {
    success,
    data: { post: editPost },
  } = await getPostAPI(postId); // API 호출 및 결과 반환 [success: true], [editPost: 수정할 글의 상세정보]

  // API 호출이 정상적이지 않을 경우
  if (!isComplete(success)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 렌더링
  return res.render("post/edit", {
    titleName: `(수정중) ${editPost.title}`,
    editPost,
    isEdit: true,
  });
};
// [✅ PATCH] 글 수정
export const handlePatchEdit = async (req, res) => {
  const { postId } = req.params; // post ID
  const { title, content, image } = req.body; // 폼 데이터 [title: 글 제목], [content: 글 내용], [image: 이미지 주소]

  // 수정할 글의 정보
  const editInfo = {
    postId,
    title,
    content,
  };
  // API 호출 및 결과 반환 [code: 200]
  const { code } = await editPostAPI(editInfo);
  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 렌더링
  return res.redirect(`/post/${postId}`);
};

// [❌ DELETE] 글 삭제
export const handleDelPost = async (req, res) => {
  const { postId } = req.params; // post ID
  const { code } = await delPostAPI(postId); // API 호출 및 결과 반환 [code: 200]
  // API 호출이 정상적이지 않을 경우
  if (!isComplete(code)) {
    return res.render("404", {
      titleName: "404 에러",
    });
  }
  // 렌더링
  return res.redirect("/");
};
