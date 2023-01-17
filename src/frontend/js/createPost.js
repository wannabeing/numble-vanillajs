const imgBtn = document.querySelector("#imgBtn"); // 랜덤이미지 추가 버튼
const createBtn = document.querySelector("#createBtn"); // 글 작성하기 버튼

// ✅ 글 제목/내용 검증 핸들러 [title/content: 글 제목/내용]
const handleValidation = (title, content) => {
  if (title.length < 3 || title.length > 20) {
    Swal.fire("제목 오류😅", "제목은 최소3자, 최대 20자입니다!", "info");
    return false;
  } else if (content.length < 3 || content.length > 200) {
    Swal.fire("내용 오류😅", "내용은 최소3자, 최대 20자입니다!", "info");
    return false;
  } else {
    return true;
  }
};
// ✅ 글 생성 핸들러 [title/content: 글 제목/내용]
const handleCraete = async (title, content) => {
  const requestUrl = "/post/create"; // POST 요청 URL

  const result = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  // 글 생성이 성공적으로 됐을 경우
  if (result.status === 201) {
    const { postId } = await result.json(); // Server에서 보낸 JSON 데이터
    location.replace("/"); // 메인 페이지로 이동
  }
  // 글 제목이 중복일 경우
  else if (result.status === 400) {
    Swal.fire("중복😅", "중복된 제목입니다. 다시 입력해주세요!", "error");
  }
  // 유효하지않은 요청이였을 경우
  else {
    location.replace("/404");
  }
};

// 🚀 글 생성 시
createBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const form = document.querySelector(".postCreate__form"); // 글 생성 폼
  const title = form.querySelector("#title").value; // 글 제목
  const content = form.querySelector("#content").value; // 글 내용

  const validation = handleValidation(title, content); // 글 제목/내용 검사
  if (validation) {
    await handleCraete(title, content); // 글생성 함수 실행
  }
});

// 🚀 랜덤이미지 추가 버튼 클릭 시
imgBtn.addEventListener("click", (event) => {
  event.preventDefault();

  imgBtn.disabled = true;
  createBtn.disabled = false;
});
