const { postid: postId } = document.querySelector(".postDetail").dataset; // 상세 글 ID

const postDelForm = document.querySelector("#postDelForm"); // 상세 글 삭제 폼
const postDelBtn = document.querySelector("#postDelBtn"); // 상세 글 삭제 버튼

// 🚀 [DELETE] 글 삭제 버튼 클릭했을 때
postDelBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  postDelForm.submit(); // 폼 제출
});
