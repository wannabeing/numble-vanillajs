import "../scss/styles.scss"; // scss

// [Lozad.js]: lazy loading 구현
const observer = lozad();
observer.observe();

const upBtn = document.querySelector(".upBtn"); // 화면 위로 올라가는 스크롤 버튼
let isScrolling; // 스크롤 감지 변수

// 🚀 업 버튼 클릭 시
upBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  // 화면 상단으로 이동
  window.scroll({
    behavior: "smooth",
    top: 0,
  });
});

// scroll 감지
addEventListener("scroll", (event) => {
  event.stopPropagation();
  // 시간 초기화
  window.clearTimeout(isScrolling);
  // 스크롤 시작하면 업버튼 보이기
  upBtn.classList.add("upBtnVisible");

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function () {
    // 스크롤 멈추면 업버튼 삭제
    upBtn.classList.remove("upBtnVisible");
  }, 3000);
});
