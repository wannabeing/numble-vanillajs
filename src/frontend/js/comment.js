const { postid: postId } = document.querySelector(".postDetail").dataset; // 상세 글 ID

const commentCreateBtn = document.querySelector("#commentCreateBtn"); // 댓글 생성 버튼
const commentInput = document.querySelector("#comment"); // 댓글 인풋창

const commentDelForm = document.querySelector("#commentDelForm"); // 댓글 삭제 폼
const commentDelBtns = document.querySelectorAll("#commentDelBtn"); // 모든 댓글 삭제 버튼

// 가짜 댓글 생성 함수
const createFakeComment = (text, commentId) => {
  const commentsList = document.querySelector(".postDetaill__commentsList");

  const commentsExplain = document.querySelector(
    ".postDetail__commentExplain span"
  );
  let { commentslength } = commentsList.dataset; // 댓글 개수
  commentslength *= 1; // 형변환
  commentslength += 1; // 댓글개수 1 증가
  commentsExplain.innerText = `댓글 (${commentslength})`;

  const commentsMixin = document.createElement("div");
  commentsMixin.classList.add("comments-mixin");

  const commentsMixinText = document.createElement("div");
  commentsMixinText.classList.add("comments-mixin__text");
  const commentText = document.createElement("span");
  commentText.innerText = text; // text
  commentsMixinText.appendChild(commentText); // appendChild

  const commentsMixinDel = document.createElement("div");
  commentsMixinDel.classList.add("comments-mixin__del");
  const commentDelIcon = document.createElement("i");
  commentDelIcon.classList.add("fa-solid", "fa-trash");
  commentDelIcon.dataset.commentid = commentId; // data-set
  commentDelIcon.addEventListener("click", handleDelete); // 댓글 삭제 이벤트 추가
  commentsMixinDel.appendChild(commentDelIcon); // appendChild

  commentsMixin.appendChild(commentsMixinText);
  commentsMixin.appendChild(commentsMixinDel);
  commentsList.appendChild(commentsMixin); // appendChild
};
// ✅ 댓글 삭제 핸들러
const handleDelete = async (event) => {
  const { commentid: commentId } = event.target.dataset; // 삭제하고 싶은 댓글 ID
  const requestUrl = `/post/${postId}/comment/${commentId}/delete`;
  const { status } = await fetch(requestUrl, {
    method: "DELETE",
  });
  // 댓글 삭제가 성공적으로 됐을 경우
  if (status === 200) {
    window.location.reload();
  }
};
// ✅ 댓글 생성 핸들러
const handleCreate = async (event) => {
  const requestUrl = `/post/${postId}/comment/create`;
  const comment = commentInput.value; // 댓글 텍스트
  const result = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  // 댓글 생성이 성공적으로 됐을 경우
  if (result.status === 201) {
    const { commentId } = await result.json(); // Server에서 보낸 JSON 데이터
    createFakeComment(comment, commentId); // 가짜 댓글 생성
    commentInput.value = ""; // 댓글창 초기화
  } else {
    window.location.replace("/404");
  }
};

// 🚀 [POST] 댓글 생성 버튼 클릭했을 때
commentCreateBtn.addEventListener("click", handleCreate);
// 🚀 [DELETE] 댓글 삭제 버튼 클릭했을 때
if (commentDelBtns) {
  commentDelBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", handleDelete);
  });
}
