const imgBtn = document.querySelector("#imgBtn"); // 랜덤이미지 추가 버튼
const createBtn = document.querySelector("#createBtn"); // 글 작성하기 버튼

// 🚀 랜덤이미지 추가 버튼 클릭 시
imgBtn.addEventListener("click", (event) => {
  event.preventDefault();

  imgBtn.disabled = true;
  createBtn.disabled = false;
});
