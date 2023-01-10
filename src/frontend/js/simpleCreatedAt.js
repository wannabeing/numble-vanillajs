// 모든 시간 표시 span
const createdAtList = document.querySelectorAll("#createdAt");
// 존재할 경우에만 실행
if (createdAtList.length > 0) {
  for (let i = 0; i < createdAtList.length; i++) {
    const newCreatedAt = new Date(createdAtList[i].innerText);
    createdAtList[i].innerText = displayedAt(newCreatedAt);
  }
}
// 시간표시 계산 함수
function displayedAt(createdAt) {
  const milliSeconds = new Date() - createdAt;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}
