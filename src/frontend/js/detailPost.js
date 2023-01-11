const delBtn = document.querySelector("#delBtn"); // 글 삭제 버튼
const { postid: postId } = delBtn.dataset; // 삭제할 글 ID

// 🚀 삭제 버튼 클릭했을 때
delBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const requestUrl = `/post/${postId}/delete`;
  const { status } = await fetch(requestUrl, {
    method: "DELETE",
  });
  if (status === 200) {
    window.location.replace("/");
  } else {
  }
});
