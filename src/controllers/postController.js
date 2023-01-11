import {
  createPostAPI,
  delPostAPI,
  getImgAPI,
  getPostAPI,
  getListAPI,
  editPostAPI,
} from "../apis/postApis";

import { isComplete, sortDesc } from "../utils/sharedFunc";
/* 
  📚 Call by globalRouter
*/
// [🌐 GET] 글 리스트 보기
export const handleGetList = async (req, res) => {
  const {
    code,
    data: { posts },
  } = await getListAPI(); // isComplete: 200, 글 리스트

  const sortPosts = sortDesc(posts, "createdAt", "desc");

  if (isComplete(code)) {
    return res.render("post/home", {
      titleName: "HOME",
      posts: sortPosts,
    });
  } else {
    return res.send("404");
  }
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
  } = await getPostAPI(postId); // success: true, 글 상세정보, 댓글 리스트

  if (isComplete(success)) {
    return res.render("post/detail", {
      titleName: post.title,
      post,
      comments,
    });
  } else {
    return res.send("404");
  }
};

// [🌐 GET] 글 생성
export const handleGetCreate = (req, res) => {
  return res.render("post/create", {
    titleName: "CREATE",
  });
};

// [✅ POST] 글 생성
export const handlePostCreate = async (req, res) => {
  const { title, content } = req.body; // 생성할 글 제목, 내용
  const { url: image } = await getImgAPI(); // 랜덤이미지 가져오기
  // 생성할 글
  const newPost = {
    title,
    content,
    image,
  };

  const { code } = await createPostAPI(newPost); // code : 201

  if (isComplete(code)) {
    return res.redirect("/");
  } else {
    res.write("<script>alert('not allowed')</script>");
    return res.write('<script>window.location="/post/create"</script>');
  }
};
// [🌐 GET] 글 수정
export const handleGetEdit = async (req, res) => {
  const { postId } = req.params; // post ID
  const {
    success,
    data: { post: editPost },
  } = await getPostAPI(postId); // success: true, 수정할 글

  if (isComplete(success)) {
    return res.render("post/edit", {
      titleName: `EDIT ${editPost.title}`,
      editPost,
    });
  } else {
    return res.send("404");
  }
};
// [✅ PATCH] 글 수정
export const handlePatchEdit = async (req, res) => {
  if (req.method === "PATCH") {
    const { postId } = req.params; // post ID
    const { title, content, image } = req.body; // FormData

    // 수정할 정보
    const editInfo = {
      postId,
      title,
      content,
    };
    const { code } = await editPostAPI(editInfo); // code: 200

    if (isComplete(code)) {
      return res.redirect(`/post/${postId}`);
    } else {
      return res.send("404");
    }
  }
};

// [❌ DELETE] 글 삭제
export const handleDelPost = async (req, res) => {
  if (req.method === "DELETE") {
    const { postId } = req.params; // post ID
    const { code } = await delPostAPI(postId); // code: 200

    if (isComplete(code)) {
      return res.redirect("/");
    } else {
      return res.send("NOPE-!");
    }
  }
};
