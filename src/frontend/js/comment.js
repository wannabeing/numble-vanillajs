const { postid: postId } = document.querySelector(".postDetail").dataset; // 상세 글 ID

const commentCreateForm = document.querySelector("#commentCreateForm"); // 댓글 생성 폼
const commentCreateBtn = document.querySelector("#commentCreateBtn"); // 댓글 생성 버튼
const commentInput = document.querySelector("#comment"); // 댓글 인풋창

const commentDelForm = document.querySelector("#commentDelForm"); // 댓글 삭제 폼
const commentDelBtn = document.querySelector("#commentDelBtn"); // 댓글 삭제 버튼

// FAKE REALTIME CreateComment 함수
const createComment = (text, commentId) => {
  const commentList = document.querySelector(".postDetaill__commentsList");

  const commentsMixin = document.createElement("div");
  commentsMixin.classList.add("comments-mixin");
  commentsMixin.dataset.commentid = commentId; // data-set
  const commentsMixinText = document.createElement("div");
  commentsMixinText.classList.add("comments-mixin__text");
  const commentText = document.createElement("span");
  commentText.innerText = text; // text
  commentsMixinText.appendChild(commentText); // appendChild

  const commentsMixinDel = document.createElement("div");
  commentsMixinDel.classList.add("comments-mixin__del");
  const commentDelIcon = document.createElement("i");
  commentDelIcon.classList.add("fa-solid", "fa-trash");
  commentsMixinDel.appendChild(commentDelIcon); // appendChild

  commentsMixin.appendChild(commentsMixinText);
  commentsMixin.appendChild(commentsMixinDel);
  commentList.appendChild(commentsMixin); // appendChild
};

// 🚀 [POST] 댓글 생성 버튼 클릭했을 때
commentCreateBtn.addEventListener("click", async (event) => {
  event.preventDefault();

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
    createComment(comment, commentId);
    commentInput.value = ""; // 댓글창 초기화
  }
});
// 🚀 [DELETE] 댓글 삭제 버튼 클릭했을 때
if (commentDelBtn) {
  commentDelBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const { commentid: commentId } =
      document.querySelector(".comments-mixin").dataset;
    console.log(commentId);
  });
}
